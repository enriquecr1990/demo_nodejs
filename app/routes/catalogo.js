var express = require('express');
//inicializamos la variable para almacenar las rutas de la funcion de express llamada Router
var router_catalogo = express.Router();
//cargamos el controlador de contacto que usaremos desde las rutas
//tenemos que subir un directorio para que accedamos a la carpeta de controller
var Catalogo_controller = require('../controller/catalogo_controller');

router_catalogo.get('/tipo_telefono/listar',Catalogo_controller.tipo_telefono);

module.exports = router_catalogo;