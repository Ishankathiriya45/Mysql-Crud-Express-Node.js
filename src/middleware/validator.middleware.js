const { responseMsg } = require("../response");
const envMode = process.env.RUN_MODE;

const joyValidate = (schema) => {
    return (req, res, next) => {
        let { error } = schema.validate(req.body || {})

        if (!error) {
            next()
        } else {
            let { details } = error;
            let message = details.map((i) => i.message).join(',')
            
            if (envMode == 'DEV' || envMode == 'LOCAL') {
                console.log({message})
                return res.status(422).send(responseMsg.validationError(0, 'Failed', message))
            } else {
                return res.status(422).send(responseMsg.validationError(0, 'Failed', message))
            }
        }
    }
}

module.exports = {
    joyValidate,
}