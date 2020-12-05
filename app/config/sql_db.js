var mysql = require('mysql');
var server = require('os');
var config = {};
//cargamos la configuracion de la BD dependiendo de donde este alojado el server
switch (server.hostname()){
    //server local en mi equipo personal llamado HP-K1V4
    case 'HP-K1V4':
        config = {
            host : '127.0.0.1',
            user : 'root',
            port : '3306',
            password : '',
            database : 'sitio_php'
        };
        break;
    //server azure por el despliegue de la free web app alojada en 'https://enrique-nodejs.azurewebsites.net/'
    case 'RD0003FFDCC7CC':
        config = {
            host : '127.0.0.1',
            user : 'azure',
            port : '52758',
            password : '6#vWHD_$',
            database : 'sitio_php'
        };
        break;
    //cargamos la configuracion por default
    default:
        config = {
            host : '127.0.0.1',
            user : 'root',
            port : '3306',
            password : '',
            database : 'sitio_php'
        };
        break;
}
//creamos la conexion de la bd conforme al config llenado previamente en el switch
var conexionDB = mysql.createConnection(config);

//nos conectamos a la BD
conexionDB.connect(function(error){
    if(error){
        throw error;
    }
    console.log('***** Conexion BD - Mysql correctamente');
});

//exportamos el modulo de la conexion de la BD
module.exports = conexionDB;