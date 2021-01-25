let express = require('express');
//iniciamos las rutas de la variable para almacenar las del contacto controller rest
let router_rest_contacto = express.Router();
//cargamos el middleware para usar las rutas de contacto con autenticacion por token JWT
let middleware_jwt = require('../middleware/login');
//cargamos el contacto controller rest
let contacto_rest_controller = require('../controller/rest_contacto_controller');

router_rest_contacto.get('/contacto',middleware_jwt,contacto_rest_controller.listar);
router_rest_contacto.get('/contacto/:id_contacto',middleware_jwt,contacto_rest_controller.contacto_id);
router_rest_contacto.post('/contacto',middleware_jwt,contacto_rest_controller.guardar);
router_rest_contacto.put('/contacto/:id_contacto',middleware_jwt,contacto_rest_controller.actualizar);
router_rest_contacto.delete('/contacto/:id_contacto',middleware_jwt,contacto_rest_controller.eliminar);

module.exports = router_rest_contacto;