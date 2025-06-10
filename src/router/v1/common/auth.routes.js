const express = require('express');
const { CommonModule } = require('../../../controller/v1');
const { bearerToken, checkAuth, productAuth, passwordAuth } = require('../../../middleware/authToken.middleware');
const router = express.Router()

let AuthCtr1 = new CommonModule.authCtr1.AuthController()

router.post('/sendOtp',
    async (req, res) => {
        const result = await AuthCtr1.sendOtp(req, res)
        return res.status(result.status).send(result)
        /* 
            #swagger.summary = 'Send otp'
            #swagger.tags = ['Common | User']
            #swagger.parameters["body"] = {
                in: "body",
                schema: {
                    email: "abc@gmail.com",
                    type: "Email || Password",
                    isMailUpdate: "true || false"
                }
            }            
            #swagger.security = [{
                "requestTokenAuth": [],
                "bearerTokenAuth": [],
            }] 
        */
    }
)

router.post('/reset-password',
    async (req, res) => {
        const result = await AuthCtr1.resetPassword(req, res)
        return res.status(result.status).send(result)
        /* 
            #swagger.summary = 'Reset otp'
            #swagger.tags = ['Common | User']
            #swagger.parameters["body"] = {
                in: "body",
                schema: {
                    email: "abc@gmail.com",
                    password: "password"
                }
            }            
            #swagger.security = [{
                "requestTokenAuth": [],
                "bearerTokenAuth": [],
            }] 
        */
    }
)

router.post('/change-password',
    passwordAuth,
    async (req, res) => {
        const result = await AuthCtr1.changePassword(req, res)
        return res.status(result.status).send(result)
        /* 
            #swagger.summary = 'Change otp'
            #swagger.tags = ['Common | User']
            #swagger.parameters = [
                {
                    name: "userId",
                    in: "headers",
                    type: "string"
                },
                {
                    name: "body",
                    in: "body",
                    schema: {
                        oldPassword: "old_password",
                        newPassword: "new_password"
                    }
                }
            ]            
            #swagger.security = [{
                "requestTokenAuth": [],
                "bearerTokenAuth": [],
            }] 
        */
    }
)

module.exports = router;