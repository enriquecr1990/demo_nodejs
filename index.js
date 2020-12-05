var express = require('express'); //se agrega el express para la app web
var bodyParser = require('body-parser');//se agrega el body parser para poder recibir los datos de un formulario por medio de un post

//inicializacion de la app por medio de express
var app = express();
//se codifica el post para que lo acepte como una variante de los datos json application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//definimos la carpeta publica para que sea accesible en las rutas del navegador
app.use(express.static('public'));

/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});*/

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

app.get('/mongo_test',function(req,res){
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://ecoronar:ecrunirmx2020@cluster0.l6yaw.mongodb.net/";
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        console.log('***** nos conectamos a mongo chido :-D');
        var basemongo = db.db('foro');
        basemongo.collection('mensajes').find().toArray(function(err,result){
            if(err){throw err;}
            console.log(result);
            res.send(result);
        });
        db.close();
    })
});

//se agrega el listen para arrancar el servidor en el puerto 8080
app.listen(8080,function(){
    console.log('***** Se inicio el servidor correctamente'); 
});