const Operation = require('../Operation');
const User = require('../../domain/user/User');
const Address = require('../../domain/address/Address');

class CreateUser extends Operation {
  constructor({ usersRepository, addressesRepository }) {
    super();
    this.usersRepository = usersRepository;
    this.addressesRepository = addressesRepository;
  }

  async execute(userData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    const user = new User(userData);
    console.log(user)

    try {
      const newUser = await this.usersRepository.add(user);
      const newAddress = new Address({ userID: newUser.id });
      if (newUser) await this.addressesRepository.add(newAddress);
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
