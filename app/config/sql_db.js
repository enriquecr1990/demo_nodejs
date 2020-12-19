var mysql = require('mysql');
var server = require('os');
var config = {};
//cargamos la configuracion de la BD dependiendo de donde este alojado el server
//hubo problemas con el servidor de aplicaciones con respecto a la BD, opte por poner una en la nube para que no exista ese problema
switch (server.hostname()){
    //server local en mi equipo personal llamado HP-K1V4
    case 'HP-K1V4':
        config = {
            host : '127.0.0.1',
            user : 'root',
            port : '3306',
            password : '',
            database : 'sitio_contacto'
        };
        break;
    //server azure por el despliegue de la free web app alojada en 'https://enrique-nodejs.azurewebsites.net/'
    case 'RD281878A01181':
        /*config = {
            host : '127.0.0.1',
            user : 'azure',
            port : '52931',
            password : '6#vWHD_$',
            database : 'sitio_contacto'
        };*/
        config = {
            host : '151.106.97.204',
            user : 'u471544287_unirnodejs',
            port : '3306',
            password : 'Pa$$word1234',
            database : 'u471544287_unir_node_js'
        }
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