const UserMapper = require('./SequelizeUserMapper');
const AddressMaper = require('../../mongodb/address/MongodbAddressMapper');
const User = require('../../../domain/user/User');
const Address = require('../../../domain/address/Address');
class SequelizeUsersRepository {
  constructor({ mysqlModel, mongodbModel }) {
    this.UserModel = mysqlModel.user;
    this.AddressModel = mongodbModel.Address;
  }

  async getAll(...args) {
    const users = await this.UserModel.findAll(...args);

    return users.map(UserMapper.toEntity);
  }

  async getById(id) {
    const user = await this._getById(id);

    return UserMapper.toEntity(user);
  }

  async add(userData) {
    const transaction = await this.UserModel.sequelize.transaction();
    const user = new User(userData)
    try {
      const { valid, errors } = user.validate();
      if (!valid) {
        const error = new Error('ValidationError');
        error.details = errors;
        throw error;
      }
      const newUser = await this.UserModel.create(UserMapper.toDatabase(user), transaction);
      const address = new Address({ userID: newUser.id, ...userData })
      const newAddress = await this.AddressModel.create(AddressMaper.toDatabase(address))
      await transaction.commit()
      return {
        user: UserMapper.toEntity(newUser),
        address: AddressMaper.toEntity(newAddress)
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  }

  async update(id, userData) {
    const user = await this._getById(id);
    const transaction = await this.UserModel.sequelize.transaction();
    try {
      const newUser = new User({ id: Number(id), ...userData })
      const address = new Address({ userID: id, ...userData })
      await user.update(UserMapper.toDatabase(newUser), { transaction });
      let { valid, errors } = newUser.validate();
      if (!valid) {
        const error = new Error('ValidationError');
        error.details = errors;
        throw error;
      }
      const newAddress = await this.AddressModel.findOneAndUpdate({ userID: id }, AddressMaper.toDatabase(address),{
        useFindAndModify: false
      });
      await transaction.commit();
      return {
        user: UserMapper.toEntity(user),
        address: AddressMaper.toEntity(newAddress)
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id) {
    const user = await this._getById(id);

    await user.destroy();
    return;
  }

  async count() {
    return await this.UserModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.UserModel.findById(id, { rejectOnEmpty: true });
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `User with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizeUsersRepository;
