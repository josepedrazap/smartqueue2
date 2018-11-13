var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var queue_headerSchema = new Schema(
  {
    id_user: {type: Schema.Types.ObjectId, ref: 'users'},
    name: {type: String},
    status: {type: Boolean},
    date: {type: Date, default: Date.now},
    description: {type: String},
    lat: {type: Number},
    long: {type: Number},
    address: {type: String},
    number_now: {type: Number},
    lambda: {type: Number},
    cont: {type: Number},
    cont_2: {type: Number},
    time_avg: {type: Number},
    time_exe_prev: {type: Date}
  }
);
//Export model
module.exports = mongoose.model('queue_header', queue_headerSchema);
