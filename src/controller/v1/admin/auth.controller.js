const { where } = require('sequelize');
const { responseMsg } = require('../../../response');
const { BcryptUtil, JwtUtil } = require('../../../util');
const { UserService } = require('../../../service/data/user.service');

class AuthController {
    constructor() {
        this.userService = new UserService()
    }

    async register(req, res) {
        try {
            const { name, email, password, phone } = req.body;

            const getUser = await this.userService.findByEmail(email)

            if (getUser) {
                return responseMsg.validationError(0, 'Email already exist')
            }

            const hashPassword = await BcryptUtil.bcryptPassword(password)

            const userData = {
                name: name,
                email: email,
                password: hashPassword,
                phone: phone,
            }

            const detail = await this.userService.create(userData)

            if (detail) {
                const tokenData = {
                    email: detail.email,
                    role_name: 'Admin',
                }

                const getRole = await this.userService.findRole('Admin')

                await this.userService.createUserRole(detail.id, getRole.id)

                const token = JwtUtil.createJwt(tokenData)

                return responseMsg.successCode(1, 'Success', token)
            }
        } catch (error) {
            return responseMsg.serverError(0, 'Failed', error.message)
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const getUser = await this.userService.findByEmail(email)

            let ckeckPassword = await BcryptUtil.compareBcrypt(password, getUser.password)

            if (getUser && ckeckPassword) {

                let whereCluse = {};
                whereCluse.email = getUser.email;

                const user = await this.userService.findByRole(whereCluse)

                if (user.UserRole.Role.slug !== "admin") {
                    return responseMsg.validationError(0, "Invalid login attempt")
                }

                const tokenData = {
                    id: getUser.id,
                    email: getUser.email,
                    role_name: user.UserRole.Role.name,
                }

                const token = JwtUtil.createJwt(tokenData)

                return responseMsg.successCode(1, 'Success', token)
            } else {
                return responseMsg.notFound(0, 'Failed')
            }
        } catch (error) {
            return responseMsg.serverError(0, 'Failed', error.message)
        }
    }
}

module.exports = {
    AuthController,
}