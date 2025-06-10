const { EventEmitter } = require('events')
const EmailService = require('../service/email.service')

const myEmitter = new EventEmitter()
const emailService = new EmailService()

myEmitter.on("send-mail", async (data) => {
    await emailService.sendMail(data.email, data.subjact, data.body)
})

module.exports = myEmitter;