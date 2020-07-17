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
  if(process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if(fs.existsSync(path.join(__dirname, './database.js'))) {
    let databaseConfig = require('./database')[ENV]
    console.log(databaseConfig)
    return `${databaseConfig.dialect}://${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.database}`
  }
}
