const fs = require('fs');
const path = require('path');

module.exports = {
  load({ mongodb, baseFolder }) {
    const loaded = {};

    fs.readdirSync(baseFolder)
      .filter((file) => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
      })
      .forEach((file) => {
        const modelName = file.split('.')[0];
        loaded[modelName] = require(`${baseFolder}/${file}`)
      });
    mongodb.models = loaded;
    return mongodb
  }
};
