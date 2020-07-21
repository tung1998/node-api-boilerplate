const Operation = require('../Operation');

class DeleteAddress extends Operation {
  constructor({ addressesRepository }) {
    super();
    this.addressesRepository = addressesRepository;
  }

  async execute(addressId) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.addressesRepository.remove(addressId);
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

DeleteAddress.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteAddress;
