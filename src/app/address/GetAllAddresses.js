const Operation = require('../Operation');

class GetAllAddresses extends Operation {
  constructor({ addressesRepository }) {
    super();
    this.addressesRepository = addressesRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const addresses = await this.addressesRepository.getAll({
        attributes: ['id', 'name',]
      });

      this.emit(SUCCESS, addresses);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllAddresses.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllAddresses;
