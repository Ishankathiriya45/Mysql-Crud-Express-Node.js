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
    }
)

router.post('/login',
    joyValidate(UserValidate.login),
    async (req, res) => {
        const result = await ClientCtr1.login(req, res)
        return res.status(result.status).send(result)
    }
)

module.exports = router;