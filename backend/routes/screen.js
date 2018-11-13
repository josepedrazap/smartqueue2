var express = require('express');
var router = express.Router();

var screen_controller = require('../controllers/screenController');

router.get('/qr_demo', screen_controller.qr_demo);
router.get('/run_qr', screen_controller.run_qr);
router.get('/run_screen', screen_controller.run_screen);
router.get('/num_screen', screen_controller.num_screen);
router.get('/call', screen_controller.call);
module.exports = router;
