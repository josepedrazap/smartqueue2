var SerialPort = require('serialport');
var port = new SerialPort('COM4', 19200);

var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
port.pipe(parser); // pipe the serial stream to the parser

var express = require('express');
var app = express();
var puerto = 3002;

app.get('/', function (req, res) {
  port.write(req.query.num, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log("numero: " + req.query.num);
    console.log('message written');
    return res.status(200).send();
  });
});

app.listen(puerto, function () {
  console.log('Servicio de impresion corriendo en el puerto: ' + puerto);
});

// Open errors will be emitted as an error event
parser.on('data', readSerialData);

port.on('error', function(err) {
  console.log('Error: ', err.message);
})

function readSerialData(data) {
   console.log("Data leida: " + data);
}
