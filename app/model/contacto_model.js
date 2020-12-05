//cargamos la configuracion de la BD para conectarnos
var mysql = require('../config/sql_db');
var Extra_query = require('../helper/criterios_query');

//creamos la 'tipo clase' llamada contacto model que tendra todas las operaciones del acceso a datos
var Contacto_model = {

    /**
     * Funcion que nos dara todos los registros obtenidos de la tabla de contacto, metodo sobrecargado por el extra params
     * params:
     * 1. call_controller la funcion que reciba para procesar los datos del controlodaor
     * 2. extra params, para determinar que parametros llegaron para aplicar filtro a la query (opcional)
     */
    listar : function(call_controller,extra_params = []){
        console.log('***** peticion para listar contactos');
        var query_base = "select c.*, if(c.id_genero = 1, 'Masculino','Femenino') genero, ctt.tipo_telefono " +
            "from contacto c inner join catalogo_tipo_telefono ctt on ctt.id_catalogo_tipo_telefono = c.id_catalogo_tipo_telefono";
        var extra_query = Extra_query.form_busqueda(extra_params);
        console.log('***** consulta: '+query_base + extra_query);
        mysql.query(query_base + extra_query, call_controller);
    },

    /**
     * Funcion que nos devolvera el registro del contacto conforme al ID
     * params:
     * 1. call_controller la funcion que reciba para procesar los datos del controlodaor
     * 2. id_contacto: es el identificador de la BD para procesarlo en la query
     */
    contacto : function(call_controller,id_contacto){
        console.log('***** Contacto_model -> contacto');
        var query_base = "select * from contacto c where c.id =" + id_contacto;
        console.log('***** ' + query_base);
        mysql.query(query_base,call_controller);
    },

    /**
     * Funcion processara el guardado de un nuevo registro o actualizara uno existente
     * la regla proviene del id de contacto que llege en el data_contacto si es diferente de vacio o 0 es actualizar
     * caso contrario insertar nuevo
     * params:
     * 1. call_controller la funcion que reciba para procesar los datos del controlodaor
     * 2. id_contacto: es el identificador de la BD para procesarlo en la query
     */
    guardar : function(call_controller,data_contacto){
        console.log('***** Contacto_model -> guardar');
        var query = "INSERT INTO contacto set ?";
        if(data_contacto.id != '' && data_contacto.id != 0){
            query = "UPDATE contacto SET ? WHERE id="+data_contacto.id;
        }
        console.log('***** consulta: ' + query);
        mysql.query(query,data_contacto,call_controller);
    },

    /**
     * funcion que eliminara el registro del contacto conforme al ID
     * params:
     * 1. call_controller la funcion que reciba para procesar los datos del controlodaor
     * 2. id_contacto: es el identificador de la BD para procesarlo en la query
     */
    eliminar : function(call_controller,id_contacto){
        console.log('***** Contacto_model -> eliminar');
        var query = 'DELETE FROM contacto WHERE id = ' + id_contacto;
        console.log('***** consulta: ' + query);
        mysql.query(query,call_controller);
    }

}

//exportamos la variable tipo clase contacto model para que pueda ser utilizada en otra parte del codigo con el require
module.exports = Contacto_model;