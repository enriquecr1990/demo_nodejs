//cargamos la configuracion de la BD para conectarnos
var mongo =  require('../config/mongo_db');

//creamos la tipo clase con el nombre de foro model que tendra todas las operaciones del acceso a datos
var Foro_model = {

    /**
     * funcion para listar todos los mensajes guardados en la coleccion de mensajes
     * @param call_controller
     */
    listar : function(call_controller){
        console.log('***** Foro_model - listar');
        mongo.cliente.connect(mongo.uri,function(err,database){
            if(err) {
                console.log('***** foro model -> listar mensajes ---- no se conecto a la BD');
                throw err;
            }
            var db = database.db('foro');
            db.collection('mensajes').find().toArray(call_controller);
        });
    },

    /**
     * funcion para guardar un nuevo mensaje en la coleccion
     * esta funcion la podremos utilizar de igual forma para uno nuevo como para actualizar
     * @param call_controller
     * @param data_mensaje
     */
    guardar_mensaje : function(call_controller,data_mensaje){
        console.log('***** Foro_model - guardar_mensaje');
        mongo.cliente.connect(mongo.uri,function(err,database){
            if(err) {
                console.log('***** foro model -> guardar mensajes ---- no se conecto a la BD');
                throw err;
            }
            var db = database.db('foro');
            db.collection("mensajes").insertOne(data_mensaje,call_controller);
        });
    },

    actualizar_mensaje : function(call_controller,id_mensaje,data_mensaje){
        console.log('***** Foro model -> actualizar mensaje');
        mongo.cliente.connect(mongo.uri,function(err,database){
            if(err) {
                console.log('***** foro model -> actualizar mensajes ---- no se conecto a la BD');
                throw err;
            }
            var db = database.db('foro');
            var id = require('mongodb').ObjectID(id_mensaje);
            var update = {$set : data_mensaje};
            db.collection("mensajes").updateOne({_id : id},update,call_controller);
        });
    },

    /**
     * funcion para eliminar el mensaje correcpondiente
     * @param call_controller
     * @param id_mensaje
     */
    eliminar_mensaje : function(call_controller,id_mensaje){
        console.log('***** Foro_model - eliminar mensaje');
        mongo.cliente.connect(mongo.uri,function(err,database){
            if(err) throw err;
            console.log('***** nos conectamos a mongo chido :-D');
            var db = database.db('foro');
            var id = require('mongodb').ObjectID(id_mensaje);
            db.collection("mensajes").deleteOne({_id : id},call_controller);
        });
    }

}

//exportamos la variable tipo clase model para que pueda ser utilizada en otra parte del codigo con el require
module.exports = Foro_model;