var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: {type: String},
    password: {type: String},
  }
);


//Export model
module.exports = mongoose.model('user', userSchema);
