const { db: { Category } } = require("../models");
const { fetchRecords } = require("../util/common.util");

class CategoryRepository {
    findAll = async (option = {}, unscoped = false) => {
        return await fetchRecords(Category, option, option?.is_paginate, unscoped)
    }
}

module.exports = new CategoryRepository()