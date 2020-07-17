'use strict';
class UsersRepository {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  async getAll() {
    return this.UserModel.find()
  }
  async getById(id) {
    return
  }
  async count(data) {
    return
  }
  async add(user) {
    return this.UserModel.create(user)
  }
  async update(data) {
    return
  }
  async remove(data) {
    return
  }
}

module.exports = UsersRepository