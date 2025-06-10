const { where } = require("sequelize")
const userRepository = require("../../repositories/user.repository")
const { db: { UserRole, Role } } = require("../../models")
const roleRepository = require("../../repositories/role.repository")
const userRoleRepository = require("../../repositories/userRole.repository")

class UserService {
    findByEmail = async (email) => {
        return await userRepository.findOne({
            where: {
                email: email,
            }
        })
    }

    findById = async (id) => {
        return await userRepository.findById(id)
    }

    findByRole = async (options) => {
        return await userRepository.findOne({
            where: options,
            include: [{
                model: UserRole,
                include: Role,
            }]
        })
    }

    findRole = async (options) => {
        return await roleRepository.findOne({
            where: {
                name: options,
            }
        })
    }

    createUserRole = async (userId, roleId) => {
        return await userRoleRepository.create({
            userId: userId,
            roleId: roleId,
        })
    }

    create = async (options) => {
        return await userRepository.create(options)
    }

    update = async (requestData, options) => {
        return await userRepository.update(requestData, options)
    }
}

module.exports = {
    UserService,
}