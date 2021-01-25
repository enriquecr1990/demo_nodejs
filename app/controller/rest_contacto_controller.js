//crearemos el controllador rest de contacto
//en este caso solamente vamos a devolver peticiones json sin nada de vistas
var Constantes = require('../config/constantes');
//cargamos el modelo de contacto para procesar la informacion
var Contacto_model = require('../model/contacto_model');
//cargamos el helper de validacion de datos
var Validacion = require('../helper/validaciones');
var Convertidor = require('../helper/convertidor');

var Rest_contacto_controller = {

    /**
     * funcion del controllador para obtener el tablero de contactos
     * @param req
     * @param res
     * @return JSON
     */
    listar : function (req,res){
        try{
            var extra_params = req.body;
            Contacto_model.listar(function(error,result){
                if(error){
                    console.log('***** error al obtener la lista de contacto');
                    res.status(400).json({status : false,
                        msg : ['No se pudo obtener el catalogo']
                    });
                }else{
                    console.log('***** se obtuvo la lista de contactos con exito');
                    res.status(200).json({status : true,
                        msg : '',
                        data : result
                    });
                }
            },extra_params);
        }catch (error){
            console.log(error);
            res.status(500).json({status : false,
                msg : ['No se pudo obtener el catalogo']
            });
        }
    },

    /**
     * funcion para obtener el data de contacto conforme el id_recibido
     * @param req
     * @param res
     * @return JSON
     */
    contacto_id : function(req,res){
        try{
            var id_contacto = req.params.id_contacto;
            console.log(id_contacto);
            Validacion.msg_validacion = [];
            //validamos el id de contacto que no llegue vacio
            if(Validacion.valida_campo(id_contacto,'identificador contacto')){
                Contacto_model.contacto(function(error,result){
                    if(error){
                        console.log('***** error al obtener los datos del contacto');
                        res.status(400).json({status : false,
                            msg : ['No se pudo obtener el contacto o no existe en nuestro sistema']
                        });
                    }else{
                        console.log('***** se obtuvo los datos del contacto');
                        res.status(200).json({
                            status : true,
                            msg : ['Se obtuvo los datos del contacto con exito'],
                            data : {
                                contacto : result[0] //ponemos la posicion cero por que devuelve un arreglo el modelo
                            }
                        });
                    }
                },id_contacto);
            }else{
                res.status(400).json({
                    status : false,
                    msg : Validacion.msg_validacion
                });
            }
        }catch (error){
            console.log(error);
            res.json({
                status : false,
                msg : [Constantes.ERROR_MSG]
            });
        }
    },

    /**
     * funcion para guardar un contacto nuevo
     * @param req
     * @param res
     * @return JSON
     */
    guardar : function(req,res){
        try{
            console.log('***** Contacto_controller -> guardar');
            Validacion.msg_validacion = [];
            if(Validacion.form_contacto(req.body)){
                //cargamos la entidad formateada que necesita el modelo
                var contacto = Convertidor.obtenerEntidadContacto(req.body);
                Contacto_model.guardar(function(error,result){
                    if(error){
                        console.log('***** error al tratar de guardar el contacto');
                        console.log(error);
                        res.status(400).json({
                            status : false,
                            msg : [Constantes.ERROR_BD]
                        });
                    }else{
                        console.log('***** Se guardo el contacto con exito');
                        res.status(201).json({
                            status : true,
                            msg : ['Se guardo el contacto con éxito']
                        });
                    }
                },contacto,req.params.id_contacto);
            }else{
                res.status(400).json({
                    status : false,
                    msg : Validacion.msg_validacion
                });
            }
        }catch (error){
            console.log(error);
            res.status(500).json({
                status : false,
                msg : [
                    Constantes.ERROR_MSG
                ]
            });
        }
    },

    actualizar : function(req,res){
        Rest_contacto_controller.guardar(req,res);
    },

    /**
     * funcion para eliminar un contacto por medio de su iddentificador id
     * @param req
     * @param res
     * @return JSON
     */
    eliminar : function(req,res){
        try{
            var id_contacto = req.params.id_contacto;
            Validacion.msg_validacion = [];
            //validamos el id de contacto que no llegue vacio
            if(Validacion.valida_campo(id_contacto,'identificador contacto')){
                Contacto_model.eliminar(function(error,result){
                    if(error){
                        console.log('***** error al eliminar contacto');
                        res.status(400).json({status : false,
                            msg : ['No se pudo eliminar contacto, intentar más tarde']
                        });
                    }else{
                        console.log('***** se elimino el contacto con exito');
                        res.status(202).json({status : true,
                            msg : ['Se elimino el contacto con éxito'],
                        });
                    }
                },id_contacto);
            }else{
                res.status(400).json({
                    status : false,
                    msg : Validacion.msg_validacion
                });
            }
        }catch (err){
            console.log(err);
            res.status(500).json({
                status : false,
                msg : [
                    Constantes.ERROR_MSG
                ]
            });
        }
    }

}

//exportamos el modulo para que pueda ser usado en las rutas
module.exports = Rest_contacto_controller;