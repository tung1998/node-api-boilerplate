const mongoose = require('mongoose')
const { db: config } = require('../../../../config');
if(config) {
  module.exports = {
    start(){
      mongoose.connect(config,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    }
  } 
} else {
  /* eslint-disable no-console */
  console.error('Database configuration not found, disabling database.');
  /* eslint-enable no-console */
}

