const multer = require("multer");
const path = require('path')
const fs = require('fs')

const imageStore = multer.diskStorage({
    destination: function (req, file, cb) {
        switch (file.fieldname) {
            case 'productImg':
                cb(null, 'public/upload/product')
                break;
            case 'productsUrl':
                cb(null, 'public/upload/products')
                break;
            default:
                cb(null, 'public/upload/common')
                break;
        }
    },

    filename: function (req, file, cb) {
        const getFileName = () => {
            return (
                Date.now() + "-" +
                path.basename(file.originalname, path.extname(file.originalname))
                    .replace(/ /g, '_') +
                path.extname(file.originalname)
            )
        }

        switch (file.fieldname) {
            case 'productImg':
                cb(null, getFileName())
                break;
            case 'productsUrl':
                cb(null, getFileName())
                break;
            default:
                cb(null, getFileName())
                break;
        }
    }
})

const fileFilter = (req, file, cb) => {
    try {
        let allowedType = [];
        switch (file.fieldname) {
            case 'productImg':
            case 'productsUrl':
                allowedType = [
                    '.jpg',
                    '.png',
                    '.jfif',
                    '.jpeg',
                ]
                break;
            default:
                allowedType = [];
                break;
        }

        const extname = path.extname(file.originalname)

        if (allowedType.includes(extname)) {
            console.log('File valid')
            cb(null, true)
        } else {
            cb(new Error('File type not valid'))
        }
    } catch (error) {
        cb(new Error('Something went wrong', error.message))
    }
}

const upload = multer({ fileFilter: fileFilter, limits: { fileSize: 3 * 1024 * 1024 } })

module.exports = upload;