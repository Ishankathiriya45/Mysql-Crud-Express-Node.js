const { where } = require("sequelize");
const productRepository = require("../../repositories/product.repository");

class ProductService {
    findAll = async (options = {}) => {
        return await productRepository.findAll(options, true)
    }

    findOne = async (options) => {
        return await productRepository.findOne(options)
    }

    create = async (productData) => {
        return await productRepository.create(productData)
    }

    bulkCreate = async (productData) => {
        return await productRepository.bulkCreate(productData)
    }

    update = async (requestData, option) => {
        return await productRepository.update(requestData, option)
    }

    destroyById = async (id) => {
        return await productRepository.destroy({
            where: {
                id: id,
            }
        })
    }
}

module.exports = {
    ProductService,
}