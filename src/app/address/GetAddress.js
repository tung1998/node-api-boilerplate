const Operation = require('../Operation');

class GetAddress extends Operation {
  constructor({ addressesRepository }) {
    super();
    this.addressesRepository = addressesRepository;
  }

  async execute(addressId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const address = await this.addressesRepository.getById(addressId);
      this.emit(SUCCESS, address);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetAddress.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetAddress;
