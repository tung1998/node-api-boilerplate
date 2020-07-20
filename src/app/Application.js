const { mysql } = require("../../config/database");

class Application {
  constructor({ server, database, logger }) {
    this.server = server;
    this.database = database;
    this.logger = logger;
    if (database && database.options && database.options.logging) {
      database.options.logging = logger.info.bind(logger);
    }
  }
  async start() {
    if (this.database && this.database.mysql) {
      await this.database.mysql.authenticate();
      console.log("mysql conected")
    }
    if (this.database && this.database.mongodb) {
      await this.database.mongodb
      console.log("mongodb conected")
    }

    await this.server.start();
  }
}

module.exports = Application;
