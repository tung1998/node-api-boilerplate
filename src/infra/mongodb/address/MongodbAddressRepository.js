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

    return this.AddressModel.find({

    })
  }

  async add(address) {
    const { valid, errors } = address.validate();
    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      
      throw error;
    }
    const newAddress = await this.AddressModel.create(address.toJSON());
    return newAddress
  }

  async remove(id) {
    const address = await this._getById(id);

    await address.destroy();
    return;
  }

  async update(id, newData) {
    const address = await this._getById(id);

    const transaction = await this.AddressModel.sequelize.transaction();

    try {
      const updatedAddress = await address.update(newData, { transaction });
      const addressEntity = AddressMapper.toEntity(updatedAddress);

      const { valid, errors } = addressEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return addressEntity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.AddressModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.AddressModel.findById(id, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Address with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = MongodbAddressRepository;
