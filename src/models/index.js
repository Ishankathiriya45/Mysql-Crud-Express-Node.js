'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const clc = require('cli-color');
const basename = path.basename(__filename);
const db = {};

const DB_NAME = process.env['DB_NAME_' + process.env.RUN_MODE]
const DB_USERNAME = process.env['DB_USERNAME_' + process.env.RUN_MODE]
const DB_PASSWORD = process.env['DB_PASSWORD_' + process.env.RUN_MODE]
const DB_HOSTNAME = process.env['DB_HOSTNAME_' + process.env.RUN_MODE]

let sequelize;

sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOSTNAME,
  dialect: 'mysql',
  pool: {
    min: parseInt(process.env.DB_POOL_MIN),
    max: parseInt(process.env.DB_POOL_MAX),
    acquire: process.env.DB_POOL_ACQUIRE,
    idle: process.env.DB_POOL_IDLE,
  }
})

sequelize.authenticate().then(() => {
  console.log(clc.magenta.underline(`Database Connection succeefully:`), clc.cyan.underline(`DB_NAME:${DB_NAME}`))
}).catch((error) => {
  console.log(clc.red.underline(`Connection failed`, error.message))
})

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = { db };
