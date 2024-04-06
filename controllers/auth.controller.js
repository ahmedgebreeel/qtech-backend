const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const { validateUser } = require("../validatiors/user.validator");

const generateToken = (userId) => {
  return jwt.sign({ userId }, "JWT_SECRET", { expiresIn: "1d" }); // expires in one day
};

const registerController = async (req, res) => {
  try {
    // Validate incoming request body
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // Check if the email already exists
    await User.getUserByEmail(email, async(err, user) => {
      if (err) {
        console.error("Error retrieving user:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      } else {

         // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if (!hashedPassword){
            console.error("Error hashing password:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }else{

            // Create a new user
            const newUser = {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              phoneNo: req.body.phoneNo,
              email: req.body.email,
              password: hashedPassword,
            };
    
            // Save the user to the database
            User.createUser(newUser, (err, result) => {
              if (err) {
                console.error("Error saving user:", err);
                return res.status(500).json({ message: "Internal Server Error" });
              }
              if (result) {
                const token = generateToken(result.insertId);
    
                // Send the token in the response header
                return res
                  .header("Authorization", `Bearer ${token}`)
                  .status(201)
                  .json({ message: "Registration successful" });
              }
            });
        }
      }
    });
   
  } catch (error) {
    console.log("error in registerController", error);
    return res.status(500).json({ message: error.message });
  }
};

const loginController = async (req, res) => {
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
    const isPasswordCorrect = password === user?.password;

    if (!user || isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a token with user
    generateToken(user.id);

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.log("error in loginController", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { loginController, registerController };
