//cargamos la libreria de express que usaremos para las rutas
var express = require('express');
//inicializamos la variable para almacenar las rutas de la funcion de express llamada Router
var router = express.Router();
//cargamos el controlador de contacto que usaremos desde las rutas
//tenemos que subir un directorio para que accedamos a la carpeta de controller
var Contacto_controller = require('../controller/contacto_controller');

//inicamos las rutas para la app que usaremos con MySQL
router.get('/',Contacto_controller.busqueda);//ruta de home de contacto
router.post('/tablero',Contacto_controller.tablero);//ruta para obtener la tabla html de los contactos
router.post('/form_contacto',Contacto_controller.modificar_agregar);//ruta para mostrar el formulario de contacto
router.post('/data_contacto/:id_contacto', Contacto_controller.data_contacto);//ruta para obtener los datos de contacto conforme a la BD
router.post('/guardar',Contacto_controller.guardar);//ruta que usariamos para guardar contacto
router.post('/eliminar/:id_contacto',Contacto_controller.eliminar); //ruta para eliminar un contacto

//exportamos las rutas para que puedan ser usadas donde se inyecte el archivo routes.js
module.exports = router;