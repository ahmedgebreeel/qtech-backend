const User = require('../models/user.model');

const editPersonalInfo = async(req,res)=>{

    try {
        const {firstName, lastName, fullNameEnglish, fullNameArabic, dateOfBirth, nationality, gender, country, city, fullAddress} = req.body;

        const userId = req.userId;
        const user = await User.getUserByID(userId);
      
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const editedUser = {...user, firstName, lastName, fullNameEnglish, fullNameArabic, dateOfBirth, nationality, gender, country, city, fullAddress};
        console.log(editedUser);
        
        
        
        
    } catch (error) {
        console.log("error in editPersonalInfo", error);
        return res.status(500).json({ message: error.message });
    }
}




module.exports = {editPersonalInfo};