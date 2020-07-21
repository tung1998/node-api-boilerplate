const Operation = require('../Operation');

class DeleteUser extends Operation {
  constructor({ usersRepository, addressesRepository }) {
    super();
    this.usersRepository = usersRepository;
    this.addressesRepository = addressesRepository;
  }

  async execute(userID) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.usersRepository.remove(userID);
      await this.addressesRepository.removeByUserID(userID);
      
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

DeleteUser.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteUser;
