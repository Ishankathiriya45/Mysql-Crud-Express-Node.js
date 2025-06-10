const bcrypt = require('bcrypt')

module.exports = {
    bcryptPassword: async (password) => {
        return await bcrypt.hash(password, 10)
    },

    compareBcrypt: async (password, userPass) => {
        return await bcrypt.compare(password, userPass)
    },
}