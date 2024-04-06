const jwt = require('jsonwebtoken');
const User = require('../models/users.model');


const generateToken = (userId)=>{
    return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1d'});  // expires in one day
}



const loginController = async(req, res)=>{
    try {
        const { email, password } = req.body;

        // Call getUserByEmail function and await the result
        const user = await User.getUserByEmail(email, (err, user) => {
            if (err) {
                console.error("Error retrieving user:", err);
                return res.status(500).json({ message: "Internal Server Error" });
            } 
        });

        // check if the password correct
        const isPasswordCorrect = password === user?.password ;


        if (!user || isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

            // Generate a token with user
            generateToken(user.id);
            
            return res.status(200).json({ message: "Login successful", user });
        
    } catch (error) {
        console.log("error in loginController", error);
       return res.status(500).json({message: error.message});
    }
}




module.exports = {loginController}