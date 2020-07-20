const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
const {
  CreateUser,
  GetAllUsers,
  GetUser,
  UpdateUser,
  DeleteUser
} = require('./app/user');

const {
  CreateAddress,
  GetAllAddresses,
  GetAddress,
  UpdateAddress,
  DeleteAddress
} = require('./app/address');

const UserSerializer = require('./interfaces/http/controler/user/UserSerializer');
const AddressSerializer = require('./interfaces/http/controler/address/AddressSerializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');

const SequelizeUsersRepository = require('./infra/sequelize/user/SequelizeUsersRepository');

const MongodbAddressRepository = require('./infra/mongodb/address/MongodbAddressRepository');

const database = require('./infra/database/models');
const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Sequelize Repositories
container.register({
  usersRepository: asClass(SequelizeUsersRepository).singleton()
});

// Mongodb Repositories
container.register({
  addressesRepository: asClass(MongodbAddressRepository).singleton()
});

// Database
container.register({
  database: asValue(database),
  mysqlModel: asValue(database.mysql.models),
  mongodbModel: asValue(database.mongodb.models)
});

// Operations
container.register({
  createUser: asClass(CreateUser),
  getAllUsers: asClass(GetAllUsers),
  getUser: asClass(GetUser),
  updateUser: asClass(UpdateUser),
  deleteUser: asClass(DeleteUser)
});

container.register({
  createAddress: asClass(CreateAddress),
  getAllAddresses: asClass(GetAllAddresses),
  getAddress: asClass(GetAddress),
  updateAddress: asClass(UpdateAddress),
  deleteAddress: asClass(DeleteAddress)
});

// Serializers
container.register({
  userSerializer: asValue(UserSerializer),
  addressSerializer: asValue(AddressSerializer)
});

module.exports = container;
