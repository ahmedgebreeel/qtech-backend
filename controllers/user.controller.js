const User = require('../models/user.model');
const UserProfile = require('../models/userProfile.model');
const UserSocial = require('../models/userSocial.model')
const { validateUserProfile } = require('../validators/userProfile.validator');

const editPersonalInfo = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            fullNameEnglish,
            fullNameArabic,
            dateOfBirth,
            nationality,
            gender,
            country,
            city,
            fullAddress
        } = req.body;

        // Validate incoming request body
        const { error } = validateUserProfile({fullNameEnglish, fullNameArabic, dateOfBirth, nationality, gender, country, city, fullAddress});
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const userId = req.userId;
        let user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update firstName and lastName in User table
        user.firstName = firstName;
        user.lastName = lastName;
        await user.save();

        // Update or insert other properties in UserProfile table
        let userProfile = await UserProfile.findOne({ where: { userId } });
        if (!userProfile) {
            userProfile = await UserProfile.create({
                userId,
                fullNameEnglish,
                fullNameArabic,
                dateOfBirth,
                nationality,
                gender,
                country,
                city,
                fullAddress
            });
        } else {
            userProfile.fullNameEnglish = fullNameEnglish;
            userProfile.fullNameArabic = fullNameArabic;
            userProfile.dateOfBirth = dateOfBirth;
            userProfile.nationality = nationality;
            userProfile.gender = gender;
            userProfile.country = country;
            userProfile.city = city;
            userProfile.fullAddress = fullAddress;
            await userProfile.save();
        }

        return res.status(200).json({ message: "Personal info updated successfully" });
    } catch (error) {
        console.error("Error in editPersonalInfo:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const editSocialMedia = async(req,res)=>{
    try {
        const {facebook, twitter, linkedin, instagram, github}= req.body;
        const userId = req.userId;
        
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const userSocial = await UserSocial.findOne({where:{userId}});
        if(!userSocial){
            await UserSocial.create({userId, facebook, twitter, linkedin, instagram, github});
        }else{
            userSocial.facebook = facebook;
            userSocial.twitter = twitter;
            userSocial.linkedin = linkedin;
            userSocial.instagram = instagram;
            userSocial.github = github;
            await UserSocial.save();
        }

        return res.status(200).json({message:"Social Media updated successfully"});
         
    } catch (error) {
        console.log("error in editSocialMedia",error);
        return res.status(500).json({message:"Internal Server Error"});

    }
}

module.exports = { editPersonalInfo, editSocialMedia };
