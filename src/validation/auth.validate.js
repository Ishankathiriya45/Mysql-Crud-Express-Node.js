const Joi = require("joi");

const UserValidate = {
    register: Joi.object().keys({
        name: Joi
            .string()
            .min(2)
            .max(128)
            .required()
            .messages(),

        email: Joi
            .string()
            .email()
            .required(),

        password: Joi
            .string()
            .min(6)
            .max(128)
            .required()
            .pattern(/^[a-z0-9]+$/),

        phone: Joi.number()
            .integer()
            .min(1000000000) // minimum 10-digit number (adjust if needed)
            .max(9999999999) // maximum 10-digit number (for standard mobile)
            .required().messages({
                "number.min": "Phone number must have exactly 10 digits",
                "number.max": "Phone number must have exactly 10 digits",
            })
    }),

    login: Joi.object().keys({
        email: Joi
            .string()
            .email()
            .required(),

        password: Joi
            .string()
            .required()
            .regex(/^[a-z0-9]+$/),
    }),
}

module.exports = {
    UserValidate,
}