//cargamos la configuracion de la Base de datos
var mysql = require('../config/sql_db');

var Usuario_model = {

    usuario_login : function(call_controller,usr_login){
        console.log('***** peticion Usuario model');
        //cargamos la query para obtener el usuario que intenta logearse
        var query_base = "select * from usuario u where u.usuario = '"+usr_login+"'";
        console.log('***** consulta: '+ query_base);
        mysql.query(query_base,call_controller);
    },

    usuario_nuevo : function(call_controller,data_usuario){
        console.log('***** Usuario_model -> usuario_nuevo');
        var query = "INSERT INTO usuario (usuario,password) values ";
        query += "('"+data_usuario.usr+"' , '"
            +data_usuario.pass+"')";
        console.log('***** consulta: ' + query);
        mysql.query(query,call_controller);
    },

};

module.exports = Usuario_model;