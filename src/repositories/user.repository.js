const { db: { User } } = require("../models");

class UserRepository {
    findOne = async (options) => {
        return await User.findOne(options)
    }

    findById = async (options) => {
        return await User.findByPk(options)
    }

    create = async (options) => {
        return await User.create(options)
    }

    update = async (requestData, options) => {
        return await User.update(requestData, options)
    }
}

module.exports = new UserRepository();