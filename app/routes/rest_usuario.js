let express = require('express');
//iniciamos las rutas de la variable para almacenar las del contacto controller rest
let router_rest_usuario = express.Router();
//cargamos el contacto controller rest
let usuario_rest_controller = require('../controller/rest_usuario_controller');

router_rest_usuario.get('/usuario',usuario_rest_controller.login);
router_rest_usuario.post('/usuario',usuario_rest_controller.nuevo);

module.exports = router_rest_usuario;