const Joi = require("joi")

    const createUserValidation = Joi.object({
            first_name:Joi.string().pattern(/^[a-z or A-Z]+$/).min(2).max(16).required(),
            last_name:Joi.string().pattern(/^[a-z or A-Z]+$/).min(2).max(16).required(),
            mobile_no:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
            email:Joi.string().email().required(),
            address:Joi.string().required()
        })

    const updateUserValidation = Joi.object({
        first_name:Joi.string().pattern(/^[a-z or A-Z]+$/).min(2).max(16).optional(),
        last_name:Joi.string().pattern(/^[a-z or A-Z]+$/).min(2).max(16).optional(),
        mobile_no:Joi.string().length(10).pattern(/^[0-9]+$/).optional(),
        email:Joi.string().email().optional(),
        address:Joi.string().optional()
        })
    
module.exports = {createUserValidation,updateUserValidation};