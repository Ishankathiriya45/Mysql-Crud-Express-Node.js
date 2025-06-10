const { db:{Product} } = require("../models");
const { fetchRecords } = require("../util/common.util");

class ProductRepository {
    findAll = async (options = {}, unscoped = false) => {
        return await fetchRecords(Product, options, options?.is_paginate, unscoped)
    }

    findOne = async (option) => {
        return await Product.findOne(option)
    }

    create = async (productData) => {
        return await Product.create(productData)
    }

    update = async (requestData, option) => {
        return await Product.update(requestData, option)
    }

    destroy = async (option) => {
        return await Product.destroy(option)
    }
}

module.exports = new ProductRepository();