const express = require('express');
const { AdminModule } = require('../../../controller/v1');
const { joyValidate } = require('../../../middleware/validator.middleware');
const { ProductValidate } = require('../../../validation/product.validate');
const { productAuth } = require('../../../middleware/authToken.middleware');
const upload = require('../../../service/image.service');
const multer = require('multer');
const { responseMsg } = require('../../../response');
const router = express.Router()

const ProductCtr1 = new AdminModule.productCtr1.ProductController()

router.post('/create/:categoryId',
    async (req, res) => {
        productAuth,
            joyValidate(ProductValidate.createProduct),
            upload.fields([
                { name: 'productImg', maxCount: 1, },
                { name: 'productsUrl', maxCount: 3, },
            ])(req, res, async function (error) {
                if (error instanceof multer.MulterError) {
                    if (error.code == "LIMIT_UNEXPECTED_FILE") {
                        return res.status(422).send(responseMsg.validationError(0, "Too many files uploaded. Max 3 allowed."))
                    }
                } else {
                    const result = await ProductCtr1.createProduct(req, res)
                    return res.status(result.status).send(result)
                    /* 
                        #swagger.summary = 'Add product'
                        #swagger.tags = ['Admin | Product']
                        #swagger.parameters = [
                            {
                                name:"categoryId",
                                in: "params",
                                type: "string"
                            },
                            {
                                name: "body"
                                in: 'body',
                                schema: {
                                    name: "abc",
                                    stock: "20",
                                    price: "12000", 
                                    weight: "12"
                                }
                            }
                        ]
                        #swagger.security = [{
                            "requestTokenAuth": [],
                            "bearerTokenAuth": [],
                        }] 
                    */
                }
            })
    }
)

router.get('/list',
    async (req, res) => {
        const result = await ProductCtr1.getProduct(req, res)
        return res.status(result.status).send(result)
        /* 
            #swagger.summary = 'Retrieve product list'
            #swagger.tags = ['Admin | Product']
            #swagger.parameters = [
                {
                    name: "currentPage"
                    in: 'query',
                    type: 'string',
                },
                {
                    name: "pageSize"
                    in: 'query',
                    type: 'string',
                },
                {
                    name: "isPaginate"
                    in: 'query',
                    type: 'string',
                },
                {
                    name: "search"
                    in: 'query',
                    type: 'string',
                }
            ]
            #swagger.security = [{
                "requestTokenAuth": [],
                "bearerTokenAuth": [],
            }] 
        */
    }
)

router.put('/update/:productId',
    upload.fields([
        { name: 'productImg', maxCount: 1, },
        { name: 'productsUrl', maxCount: 3, },
    ]),
    async (req, res) => {
        const result = await ProductCtr1.editProduct(req, res)
        return res.status(result.status).send(result)
        /* 
            #swagger.summary = 'Update product'
            #swagger.tags = ['Admin | Product']
            #swagger.parameters = [
                {
                    name: "name"
                    in: 'query',
                    type: 'string',
                },
                {
                    name: "stock"
                    in: 'query',
                    type: 'string',
                },
                {
                    name: "price"
                    in: 'query',
                    type: 'string',
                },
                {
                    name: "weight"
                    in: 'query',
                    type: 'string',
                },
                {
                    name: "productId"
                    in: 'params',
                    type: 'string',
                }
            ]
            #swagger.security = [{
                "requestTokenAuth": [],
                "bearerTokenAuth": [],
            }] 
        */
    }
)

router.delete('/delete/:productId',
    async (req, res) => {
        const result = await ProductCtr1.removeProduct(req, res)
        return res.status(result.status).send(result)
        /* 
            #swagger.summary = 'Delete product'
            #swagger.tags = ['Admin | Product']
            #swagger.parameters = [
                {
                    name: "productId"
                    in: 'params',
                    type: 'string',
                }
            ]
            #swagger.security = [{
                "requestTokenAuth": [],
                "bearerTokenAuth": [],
            }] 
        */
    }
)

module.exports = router;