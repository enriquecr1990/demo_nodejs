//cargamos la libreria de swig para procesar vistas de html y pasar variables hacia la vista
var swig = require('swig');
//cargamos las constantes que vamos a utilizar en el controlador
var Constantes = require('../config/constantes');
//cargamos el modelo de foro para procesar la informacion
var Foro_model = require('../model/foro_model');
//cargamos el helper de validacion de datos
var Validacion = require('../helper/validaciones');

var Foro_controller = {

    index : function(req,res){
        try{
            var html_head = swig.renderFile(Constantes.RUTA_VISTAS+'default/header.html');
            var menu = swig.renderFile(Constantes.RUTA_VISTAS+'default/menu_mongo.html');
            var foro = swig.renderFile(Constantes.RUTA_VISTAS+'foro/foro.html');
            var html_footer = swig.renderFile(Constantes.RUTA_VISTAS+'default/footer.html',{
                entregable : 'foro'
            });
            res.send(html_head + menu + foro + html_footer);
        }catch (error){
            res.status(500);
            console.log('***** error al buscar mensajes del foro ' + err);
            var error_msg = swig.renderFile(Constantes.RUTA_VISTAS + 'default/mensajes.html',{
                tipo_mensaje : 'danger',
                mensajes : [Constantes.ERROR_MSG]
            });
            res.setHeader('Content-Type','text/html');
            res.send(error_msg);
        }
    },

    /**
     * funcion del controlador para buscar los mensajes del foro que esten almacenados correctamente
     * @param req
     * @param res
     * @response: HTML
     */
    busqueda_mensajes : function(req,res){
        try{
            res.status(200);
            console.log('***** Foro controller -> busqueda_mensajes');
            Foro_model.listar(function(error,result) {
                if(error){
                    console.log('***** error al buscar mensajes del foro');
                    var error_msg = swig.renderFile(Constantes.RUTA_VISTAS + 'default/mensajes.html',{
                        tipo_mensaje : 'danger',
                        mensajes : [Constantes.ERROR_MSG]
                    });
                    res.setHeader('Content-Type','text/html');
                    res.send(error_msg);
                }else{
                    //probando primero y ver que devuelve
                    console.log('***** se obtuvo los mensajes del foro con exito');
                    var mensajes = swig.renderFile(Constantes.RUTA_VISTAS+'foro/mensajes.html',{
                        mensajes : result
                    });
                    res.setHeader('Content-Type','text/html');
                    res.send(mensajes);
                }
            });
        }catch (err){
            res.status(500);
            console.log('***** error al buscar mensajes del foro ' + err);
            var error_msg = swig.renderFile(Constantes.RUTA_VISTAS + 'default/mensajes.html',{
                tipo_mensaje : 'danger',
                mensajes : [Constantes.ERROR_MSG]
            });
            res.setHeader('Content-Type','text/html');
            res.send(error_msg);
        }
    },

    /**
     * funcion para guardar el mensaje recibido de la vista
     * @param req
     * @param res
     * @return JSON
     */
    guardar_mensaje : function(req,res){
        res.setHeader('Content-Type','application/json');
        try{
            res.status(200);
            console.log('***** Foro controller -> guardar mensaje');
            Validacion.msg_validacion = [];
            if(Validacion.form_foro(req.body)){
                var nuevo_mensaje = {
                    fecha : new Date(),
                    remitente : req.body.remitente,
                    asunto : req.body.asunto,
                    mensaje : req.body.mensaje
                };
                Foro_model.guardar_mensaje(function(err,result){
                    if(err){
                        res.json({
                            status : false,
                            msg : [Constantes.ERROR_BD,'No pude guardar el mensaje en el foro']
                        });
                    }else{
                        res.json({
                            status : true,
                            msg : ['Se guardo el mensaje del foro con éxito']
                        });
                    }
                },nuevo_mensaje);
            }else{
                res.json({
                    status : false,
                    msg : Validacion.msg_validacion
                });
            }
        }catch (error){
            res.status(500);
            console.log('***** error al guardar el mensaje en el foro ' + error);
            console.log(error);
            res.json({
                status : false,
                msg : [Constantes.ERROR_MSG]
            });
        }
    },

    /**
     * funcion para guardar el mensaje recibido de la vista
     * @param req
     * @param res
     * @return JSON
     */
    actualizar_mensaje : function(req,res){
        res.setHeader('Content-Type','application/json');
        try{
            res.status(200);
            console.log('***** Foro controller -> actualizar mensaje');
            Validacion.msg_validacion = [];
            var id_mensaje = req.params.id_mensaje_foro;
            if(Validacion.form_foro(req.body)){
                var actualizar_mensaje = {
                    fecha : new Date(),
                    remitente : req.body.remitente,
                    asunto : req.body.asunto,
                    mensaje : req.body.mensaje
                };
                Foro_model.actualizar_mensaje(function(err,result){
                    if(err){
                        res.json({
                            status : false,
                            msg : [Constantes.ERROR_BD,'No pude actualizar el mensaje en el foro']
                        });
                    }else{
                        res.json({
                            status : true,
                            msg : ['Se actualizó el mensaje del foro con éxito']
                        });
                    }
                },id_mensaje,actualizar_mensaje);
            }else{
                res.json({
                    status : false,
                    msg : Validacion.msg_validacion
                });
            }
        }catch (error){
            res.status(500);
            console.log('***** error al actualizar el mensaje en el foro ' + error);
            res.json({
                status : false,
                msg : [Constantes.ERROR_MSG]
            });
        }
    },

    /**
     * funcion para eliminar un mensaje del foro
     * @param req
     * @param res
     * @return JSON
     */
    eliminar_mensaje : function (req,res){
        res.setHeader('Content-Type','application/json');
        try{
            res.status(200);
            console.log('***** Foro controller -> eliminar mensaje');
            var id_mensaje = req.params.id_mensaje_foro;
            console.log('***** id_mensaje: ' + id_mensaje);
            Foro_model.eliminar_mensaje(function(error,result){
                if(error){
                    res.json({
                        status : false,
                        msg : [Constantes.ERROR_MSG,'No pude eliminar el mensaje ' + err]
                    });
                }else{
                    res.json({
                        status : true,
                        msg : ['Se eliminó el mensaje del foro con exito']
                    });
                }
            },id_mensaje);
        }catch (error){
            res.status(500);
            console.log('***** Error al eliminar el mensaje' + error);
            res.json({
                status : false,
                msg : [Constantes.ERROR_MSG]
            });
        }
    },

}

//exportamos el foro controller para que pueda ser utilizado por ejemplo en las rutas
module.exports = Foro_controller;