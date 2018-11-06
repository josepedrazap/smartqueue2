var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var queueSchema = new Schema(
  {
    id_user: {type: Schema.Types.ObjectId, ref: 'users'},
    id_next: {type: Schema.Types.ObjectId, ref: 'queue'},
    arrive: {type: Date, default: Date.now},
    number: {type: Number},
    id_queue: {type: Schema.Types.ObjectId, ref: 'queue_header'},
    status: {type: Boolean},
    top: {type: Boolean}
  }
);

queueSchema
.virtual('position')
.get(function () {
  return this.id_queue + ', ' + this.id_user + ', ' + this.arrive + ', ' + this.status;
});

//Export model
module.exports = mongoose.model('queue', queueSchema);
