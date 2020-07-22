const Operation = require('../Operation');

class CreateUser extends Operation {
  constructor({ usersRepository }) {
    super();
    this.usersRepository = usersRepository;
  }

  async execute(userData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    try {
      const newUser = await this.usersRepository.add(userData);
      this.emit(SUCCESS, newUser);
    } catch (error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

CreateUser.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateUser;
