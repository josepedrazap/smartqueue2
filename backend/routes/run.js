var express = require('express');
var router = express.Router();

// Require controller modules.
var auth_controller = require('../controllers/authController');
var queue_controller = require('../controllers/queueController');
var auth = require('../middlewares/auth.js');

router.get('/queue/list', auth, queue_controller.node_list);

router.get('/queue_header/list', auth, queue_controller.queue_list);

router.get('/queue/count_nodes', auth, queue_controller.count_nodes);

router.get('/queue/data_queue', queue_controller.data_queue);

router.get('/queue/user_list/:id_queue/', auth, queue_controller.user_list);

router.get('/queue/enqueue', queue_controller.enqueue);

router.get('/queue/dequeue', auth, queue_controller.dequeue);

router.post('/queue/create_queue',auth, queue_controller.create_queue);

router.get('/queue/delete_queue', auth, queue_controller.delete_queue);

router.post('/users/create', auth_controller.create_user);

module.exports = router;
