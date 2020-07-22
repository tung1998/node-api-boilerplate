const User = require('../../../domain/user/User');

const SequelizeUserMapper = {
  toEntity({ dataValues }) {
    const { id, name, pass, age } = dataValues;
    return new User({ id, name, pass, age });
  },

  toDatabase(survivor) {
    const { name, pass, age } = survivor;
    return { name, pass, age };
  }
};

module.exports = SequelizeUserMapper;
