const { where } = require("sequelize")
const { db: { Role, User, UserRole } } = require("../../../models")
const { responseMsg } = require("../../../response");
const { UserService } = require("../../../service/data/user.service");
const { generateOtp, getDynamicContent } = require("../../../util/common.util");
const { getEpochFromDate } = require("../../../util/date.util");
const eventHandler = require('../../../handlers/event.handler');
const { compareBcrypt, bcryptPassword } = require("../../../util/bcrypt.util");

class AuthController {
    constructor() {
        this.userService = new UserService()
    }

    async sendOtp(req, res) {
        try {
            const { email, type, isMailUpdate = false } = req.body;

            const getUser = await this.userService.findByEmail(email)

            if (!getUser) {
                return responseMsg.validationError(0, "User not found")
            }

            const prepareOtpRequest = {
                otp: generateOtp(),
                otp_send_date: getEpochFromDate(new Date()),
            }

            const emailData = {
                otp: prepareOtpRequest.otp,
                user_name: getUser.name,
            }

            const subject = getDynamicContent(
                type === "EMAIL"
                    ? isMailUpdate == true
                        ? "email-updated-subject"
                        : "email-verification-subject"
                    : "forgot-password-subject",
                null,
                "emailContent"
            );
            const body = getDynamicContent(
                type === "EMAIL"
                    ? isMailUpdate == true
                        ? "email-updated-body"
                        : "email-verification-body"
                    : "forgot-password-body",
                emailData,
                "emailContent"
            );

            eventHandler.emit("send-mail", { email, subject, body })

            return responseMsg.successCode(1, "We have send a verification code to your email address.")
        } catch (error) {
            return responseMsg.serverError(0, "Something went wrong.", error.message)
        }
    }

    async otpVerification(req, res) {
        const { email, otp } = req.body;

        const getUser = await this.userService.findByEmail(email)

        if (!getUser) {
            return responseMsg.validationError(0, "User not found")
        }

        return responseMsg.successCode(1, "Success")
    }

    async resetPassword(req, res) {
        try {
            const { email, password } = req.body;

            const userDetail = await this.userService.findByEmail(email)

            if (!userDetail) {
                return responseMsg.validationError(0, "User not found")
            }

            await this.userService.update(password, {
                where: {
                    id: userDetail.id,
                }
            })

            return responseMsg.successCode(1, "Password reset successfully!")
        } catch (error) {
            return responseMsg.serverError(0, "Something went wrong", error.message)
        }
    }

    async changePassword(req, res) {
        try {
            const { tokenpayload: { id } } = req.headers;
            const { oldPassword, newPassword } = req.body;

            const userDetail = await this.userService.findById(id)

            if (!userDetail) {
                return responseMsg.validationError(0, "User not found")
            }

            const isPasswordMatch = await compareBcrypt(oldPassword, userDetail.password)

            if (!isPasswordMatch) {
                return responseMsg.validationError(0, "Password does not match with old one")
            }

            await this.userService.update(
                { password: await bcryptPassword(newPassword) },
                { where: { id: id } },
            )

            return responseMsg.successCode(1, "Password changed successfully!")
        } catch (error) {
            return responseMsg.serverError(0, "Something went wrong", error.message)
        }
    }
}

module.exports = {
    AuthController,
}