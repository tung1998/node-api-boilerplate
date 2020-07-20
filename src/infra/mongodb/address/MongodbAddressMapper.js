const Address = require('../../../domain/address/Address');

const MongodbAddressMapper = {
  toEntity({ dataValues }) {
    const { _id, userID, address} = dataValues;

    return new Address({ _id, userID, address });
  },

  toDatabase(survivor) {
    const { userID } = survivor;

    return { userID, address };
  }
};

module.exports = MongodbAddressMapper;
