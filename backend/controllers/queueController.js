var queue = require('../models/queue');
var queue_header  = require('../models/queue_header');
var async = require('async');
const url = require('url');
var io = require('socket.io');

exports.node_list = function(req, res) {
  queue.find({id_queue: req.query.queue_id})
    .exec(function (err, queue) {
      if (err) { return next(err); }
      res.render('show_queue', {queue: queue});
    });
};

exports.count_nodes = function(req, res) {
    queue.count({id_queue: req.query.id}, function(err, count) {
      var data = ' ' + count;
      return res.status(200).send(data);
    });
};

exports.queue_list = function(req, res) {
  queue_header.find({id_user: req.user})
    .exec(function (err, list_queue) {
      if (err) { return next(err); }
      return res.send(list_queue);
    });
};

exports.user_list = function(req, res) {
  queue.find({id_queue: req.params.id_queue})
    .exec(function (err, list_users) {
      if (err) { return next(err); }
      return res.send(list_users);
    });

};

exports.enqueue = function(req, res) {
  console.log('Entramos a enqueue');

  queue_header.findOne({_id: req.query.id})
  .exec(function(err, queue_){
    if(queue_){
      queue.findOne({id_queue: req.query.id})
        .sort({arrive: 'desc'}) // give me the max
        .exec(function (err, last) {
          if (err) {
            return res.status(500).send();

          }else{
          let body = req.body;
          if(!last){
            body.id_user = null;
            body.id_next = null;
            body.id_queue = req.query.id;
            body.status = true;
            body.top = true;
            body.number = 1;
          }else{
            body.id_user = null;
            body.id_next = last._id;
            body.id_queue = req.query.id;
            body.status = true;
            body.top = false;
            body.number = last.number + 1;
          }
          queue.create(body, (err, users) =>{
            if(err) throw err;

            if(req.query.pencil == 1){
              res.io.emit('qr' + req.query.id, '#pr' + body.number);
              res.io.emit('qr' + req.query.id, 'id' + req.query.id);

            }else{
              res.io.emit('qr' + req.query.id, 'id' + req.query.id);
            }
            res.io.emit(queue_.id_user, '$$$' + req.query.id);
            res.io.emit('ok', '$$$' + req.query.id);
            res.io.emit('ok', "qrc1" + req.query.id);

            return res.status(200).send();
          });
          }
        });

    }else{
        return res.status(500).send();
    }
  });

};

exports.dequeue = function(req, res) {
    console.log('Entramos a dequeue')
    var id_top;
    var number;
      queue_header.findOne({'_id': req.query.id})
    .exec(function(err, queue_){
      if(!queue_){
        console.log('no existe la cola');
        res.status(200).send('noexiste');
      }else{
        queue.findOne({'top': true, 'id_queue': req.query.id})
        .exec(function(err, top){
          if(!top){
            console.log('vacia');

            return res.status(200).send('vacia');
          }else{
            console.log(top)
            id_top = top._id;
            number = top.number;
            queue.deleteOne({ _id: id_top }, function (err) {
              queue.findOne({ id_next: id_top }, function (err, new_top) {
                if(!new_top){
                console.log('la cola se vacio');
                res.io.emit(queue_.id_user, '$$$' + req.query.id);
                res.io.emit('screen' + req.query.id, number);
                return res.status(200).send('vacia');
                }else{
                  new_top.top = true;
                  new_top.save();
                  res.io.emit(queue_.id_user, '$$$' + req.query.id);
                  res.io.emit('screen' + req.query.id, number);
                  return res.status(200).send('ok');
                }
              })
            });
          }
        });
      }
    });
};

exports.create_queue = function(req, res) {
      let body = req.body;
      body.id_user = req.user;
      body.description = req.body.description_queue;
      body.alias_qr = req.body.alias_qr_queue;
      body.status = true;
      body.address = req.body.address_queue;
      body.lat = req.body.lat;
      body.long = req.body.long;
      body.name = req.body.name_queue;
      queue_header.create(body, (err, user) =>{
        if(err) throw err;
        if(user){
          return res.status(200).send('ok');
        }else{
          return res.status(500).send('err');
        }
      });
};

exports.delete_queue = function(req, res) {
  queue_header.deleteOne({ _id: req.query.queue_id }, (err) => {
      if(err){
        return res.status(500).send();
      }
      queue.deleteMany({id_queue: req.query.queue_id}, (err) => {
        res.io.emit('qr' + req.query.queue_id, "cancel");
        return res.status(200).send();
    });
  });
};
