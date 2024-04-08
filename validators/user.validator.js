const joi = require('joi');

// Define the user schema using Joi
const userSchema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    mobile: joi.string().min(11).required(), 
    email: joi.string().email().required(),
    password: joi.string().min(6).required() 
});

// Validate user against the schema
const validateUser = (user) => {
    return userSchema.validate(user);
}

module.exports = { validateUser };
