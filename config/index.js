require('dotenv').load();

const fs = require('fs');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';

const envConfig = require(path.join(__dirname, 'environments', ENV));
const dbConfig = loadDbConfig();
const config = Object.assign({
  [ENV]: true,
  env: ENV,
  db: dbConfig
}, envConfig);
module.exports = config;

function loadDbConfig() {
  let dbConfig = {}
  if(process.env.MYSQL_DATABASE_URL)
    dbConfig.mysql=process.env.MYSQL_DATABASE_URL
  else if(fs.existsSync(path.join(__dirname, './database.js')))
    dbConfig.mysql=require('./database').mysql[ENV];

  if(process.env.MONGODB_DATABASE_URL) {
    dbConfig.mongodb=process.env.MONGODB_DATABASE_URL
  }else if(fs.existsSync(path.join(__dirname, './database.js'))){
    databaseConfig = require('./database').mongodb[ENV]
    dbConfig.mongodb=`${databaseConfig.dialect}://${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`
  }
  return dbConfig;
}
