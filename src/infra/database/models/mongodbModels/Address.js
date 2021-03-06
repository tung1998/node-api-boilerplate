const mongoose = require('mongoose');

const ADDRESS = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now()
    },
    updatedAt: {
        type: Number,
        default: Date.now()
    },
    userInfo: {
        type: Array,
        default:[]
    }
});

const Address = mongoose.model('Addresses', ADDRESS);

module.exports = Address;