const { SequelizeModelsLoader } = require('../../../infra/sequelize');
const { MongodbModelsLoader } = require('../../../infra/mongodb');
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
  return SequelizeModelsLoader.load({
    sequelize,
    baseFolder: `${__dirname}/mysqlModels`
  });
}

function conectMongodb() {
  let mongodb = {}
  mongodb.conect = function(){
    return mongoose.connect(config.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } 
  return  MongodbModelsLoader.load({
    mongodb,
    baseFolder: `${__dirname}/mongodbModels`
  });
}