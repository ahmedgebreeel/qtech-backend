const User = require('../models/users.model');

const loginController = async(req, res)=>{
    try {
        const { email, password } = req.body;

        // Call getUserByEmail function and await the result
        const user = await User.getUserByEmail(email, (err, user) => {
            if (err) {
                console.error("Error retrieving user:", err);
                return res.status(500).json({ message: "Internal Server Error" });
            }

            console.log(user);
            return res.status(200).json(user);
        });
    } catch (error) {
        console.log("error in loginController", error);
       return res.status(500).json({message: error.message});
    }
}




module.exports = {loginController}