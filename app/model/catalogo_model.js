//cargamos la configuracion de la Base de datos
var mysql = require('../config/sql_db');

var Catalogo_model = {

    tipo_telefono : function(call_controller){
        console.log('***** peticion Contacto model');
        //cargamos la query para obtener el listado de contacto
        var query = 'select * from catalogo_tipo_telefono';
        console.log('***** consulta: ' + query);
        mysql.query(query, call_controller);
    }
}

module.exports = Catalogo_model;