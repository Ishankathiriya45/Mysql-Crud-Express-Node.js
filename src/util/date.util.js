const momemt = require("moment")

module.exports = {
    getEpochFromDate: (date) => {
        momemt(date, "D/M/YYYY H:mm").valueOf()
    }
}