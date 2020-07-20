const { ModelsLoader } = require('../../../infra/sequelize');
const Sequelize = require('sequelize');
const mongoose = require('mongoose')
const { db: config } = require('../../../../config');

if (config) {
 
  module.exports = {
    mysql: conectMysql(),
    mongodb: conectMongodb()
  }
} else {
  /* eslint-disable no-console */
  console.error('Database configuration not found, disabling database.');
  /* eslint-enable no-console */
}



function conectMysql() {
  const sequelize = new Sequelize(config.mysql);
  return ModelsLoader.load({
    sequelize,
    baseFolder: `${__dirname}/mysqlModels`
  });
}

function conectMongodb() {
  return mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}