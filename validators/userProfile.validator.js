const joi = require('joi');

const userProfileSchema = joi.object({
    fullNameEnglish: joi.string().allow(null, '').optional(),
    fullNameArabic: joi.string().allow(null, '').optional(),
    dateOfBirth: joi.date().allow(null).optional(),
    nationality: joi.string().allow(null, '').optional(),
    gender: joi.string().valid('male', 'female').allow(null).optional(),
    country: joi.string().allow(null, '').optional(),
    city: joi.string().allow(null, '').optional(),
    fullAddress: joi.string().allow(null, '').optional()
});

const validateUserProfile = (userProfile) => {
    return userProfileSchema.validate(userProfile);
}

module.exports = { validateUserProfile };
