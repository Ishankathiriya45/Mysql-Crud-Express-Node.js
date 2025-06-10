const express = require('express');
const { ClientModule } = require('../../../controller/v1');
const { joyValidate } = require('../../../middleware/validator.middleware');
const { UserValidate } = require('../../../validation/auth.validate');
const router = express.Router()

const ClientCtr1 = new ClientModule.clientCtr1.AuthController()

router.post('/create',
    joyValidate(UserValidate.register),
    async (req, res) => {
        const result = await ClientCtr1.register(req, res)
        return res.status(result.status).send(result)
        /* 
            #swagger.summary = 'Register user'
            #swagger.tags = ['Client | User']
            #swagger.parameters["body"] = {
                in: "body",
                schema: {
                    name: "abc",
                    email: "abc@gmail.com",
                    password: "abc1234",
                    phone: "956234512"
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
        const result = await ClientCtr1.login(req, res)
        return res.status(result.status).send(result)
        /* 
            #swagger.summary = 'Login user'
            #swagger.tags = ['Client | User']
            #swagger.parameters["body"] = {
                in: "body",
                schema: {
                    email: "abc@gmail.com",
                    password: "abc1234"
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