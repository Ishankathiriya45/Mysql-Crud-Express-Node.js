const { Op, where } = require("sequelize");
const { responseMsg } = require("../../../response");
const { CategoryService } = require("../../../service/data/category.service");
const { isEmpty, getFilterClauses } = require("../../../util/common.util");
const { db: { Product } } = require("../../../models");

class CategoryController {
    constructor() {
        this.categoryService = new CategoryService()
    }

    async createCategory(req) {
        try {
            const { name } = req.body;

            const detail = await this.categoryService.create({ name })

            if (detail) {
                return responseMsg.successCode(1, "Success", detail)
            } else {
                return responseMsg.validationError(0, "Failed category added")
            }
        } catch (error) {
            return responseMsg.serverError(0, "Something went wrong", error.message)
        }
    }

    async getProduct(req) {
        try {
            const { search, currentPage, pageSize, paginate = true } = req.query;

            let options = {
                include: [{ model: Product }]
            };

            if (paginate) {
                options.currentPage = currentPage;
                options.pageSize = pageSize;
                options.is_paginate = paginate;
            }

            if (!isEmpty(search)) {
                options.where = {
                    ...options.where,
                    ...getFilterClauses({
                        fields: ["name"],
                        search,
                    })
                }
            }

            const getDetail = await this.categoryService.findAll(options)

            if (getDetail) {
                return responseMsg.successCode(1, "Success", getDetail)
            } else {
                return responseMsg.serverError(0, "Failed get product")
            }
        } catch (error) {
            return responseMsg.serverError(0, "Something went wrong", error.message)
        }
    }
}

module.exports = {
    CategoryController,
}