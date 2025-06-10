const host = process.env.HOST_DEV;
const swaggerAutoGen = require('swagger-autogen')()
const hostName = host;

const doc = {
  info: {
    title: "Ecommerce",
    description: "Ecommerce Api documentation",
  },
  host: hostName,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  autoBody: true,
  tags: [],
  securityDefinitions: {
    requestTokenAuth: {
      type: "apiKey",
      in: "header",
      name: "requesttoken",
      description: "Enter valid request token.",
    },
    bearerTokenAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter valid authorization token. Like: Bearer Token",
    },
    deviceName: {
      type: "apiKey",
      in: "header",
      name: "devicename",
      description: "Enter valid authorization token. Like: Bearer Token",
    },
  },
}

const otuputFile = "./swagger-output.json";
const routes = ["./src/router/index.js"]

swaggerAutoGen(otuputFile, routes, doc)