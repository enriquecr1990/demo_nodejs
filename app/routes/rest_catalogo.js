var express = require('express');
//inicializamos la variable para almacenar las rutas de la funcion de express llamada Router
var router_rest_catalogo = express.Router();
//cargamos el controlador de contacto que usaremos desde las rutas
//tenemos que subir un directorio para que accedamos a la carpeta de controller
//mandamos a llamar nuestro catalogo rest controller
var catalogo_rest_controller = require('../controller/rest_catalogo_controller');

router_rest_catalogo.get('/catalogo/tipo_telefono',catalogo_rest_controller.tipo_telefono);

module.exports = router_rest_catalogo;