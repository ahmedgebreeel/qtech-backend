const joi = require('joi');


const userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phoneNo: joi.number().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
});

const validateUser = (user)=>{
    return userSchema.validate(user);
}
module.exports = {validateUser};