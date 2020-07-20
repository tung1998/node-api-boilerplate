const { attributes } = require('structure');

const Address = attributes({
  _id: Object,
  userID: {
    type: String,
    required: true
  },
  address: Array
})(class Address {
  
});


module.exports = Address;
