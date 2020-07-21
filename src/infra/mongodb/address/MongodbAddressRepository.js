const AddressMapper = require('./MongodbAddressMapper');

class MongodbAddressRepository {
  constructor({ mongodbModel }) {
    this.AddressModel = mongodbModel.Address;
  }

  async getAll(...args) {
    return await this.AddressModel.find()
  }

  async getById(id) {
    const address = await this._getById(id);
    return address
  }

  async add(address) {
    const { valid, errors } = address.validate();
    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }
    const newAddress = await this.AddressModel.create(address.toJSON());
    return newAddress
  }

  async remove(id) {
    await this.AddressModel.deleteOne({_id: id});
    return ;
  }
  
  async removeByUserID(userID) {
    await this.AddressModel.deleteOne({userID: userID});
    return ;
  }

  async update(id, newData) {

    try {

      const { valid, errors } = newData.validate();

      if (!valid) {
        const error = new Error('ValidationError');
        error.details = errors;
        throw error;
      }
      const updatedAddress = await this.AddressModel.update(id, newData.toJSON());

      return updatedAddress;
    } catch (error) {
      throw error;
    }
  }
  
  async addUserAddress(userID, newData) {

    try {
      const updatedAddress = await this.AddressModel.update({userID}, {$push:{userInfo:newData}});
      return updatedAddress;
    } catch (error) {
      throw error;
    }
  }

  async count() {
    return await this.AddressModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.AddressModel.findOne({_id: id});
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Address with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = MongodbAddressRepository;
