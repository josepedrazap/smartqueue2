var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController');
const auth = require('../middlewares/auth');

router.post('/exec', auth_controller.exec);
router.get('/signin', auth_controller.signin);
router.post('/create_user', auth_controller.create_user);

module.exports = router;
