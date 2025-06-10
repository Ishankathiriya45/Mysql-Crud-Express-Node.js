const express = require('express');
const { AdminModule } = require('../../../controller/v1');
const router = express.Router()

let CategoryCtr1 = new AdminModule.categoryCtr1.CategoryController()

router.post('/create',
    async (req, res) => {
        const result = await CategoryCtr1.createCategory(req, res)
        return res.status(result.status).send(result)
    }
)

router.get('/list',
    async (req, res) => {
        const result = await CategoryCtr1.getProduct(req, res)
        return res.status(result.status).send(result)
    }
)

module.exports = router;