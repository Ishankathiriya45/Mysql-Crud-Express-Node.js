const Joi = require("joi");

const ProductValidate = {
    createProduct: Joi.object().keys({
        name: Joi
            .string()
            .min(2)
            .max(128)
            .required()
            .messages({
                "any-required": "name is mandatory",
                "string.min": "Name must be at least {#limit} characters long.",
                "string.max": "Name must be less than or equal to {#limit} characters long.",
            }),

        stock: Joi
            .number()
            .required()
            .messages({
                "number.base": "Price must be a number."
            }),

        price: Joi
            .number()
            .required()
            .messages({
                "number.base": "Price must be a number."
            }),

        weight: Joi
            .string()
            .required()
            .messages({
                "any-required": "weight is mandatory",
            }),
    })
}

module.exports = {
    ProductValidate,
}