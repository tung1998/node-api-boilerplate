const AddressSerializer = {
  serialize({ id, userID, address }) {
    return {
      id,
      userID,
      address
    };
  }
};

module.exports = AddressSerializer;
