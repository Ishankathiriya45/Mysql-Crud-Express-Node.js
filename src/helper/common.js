const fs = require('fs')
const path = require('path')

module.exports = {
    deleteFile: (filePath) => {
        try {
            // check if the file exist
            if (fs.existsSync(filePath)) {
                // delete file
                fs.unlinkSync(filePath)
                console.log(`Image deleted successfully ${filePath}`)
            } else {
                console.log(`Image not found ${filePath}`)
            }
        } catch (error) {
            console.error('Error deleting image', error.message)
        }
    },

    getRandomNumber: () => {
        return Math.floor(1000 + Math.random() * 9000)
    },

    imageCreate: (fileName, buffer) => {
        let filePath = path.join('public/upload/product', fileName)
        const writeStream = fs.createWriteStream(filePath)
        writeStream.write(buffer)
    }
}