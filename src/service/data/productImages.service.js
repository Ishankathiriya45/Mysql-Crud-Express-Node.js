const { where } = require("sequelize")
const productImagesRepository = require("../../repositories/productImages.repository")

class ProductImagesService {
    bulkCreate = async (productData) => {
        return await productImagesRepository.bulkCreate(productData)
    }

    destroyById = async (id) => {
        return await productImagesRepository.destroy({
            where: {
                product_id: id,
            }
        })
    }
}

module.exports = {
    ProductImagesService,
}