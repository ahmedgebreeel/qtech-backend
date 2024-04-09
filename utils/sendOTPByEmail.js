const nodemailer = require('nodemailer');

const generateAndSendOTB = async(email)=>{


    try {

        const otp =  Math.floor(100000 + Math.random() * 900000);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: "sender@gmail.com",
              pass: "senderPassword"
            },
        });
    
        const mailOptions = {
            from: 'sender@gmail',
            to: email,
            subject: 'OTP',
            text: `Your OTP is ${otp}`
        };
    
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return otp;

    } catch (error) {
      console.error('Error sending OTP by email:', error); 
    }
  
}


module.exports = {generateAndSendOTB}