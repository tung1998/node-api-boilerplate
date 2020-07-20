module.exports = {
  mysql: {
    development: {
      username: "root",
      password: null,
      database: 'LumiTest',
      host: 'localhost',
      port: 3306,
      dialect: 'mysql'
    },
    test: {
      username: "root",
      password: null,
      database: 'LumiTest',
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
      logging: null
    },
    production: process.env.MYSQL_DATABASE_URL
  },
  mongodb: {
    development: {
      username: null,
      password: null,
      database: 'LumiTest',
      host: 'localhost',
      port: 27017,
      dialect: 'mongodb'
    },
    test: {
      username: null,
      password: null,
      database: 'LumiTest',
      host: 'localhost',
      dialect: 'mongodb',
      port: 27017,
      logging: null
    },
    production: process.env.MONGODB_DATABASE_URL
  }
};
