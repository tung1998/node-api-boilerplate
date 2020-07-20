const Address = require('../../../domain/address/Address');

const MongodbAddressMapper = {
  toEntity({ dataValues }) {
    const { id, name } = dataValues;

    return new Address({ id, userID, address });
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  }
};

module.exports = MongodbAddressMapper;
