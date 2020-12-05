//cargamos la libreria de express que usaremos para las rutas
var express = require('express');
//inicializamos la variable para almacenar las rutas de la funcion de express llamada Router
var router = express.Router();
//cargamos el controlador de contacto que usaremos desde las rutas
var Foro_controller = require('../controller/foro_controller');

router.get('/',Foro_controller.index);
router.get('/mensajes',Foro_controller.busqueda_mensajes);
router.post('/guardar',Foro_controller.guardar_mensaje);
router.post('/actualizar/:id_mensaje_foro',Foro_controller.actualizar_mensaje);
router.post('/eliminar/:id_mensaje_foro',Foro_controller.eliminar_mensaje);

//exportamos las rutas para que se agreguen al index del servidor de node JS
module.exports = router;