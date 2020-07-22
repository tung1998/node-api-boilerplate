const Address = require('../../../domain/address/Address');

const MongodbAddressMapper = {
  toEntity(dataValues) {
    const { _id, userID, userInfo} = dataValues;
    return new Address({ _id, userID, userInfo });
  },

  toDatabase(survivor) {
    const { userID, userInfo } = survivor;

    return { userID, userInfo };
  }
};

module.exports = MongodbAddressMapper;
