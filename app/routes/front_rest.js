var express = require('express');
var router_front = express.Router();

var front_controller = require('../controller/front_controller');

router_front.get('/',front_controller.index);

module.exports = router_front;