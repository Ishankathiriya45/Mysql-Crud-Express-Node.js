const express = require('express');
const { CommonModule } = require('../../../controller/v1');
const { bearerToken, checkAuth, productAuth, passwordAuth } = require('../../../middleware/authToken.middleware');
const router = express.Router()

let AuthCtr1 = new CommonModule.authCtr1.AuthController()

router.post('/sendOtp',
    async (req, res) => {
        const result = await AuthCtr1.sendOtp(req, res)
        return res.status(result.status).send(result)
    }
)

router.post('/reset-password',
    async (req, res) => {
        const result = await AuthCtr1.resetPassword(req, res)
        return res.status(result.status).send(result)
    }
)

router.post('/change-password',
    passwordAuth,
    async (req, res) => {
        const result = await AuthCtr1.changePassword(req, res)
        return res.status(result.status).send(result)
    }
)

module.exports = router;