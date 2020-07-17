const { attributes } = require('structure');
const mongoose = require('mongoose');

const USERS = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  createdAt:{
      type: Number,
      default: Date.now()
  },
  updatedAt:{
      type: Number,
      default: Date.now()
  }
});

const UserModel = mongoose.model('Users', USERS);

module.exports = UserModel;
