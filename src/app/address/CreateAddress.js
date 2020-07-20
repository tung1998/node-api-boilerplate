const Operation = require('../Operation');
const Address = require('../../domain/address/Address');

class CreateAddress extends Operation {
  constructor({ addressesRepository }) {
    super();
    this.addressesRepository = addressesRepository;
  }

  async execute(addressData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const address = new Address(addressData);

    try {
      const newAddress = await this.addressesRepository.add(address);

      this.emit(SUCCESS, newAddress);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateAddress.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateAddress;
