//cargamos la libreria de swig para procesar vistas de html y pasar variables hacia la vista
var swig = require('swig');
//cargamos las constantes que vamos a utilizar en el controlador
var Constantes = require('../config/constantes');
//cargamos el modelo de contacto para procesar la informacion
var Contacto_model = require('../model/contacto_model');
//cargamos el helper de validacion de datos
var Validacion = require('../helper/validaciones');

var Contacto_controller = {

    /**
     * Funcion que nos va a mostrar el formulario de busqueda de contacto
     * @param req
     * @param res
     * return HTML
     */
    busqueda : function(req,res){
        try{
            var html_head = swig.renderFile(Constantes.RUTA_VISTAS+'default/header.html');
            var menu = swig.renderFile(Constantes.RUTA_VISTAS+'default/menu_sql.html');
            var form_busqueda = swig.renderFile(Constantes.RUTA_VISTAS+'contacto/busqueda.html');
            var html_footer = swig.renderFile(Constantes.RUTA_VISTAS+'default/footer.html',{
                entregable : 'contacto'
            });
            res.send(html_head + menu + form_busqueda + html_footer);
        }catch (e){
            var mensajes = swig.renderFile(Constantes.RUTA_VISTAS + 'default/mensajes.html',{
                tipo_mensaje : 'danger',
                mensajes : [Constantes.ERROR_MSG]
            });
            res.send(mensajes);
        }
    },

    /**
     * funcion del controllador para obtenerl el tablero de contactos
     * @param req
     * @param res
     * @return HTML
     */
    tablero : function (req,res){
        try{
            var extra_params = req.body;
            Contacto_model.listar(function(error,result){
                if(error){
                    console.log('***** error al obtener la lista de contacto');
                    var mensajes = swig.renderFile(Constantes.RUTA_VISTAS + 'default/mensajes.html',{
                        tipo_mensaje : 'danger',
                        mensajes : [Constantes.ERROR_BD]
                    });
                    res.send(mensajes);
                }else{
                    console.log('***** se obtuvo la lista de contactos con exito');
                    var tablero = swig.renderFile(Constantes.RUTA_VISTAS+'contacto/tablero.html', {
                        contactos : result
                    });
                    res.send(tablero);
                }
            },extra_params);
        }catch (error){
            console.log(error);
            var mensajes = swig.renderFile(Constantes.RUTA_VISTAS + 'default/mensajes.html',{
                tipo_mensaje : 'danger',
                mensajes : [Constantes.ERROR_MSG]
            });
            res.send(mensajes);
        }
    },

    /**
     * funcion para cargar el formulario de contacto, nos sirve para agregar nuevo y actualizar
     * @param req
     * @param res
     * @return html
     */
    modificar_agregar : function(req,res){
        var formulario = swig.renderFile(Constantes.RUTA_VISTAS+'contacto/formulario.html');
        res.send(formulario);
    },

    /**
     * funcion para obtener el data de contacto conforme el id_recibido
     * @param req
     * @param res
     * @return JSON
     */
    data_contacto : function(req,res){
        try{
            var id_contacto = req.params.id_contacto;
            Contacto_model.contacto(function(error,result){
                if(error){
                    console.log('***** error al obtener los datos del contacto');
                    res.json({
                        status : false,
                        msg : [Constantes.ERROR_BD]
                    });
                }else{
                    console.log('***** se obtuvo los datos del contacto');
                    res.json({
                        status : true,
                        msg : ['Se obtuvo los datos del contacto con exito'],
                        data : {
                            contacto : result[0] //ponemos la posicion cero por que devuelve un arreglo el modelo
                        }
                    });
                }
            },id_contacto);
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
                //creamos contacto para transformalo y enviarlo al modelo para su persistencia
                var contacto = {
                    id : req.body.id_contacto,
                    nombre : req.body.nombre,
                    paterno : req.body.paterno,
                    materno : req.body.materno,
                    id_genero : req.body.id_genero,
                    nacimiento : req.body.nacimiento,
                    id_catalogo_tipo_telefono : req.body.id_tipo_telefono,
                    numero_telefono : req.body.numero,
                    correo : req.body.email,
                    facebook : req.body.facebook,
                };
                Contacto_model.guardar(function(error,result){
                    if(error){
                        console.log('***** error al obtener los datos del contacto');
                        res.json({
                            status : false,
                            msg : [Constantes.ERROR_BD]
                        });
                    }else{
                        console.log('***** Se guardo el contacto con exito');
                        res.json({
                            status : true,
                            msg : ['Se guardo el contacto con éxito']
                        });
                    }
                },contacto);
            }else{
                res.json({
                    status : false,
                    msg : Validacion.msg_validacion
                });
            }
        }catch (error){
            console.log(error);
            res.json({
                status : false,
                msg : [
                    Constantes.ERROR_MSG
                ]
            });
        }
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
            Contacto_model.eliminar(function(error,result){
                if(error){
                    console.log('***** error al eliminar contacto');
                    res.json({status : false,
                        msg : ['No se pudo guardar contacto, intentar más tarde']
                    });
                }else{
                    console.log('***** se elimino el contacto con exito');
                    res.json({status : true,
                        msg : ['Se elimino el contacto con éxito'],
                    });
                }
            },id_contacto);
        }catch (err){
            console.log(err);
            res.json({
                status : false,
                msg : [
                    Constantes.ERROR_MSG
                ]
            });
        }
    }

}

//exportamos el modulo para que pueda ser usado en las rutas
module.exports = Contacto_controller;