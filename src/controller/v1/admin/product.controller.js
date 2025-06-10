const { where, Op } = require("sequelize");
const fs = require('fs')
const path = require('path')
const { responseMsg } = require("../../../response");
const { ProductService } = require("../../../service/data/product.service");
const { isEmpty, getFilterClauses, generateOtp, getSearchClause } = require("../../../util/common.util");
const { ProductImagesService } = require("../../../service/data/productImages.service");
const { db: { Product } } = require("../../../models");
const FileService = require("../../../service/file.service");

class ProductController {
    constructor() {
        this.productService = new ProductService()
        this.productImagesService = new ProductImagesService()
        this.fileService = new FileService()
    }

    async createProduct(req) {
        try {
            const { categoryId } = req.params;
            const { name, stock, price, weight } = req.body;

            const productFile = req.files['productImg']?.[0];
            const productUrlFile = req.files['productsUrl'] || [];

            let imageName = null;
            if (productFile) {
                const uploadFile = await this.fileService.uploadFile(
                    productFile,
                    "product",
                    "disk",
                )
                imageName = uploadFile.fileName;
            }

            const productData = {
                name: name,
                category: categoryId,
                stock: stock,
                price: price,
                weight: weight,
                productImg: imageName || null,
            }

            const detail = await this.productService.create(productData)

            const productImgs = productUrlFile.map((file) => ({
                productsUrl: file.filename,
                product_id: detail.id,
            }))

            await this.productImagesService.bulkCreate(productImgs)

            if (detail) {
                return responseMsg.successCode(1, 'Success', detail)
            } else {
                return responseMsg.notFound(0, 'No product added')
            }
        } catch (error) {
            return responseMsg.serverError(0, 'Failed', error.message)
        }
    }

    async getProduct(req) {
        try {
            const { currentPage, pageSize, isPaginate = true, search } = req.query;
            const { productId } = req.params;
            const options = {};

            if (isPaginate) {
                options.currentPage = currentPage;
                options.pageSize = pageSize;
                options.is_paginate = isPaginate;
            }

            if (!isEmpty(search)) {
                options.where = {
                    ...options.where,
                    ...getFilterClauses({
                        fields: ["name", "productImg"],
                        search,
                    })
                }
            }

            const getDetail = await this.productService.findAll(options)

            if (getDetail) {
                return responseMsg.successCode(1, "Success", getDetail)
            } else {
                return responseMsg.serverError(0, "No product")
            }

        } catch (error) {
            return responseMsg.serverError(0, "Failed", error.message)
        }
    }

    async editProduct(req) {
        try {
            const { productId } = req.params;
            const { name, category, stock, price, weight } = req.body;

            const getDetail = await this.productService.findOne({
                where: {
                    id: productId,
                },
                include: Product,
            })

            if (!getDetail) {
                return responseMsg.serverError(0, "No product")
            }

            let updateData = {};
            let productImg;
            let productsUrl;

            if (req.files['productImg']) {
                const productFile = req.files['productImg']?.[0];
                productImg = productFile.filename;
            }

            name ? (updateData.name = name) : null;
            category ? (updateData.category = category) : null;
            stock ? (updateData.stock = stock) : null;
            price ? (updateData.price = price) : null;
            weight ? (updateData.weight = weight) : null;
            productImg ? (updateData.productImg = productImg) : null;

            const editDetail = await this.productService.update(updateData, {
                where: {
                    id: productId,
                },
            })

            for (const item of getDetail.ProductImages) {

                if (req.files['productsUrl']) {

                    const productMulFile = req.files['productsUrl'] || [];

                    productsUrl = productMulFile.map((file) => ({
                        productsUrl: file.filename,
                        product_id: productId,
                    }))

                    await this.productImagesService.destroyById(productId)

                    await this.productImagesService.bulkCreate(productsUrl)
                }
            }

            if (editDetail) {
                return responseMsg.successCode(1, "Success", editDetail)
            } else {
                return responseMsg.serverError(0, "Failed product updated")
            }
        } catch (error) {
            return responseMsg.serverError(0, "Something went wrong", error.message)
        }
    }

    async removeProduct(req) {
        try {
            const { productId } = req.params;

            const getDetail = await this.productService.findOne({
                where: {
                    id: productId,
                },
            })

            if (!getDetail) {
                return responseMsg.serverError(0, "No product")
            }

            const removeDetail = this.productService.destroyById(productId)

            if (removeDetail) {
                return responseMsg.successCode(1, "Success", removeDetail)
            } else {
                return responseMsg.serverError(0, "Failed product deleted")
            }
        } catch (error) {
            return responseMsg.serverError(0, "Something went wrong")
        }
    }
}

module.exports = {
    ProductController,
}