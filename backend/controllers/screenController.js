var user = require('../models/users');
var queue_header = require('../models/queue_header');
var io = require('socket.io');

exports.run_qr = (req, res, next) => {
  queue_header.find({_id: req.query.queue_id})
  .exec(function (err, q) {
    if(!q){
      res.send('No existe la queue');
    }else{
      console.log(q);
      res.render('qr', { title: 'Express', ini: '1', q: q});
      res.io.emit('ok', "qrc1" + req.query.queue_id);

    }
  });
};

exports.run_screen = (req, res, next) => {
    res.render('screen_principal', {id: req.query.queue_id});
    res.io.emit('ok', "scr1" + req.query.queue_id);
};
