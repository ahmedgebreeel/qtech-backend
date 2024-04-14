const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { validateUser } = require("../validators/user.validator");
const jwt = require("jsonwebtoken");
const { generateAndSendOTB } = require("../utils/sendOTPByEmail");



// generate token function
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
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate and Send OTP via email

    const otp = await generateAndSendOTB(email);

    // if (!otp) {
    //   return res.status(500).json({ message: "Internal Server Error" });
    // }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    // Create a new user
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hashedPassword,
    };

    // Save the user to the database
    await User.create(newUser);
    
    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error in registerController", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Retrieve user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate and return a token
    const token = generateToken(user.id);
    return res
      .header("Authorization", `Bearer ${token}`)
      .status(200)
      .json({
        message: "Login successful",
        token,
        user: { id: user.id, firstName: user.firstName, lastName: user.lastName },
      });
  } catch (error) {
    console.error("Error in loginController", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const googleController = (req, res)=>{
  try {
    // console.log(req.body.response.credential);
   const credential = jwt.decode(req.body.response.credential);
    // console.log(credential);
    const token = generateToken(credential.email);
    return res
      .header("Authorization", `Bearer ${token}`)
      .status(200)
      .json({
        message: "Login successful",
        token,
        user: {name: credential.name },
      })
    
  } catch (error) {
    console.log("error in googleController",error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


module.exports = { loginController, registerController, googleController };
















































































// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const User = require("../models/user.model");
// const { validateUser } = require("../validators/user.validator");

// // generate token function
// const generateToken = (userId) => {
//   return jwt.sign({ userId }, "JWT_SECRET", { expiresIn: "1d" }); // expires in one day
// };

// const registerController = async (req, res) => {
//   try {
//     // Validate incoming request body
//     const { error } = validateUser(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }

//     const { email, password } = req.body;
//     // Check if the email already exists
//     await User.getUserByEmail(email, async(err, user) => {
//       if (err) {
//         console.error("Error retrieving user:", err);
//         return res.status(500).json({ message: "Internal Server Error" });
//       }
//       if (user) {
//         return res.status(400).json({ message: "Email already exists" });
//       } else {

//          // Hash the password
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         if (!hashedPassword){
//             console.error("Error hashing password:", error);
//             return res.status(500).json({ message: "Internal Server Error" });
//         }else{

//             // Create a new user
//             const newUser = {
//               firstName: req.body.firstName,
//               lastName: req.body.lastName,
//               phoneNo: req.body.phoneNo,
//               email: req.body.email,
//               password: hashedPassword,
//             };
    
//             // Save the user to the database
//             User.createUser(newUser, (err, result) => {
//               if (err) {
//                 console.error("Error saving user:", err);
//                 return res.status(500).json({ message: "Internal Server Error" });
//               }
//               if (result) {
//                 return res
//                   .status(201)
//                   .json({ message: "Registration successful" });
//               }
//             });
//         }
//       }
//     });
   
//   } catch (error) {
//     console.log("error in registerController", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Call getUserByEmail function and await the result
//      await User.getUserByEmail(email, async(err, user) => {
//       if (err) {
//         console.error("Error retrieving user:", err);
//         return res.status(500).json({ message: "Internal Server Error" });
//       }  else if (!user) {
        
//         return res.status(401).json({ message: "Invalid email or password" });
//       }else if(user){
    
//           // check if the password correct
//           const isPasswordCorrect = await  bcrypt.compare(password, user.password);
      
//           if (!isPasswordCorrect) {
//             return res.status(401).json({ message: "Invalid email or password" });
//           }
      
//           // Generate a token with user
//           const token = generateToken(user.id);
      
//           return res
//           .header('Authorization', `Bearer ${token}`)
//           .status(200).json({ message: "Login successful",token, user: {id: user.id, firstName: user.firstName, lastName: user.lastName} });
//       }
//     });

//   } catch (error) {
//     console.log("error in loginController", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { loginController, registerController };
