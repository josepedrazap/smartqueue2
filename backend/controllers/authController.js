var user = require('../models/users');
var queue_header = require('../models/queue_header');

const url = require('url');
const bcrypt = require('bcrypt');
const service = require('../services');
const saltRounds = 10;

exports.exec = (req, res) => {
    user.findOne({name: req.body.user})
    .exec((err, usr) => {
      if(err){
        console.log(err);
        return res.status(400);
      }
      if(!usr){
        return res.status(404).send('No existe el usuario.');
      }else{
        bcrypt.compare(req.body.pass, usr.password, function(err, resp) {
          if(resp == true){
            return res.status(200).send({token: service.createToken(usr), user_id: usr._id, user: usr.name});
          }else{
            return res.status(403).send('Contraseña incorrecta.');
          }
        });
      }
    });
};

exports.signin = (req, res) => {
  return res.render('signin');
};

exports.create_user = (req, res) => {
    if(req.body.pass == req.body.pass_rpt){
      user.findOne({name: req.body.user})
      .exec((err, usr) => {
        if(!usr){
              bcrypt.hash(req.body.pass, saltRounds, function(err, hash) {
                user.create({name: req.body.user, password: hash}, (err, user) => {

                  if(err) throw err;
                    return res.status(200).send({token: service.createToken(user)});
                });
              });
        }else{
          return res.status(200).send('600');
        }
      });
    }else{
      return res.status(200).send('403');
    }
}
