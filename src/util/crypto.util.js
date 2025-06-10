const crypto = require('node:crypto')
const { Buffer } = require('node:buffer')

const password = process.env['ENCRYPTION_SECRET_KEY_' + process.env.RUN_MODE]
let algorithm = process.env['ENCRYPTION_ALGORITHM_' + process.env.RUN_MODE]
let key = crypto.scryptSync(password, "salt", 32)
let iv = Buffer.alloc(16, 0)

module.exports = {
    encryptData: (data) => {
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encryptedData = cipher.update(data, "utf8", "hex");
        encryptedData += cipher.final("hex");
        console.log({ encryptedData })
        return encryptedData;
    },

    decryptData: (data) => {
        let decipher = crypto.createDecipheriv(algorithm, key, iv)
        let decrypt = decipher.update(data, "hex", "utf-8")
        decrypt += decipher.final('utf-8')
        return decrypt;
    },
}
