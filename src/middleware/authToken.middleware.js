const { responseMsg } = require('../response');
const { CryptoUtil, JwtUtil } = require('../util');

const bearerToken = (req) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return {
            valid: false,
            message: 'No Token',
        }
    }

    let part = authorization.split(" ")
    let token = part[1];
    let tokenPart = token.split('.')

    if (part.length != 2 && tokenPart.length != 3 && !/^Bearer$/i.test(part[0])) {
        return {
            valid: false,
            message: 'Token error',
        }
    }

    try {
        const decoded = JwtUtil.verifyJwt(token)
        req.headers.tokenpayload = decoded;
        return {
            valid: true,
        }
    } catch (error) {
        return {
            valid: false,
            message: error.message,
        }
    }
}

const checkAuthorizationToken = async (req, res, next) => {
    const checkBearerToken = bearerToken(req);

    if (checkBearerToken.valid == true) {
        next()
    } else {
        return res.status(422).send(responseMsg.validationError(
            0,
            checkBearerToken.message ? checkBearerToken.message : 'Invalid token')
        )
    }
}

const requestToken = (req) => {
    const { requesttoken } = req.headers;

    if (!requesttoken) {
        return false;
    }

    let plainText = CryptoUtil.decryptData(requesttoken)

    if (!plainText) {
        return false;
    }

    let requestText = plainText.trim().toLowerCase()

    const encryptMsg = process.env['ENCRYPTION_MESSAGE_' + process.env.RUN_MODE]

    requestText == encryptMsg;
    return true;
}

const checkAuth = (req, res, next, role) => {
    try {
        const checkBearerToken = bearerToken(req)

        if (checkBearerToken.valid == true || requestToken(req) == true) {
            const { tokenpayload: { role_name } } = req.headers;

            if (role.includes(role_name)) {
                next()
            } else {
                return res.status(422).send(responseMsg.validationError(
                    0,
                    checkBearerToken.message ? checkBearerToken.message : 'Invalid token'
                ))
            }
        } else {
            return res.status(422).send(responseMsg.validationError(
                0,
                checkBearerToken.message ? checkBearerToken.message : 'Invalid token'
            ))
        }
    } catch (error) {
        return res.send(responseMsg.validationError(0, 'Something went wrong', error.message))
    }
}

const productAuth = (req, res, next) => {
    return checkAuth(req, res, next, ['Admin'])
}

const passwordAuth = (req, res, next) => {
    return checkAuth(req, res, next, ['Admin', 'Client'])
}

module.exports = {
    checkAuthorizationToken,
    productAuth,
    passwordAuth,
}