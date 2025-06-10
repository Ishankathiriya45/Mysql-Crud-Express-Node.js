const { db:{UserRole} } = require("../models");

class UserRoleRepository{
    create = async (options) => {
        return await UserRole.create(options)
    }
}

module.exports = new UserRoleRepository();