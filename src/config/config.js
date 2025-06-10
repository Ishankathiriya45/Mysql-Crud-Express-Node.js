require('dotenv').config()
let envMode = process.env.RUN_MODE;

const dbConfig = {
    local: {
        username: process.env.DB_USERNAME_LOCAL,
        password: process.env.DB_PASSWORD_LOCAL,
        database: process.env.DB_NAME_LOCAL,
        host: process.env.DB_HOSTNAME_LOCAL,
        dialect: "mysql",
    },
    test: {
        username: process.env.DB_USERNAME_TEST,
        password: process.env.DB_PASSWORD_TEST,
        database: process.env.DB_NAME_TEST,
        host: process.env.DB_HOSTNAME_TEST,
        dialect: "mysql",
    },
    production: {
        username: process.env.DB_USERNAME_PROD,
        password: process.env.DB_PASSWORD_PROD,
        database: process.env.DB_NAME_PROD,
        host: process.env.DB_HOSTNAME_PROD,
        dialect: "mysql",
    },
}

// const config = {
//     [envMode.toLowerCase()]: {
//         username: process.env[`DB_USERNAME_${envMode}`],
//         password: process.env[`DB_PASSWORD_${envMode}`],
//         database: process.env[`DB_NAME_${envMode}`],
//         host: process.env[`DB_HOSTNAME_${envMode}`],
//         dialect: "mysql",
//     },
//     pool: {
//         min: parseInt(process.env.DB_POOL_MIN),
//         max: parseInt(process.env.DB_POOL_MAX),
//         acquire: process.env.DB_POOL_ACQUIRE,
//         idle: parseInt(process.env.DB_POOL_IDLE),
//     },
//     run_mode: envMode,
//     port: process.env[`PORT_${envMode}`],
//     host: process.env[`HOST_${envMode}`],
//     url: process.env[`URL_${envMode}`],
// }

global.config = dbConfig;
module.exports = dbConfig;

module.exports = dbConfig;