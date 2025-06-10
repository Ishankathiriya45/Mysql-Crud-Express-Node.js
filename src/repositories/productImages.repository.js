const { db: { ProductImages } } = require("../models");

class ProductImagesRepository {
    bulkCreate = async (productData) => {
        return await ProductImages.bulkCreate(productData)
    }

    destroy = async (option) => {
        return await ProductImages.destroy(option)
    }
}

module.exports = new ProductImagesRepository();