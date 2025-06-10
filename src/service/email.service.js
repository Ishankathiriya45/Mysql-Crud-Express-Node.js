const { text } = require('express');
const nodemailer = require('nodemailer')

class EmailService {
    sendMail = async (to, subject, emailData) => {
        const transporter = nodemailer.createTransport({
            service: process.env["EMAIL_SERVICE_" + process.env.RUN_MODE],
            secure: false,
            auth: {
                user: process.env["EMAIL_USERNAME_" + process.env.RUN_MODE],
                pass: process.env["EMAIL_PASSWORD_" + process.env.RUN_MODE],
            },
        })

        const options = {
            from: process.env["EMAIL_USERNAME_" + process.env.RUN_MODE],
            to: to,
            subject: subject,
            text: emailData,
        }

        try {
            const info = await transporter.sendMail(options)
            // console.log({ info })
        } catch (error) {
            console.log({ error })
            throw error;
        }
    }
}

module.exports = EmailService;