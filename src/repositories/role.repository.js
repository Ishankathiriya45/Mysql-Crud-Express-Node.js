const { db:{Role} } = require("../models");

class RoleRepository{
    findOne = async (options) => {
        return await Role.findOne(options)
    }
}

module.exports = new RoleRepository();