var express = require('express');
var router = express.Router();

var screen_controller = require('../controllers/screenController');

router.get('/run_qr', screen_controller.run_qr);
router.get('/run_screen', screen_controller.run_screen);

module.exports = router;
