require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const { db } = require('./models')
const { default: rateLimit } = require('express-rate-limit')
const moment = require('moment')
const morgan = require('morgan-body')
const app = express()

app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use('/public', express.static(path.join(__dirname, '../public')))

// define set limit options
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 min
    limit: process.env['REQUEST_LIMIT_' + process.env.RUN_MODE],
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: "You have exceeded your requests per minute limit.",
})
app.use(limiter)

let date = moment().utc().format('YYYY-MM-DD')
let logFile = date + ".log";
let logStreamFile = fs.createWriteStream(path.join(__dirname, "logs", logFile), { flags: 'a' })

morgan(app, {
    noColors: true,
    stream: {
        write: (message) => {
            if (date != moment().utc().format('YYYY-MM-DD')) {
                "";
            } else {
                logStreamFile.write(message)
            }
        }
    },
    logAllReqHeader: true,
})

app.use('/api', require('./router'))

module.exports = app;