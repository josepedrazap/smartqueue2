var user = require('../models/users');
var queue_header = require('../models/queue_header');
var io = require('socket.io');

exports.qr_demo = (req, res) => {
  res.render('qr_prueba');
};

exports.call = (req, res) => {
   res.send('Call');
   res.io.emit('screen' + req.query.id, 'call');
   return res.status(200);
};

exports.num_screen = (req, res) => {
  queue_header.findOne({_id: req.query.id})
  .exec(function (err, q) {
    if(!q){
      return res.status(404).send();
    }else{
      var num = ' ' + q.number_now;
      return res.status(200).send({num: num});
    }

  });
};

exports.run_qr = (req, res, next) => {
  queue_header.find({_id: req.query.queue_id})
  .exec(function (err, q) {
    if(!q){
      res.send('No existe la queue');
    }else{
      console.log(q);
      res.render('qr', { title: 'Express', ini: '1', q: q});
    }
  });
};

exports.run_screen = (req, res, next) => {
    res.render('screen_principal', {id: req.query.queue_id});
};
