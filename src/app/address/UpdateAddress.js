const Operation = require('../Operation');
const Address = require('../../domain/address/Address');

class UpdateAddress extends Operation {
  constructor({ addressesRepository }) {
    super();
    this.addressesRepository = addressesRepository;
  }

  async execute(addressId, addressData) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    const address = new Address(addressData);
    try {
      await this.addressesRepository.update({ _id: addressId }, address);
      this.emit(SUCCESS, address);
    } catch (error) {
      switch (error.message) {
        case 'ValidationError':
          return this.emit(VALIDATION_ERROR, error);
        case 'NotFoundError':
          return this.emit(NOT_FOUND, error);
        default:
          this.emit(ERROR, error);
      }
    }
  }
}

UpdateAddress.setOutputs(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = UpdateAddress;
