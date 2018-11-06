var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var queue_headerSchema = new Schema(
  {
    id_user: {type: Schema.Types.ObjectId, ref: 'users'},
    name: {type: String},
    status: {type: Boolean},
    date: {type: Date, default: Date.now},
    alias_qr: {type: String},
    description: {type: String},
    lat: {type: Number},
    long: {type: Number},
    address: {type: String}
  }
);
//Export model
module.exports = mongoose.model('queue_header', queue_headerSchema);
