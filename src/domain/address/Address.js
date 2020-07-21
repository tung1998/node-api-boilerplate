const { attributes } = require('structure');

const Address = attributes({
  userID: {
    type: String,
    required: true
  },
  userInfo: {
    type: Array,
    itemType: Object,
  }
})(class Address {
  
});


module.exports = Address;
