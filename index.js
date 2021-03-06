var express = require('express'); //se agrega el express para la app web
var bodyParser = require('body-parser');//se agrega el body parser para poder recibir los datos de un formulario por medio de un post
const PORT = process.env.PORT || 8080;
//inicializacion de la app por medio de express
var app = express();
//se codifica el post para que lo acepte como una variante de los datos json application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//definimos la carpeta publica para que sea accesible en las rutas del navegador
app.use(express.static('public'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//ruta del index para el servidor de node js
app.get('/',function(req,res){
    res.send('***** Peticion root del proyecto web usando mvc');
});

/**
 * apartado de rutas para la integracion con MySQL
 */

//cargamos las rutas en base la obtencion de los catalogos
var catalogo_ruta = require('./app/routes/catalogo');
app.use('/catalogo',catalogo_ruta);

//cargamos las rutas en base a las que se dieron de alta en el app/routes/routes.js
var contacto_ruta = require('./app/routes/contacto');
app.use('/contacto',contacto_ruta);

/**
 * apartado de rutas para la integracion con MongoDB
 */
var foro_rutas = require('./app/routes/foro');
app.use('/foro',foro_rutas);

/**
 * apartado de rutas para el servicio del API REST
 */
//ruta de catalogos
var catalogo_rest_ruta = require('./app/routes/rest_catalogo');
app.use('/api/rest',catalogo_rest_ruta);
//ruta de contacto
var contacto_rest_ruta = require('./app/routes/rest_contacto');
app.use('/api/rest',contacto_rest_ruta);
//ruta de usuario
var usuario_rest_ruta = require('./app/routes/rest_usuario');
app.use('/api/rest',usuario_rest_ruta);

//cargamos la ruta que exclusivamente va a cargar la vista que consumira los servicios del api rest
var contacto_front = require('./app/routes/front_rest');
app.use('/contacto_front',contacto_front);

//agregamos un middleware para cuando no esta bien procesada una petición/URL
var MiddlewareStatus = require('./app/middleware/status');
new MiddlewareStatus(app);

//se agrega el listen para arrancar el servidor en el puerto de la constante
app.listen(PORT,function(){
    console.log('***** Se inicio el servidor correctamente PORT: ' + PORT);
});