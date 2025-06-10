const { db: { Category } } = require("../../models");
const categoryRepository = require("../../repositories/category.repository");
const { fetchRecord } = require("../../util/common.util");

class CategoryService {
    findAll = async (options = {}) => {
        return await categoryRepository.findAll(options, true)
    }

    create = async (option) => {
        return await Category.create(option)
    }
}

module.exports = {
    CategoryService,
}