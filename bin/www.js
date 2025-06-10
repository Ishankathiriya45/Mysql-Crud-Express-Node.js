const clc = require("cli-color");
const app = require("../src/server");

let port = process.env['PORT_' + process.env.RUN_MODE]
app.set("port", port)

app.listen(port, (error) => {
    if (error) {
        console.error(error.message)
        process.exit(1)
    }
    console.log(`Your application running on port ${clc.green.underline(port)} in ${clc.green.underline(process.env.RUN_MODE)} environment`)
})