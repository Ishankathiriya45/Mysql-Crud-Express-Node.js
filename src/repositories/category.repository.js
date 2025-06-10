const { db:{Category} } = require("../models");
const { fetchRecord } = require("../util/common.util");

class CategoryRepository {
    findAll = async (option = {}, unscoped = null) => {
        return await fetchRecord(Category, option, option.paginate, unscoped)
    }
}

module.exports = new CategoryRepository()