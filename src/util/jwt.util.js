const jwt = require('jsonwebtoken');
const accessSecretKey = process.env['ACCESS_SECRET_KEY_' + process.env.RUN_MODE]

module.exports = {
    createJwt: (token) => {
        return jwt.sign(token, accessSecretKey, { expiresIn: '3d' })
    },

    verifyJwt: (token) => {
        return jwt.verify(token, accessSecretKey)
    }
}