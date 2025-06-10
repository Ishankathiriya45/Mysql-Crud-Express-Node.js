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
    }
)

router.post('/login',
    joyValidate(UserValidate.login),
    async (req, res) => {
        const result = await AuthCtr1.login(req, res)
        return res.status(result.status).send(result)
    }
)

module.exports = router;