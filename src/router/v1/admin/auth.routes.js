const express = require('express');
const { AdminModule } = require('../../../controller/v1');
const { joyValidate } = require('../../../middleware/validator.middleware');
const { UserValidate } = require('../../../validation/auth.validate');
const router = express.Router()

let AuthCtr1 = new AdminModule.authCtr1.AuthController()

router.post('/create',
    joyValidate(UserValidate.register),
    async (req, res) => {
        const result = await AuthCtr1.register(req, res)
        return res.status(result.status).send(result)
        /* 
            #swagger.summary = 'Register user'
            #swagger.tags = ['Admin | User']
            #swagger.parameters['body'] = {
                in: 'body',
                    schema: {
                        name: "abc",
                        email: "abc@mail.com",
                        password: "xyz@123",
                        phone: "9844648795"
                    }
                }
            #swagger.security = [{
                "requestTokenAuth": [],
                "bearerTokenAuth": [],
            }] 
        */
    }
)

router.post('/login',
    joyValidate(UserValidate.login),
    async (req, res) => {
        const result = await AuthCtr1.login(req, res)
        return res.status(result.status).send(result)
        /* 
            #swagger.summary = 'Login user'
            #swagger.tags = ['Admin | User']
            #swagger.parameters['body'] = {
                in: 'body',
                    schema: {
                        email: "abc@mail.com",
                        password: "xyz@123"
                    }
                }
            #swagger.security = [{
                "requestTokenAuth": [],
                "bearerTokenAuth": [],
            }] 
        */
    }
)

module.exports = router;