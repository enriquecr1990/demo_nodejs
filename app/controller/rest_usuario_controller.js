var Constantes = require('../config/constantes');
var Usuario_model = require('../model/usuario_model');
var Validacion = require('../helper/validaciones');
var HelperLogin = require('../helper/login');
var Convertidor = require('../helper/convertidor');
var Usuario = require('../helper/convertidor');

var Rest_usuario_controller = {

    login : function(req,res){
        try{
            Validacion.msg_validacion = [];
            console.log(req.query);
            if(Validacion.form_login(req.query)){
                Usuario_model.usuario_login(function(error, result){
                    if(error){
                        console.log('***** error al obtener usuario para el login');
                        res.status(400).json({status : false,
                            msg : ['No se pudo obtener el usuario para el login']
                        });
                    }else{
                        console.log('***** se obtuvo el usuario para login');
                        console.log(result.length);
                        if(result.length > 0){
                            var usuario = result[0]; //obtenerlo el objeto del usuario y poder validar la constraseña que ingreso
                            console.log(usuario);
                            var valPass =HelperLogin.validar_contrasenia(usuario.password,req.query.pass);
                            if(valPass.status){
                                res.status(200).json({
                                    status : true,
                                    msg : [valPass.msg],
                                    data : {
                                        token : HelperLogin.obtener_token()
                                    }
                                });
                            }else{
                                res.status(401).json({
                                    status : false,
                                    msg : [valPass.msg]
                                });
                            }
                        }else{
                            res.status(400).json({
                                status : false,
                                msg : ['Usuario no encontrado en el sistema, favor de validar']
                            });
                        }
                    }
                },req.query.usr);
            }else{
                res.status(400).json({
                    status : false,
                    msg : Validacion.msg_validacion
                });
            }
        }catch (error){
            console.log(error);
            res.status(500).json({status : false,
                msg : ['No se pudo obtener el catalogo']
            });
        }
    },

    nuevo : function(req,res){
        try{
            console.log('***** Usuario Controller -> nuevo');
            Validacion.msg_validacion = [];
            if(Validacion.form_login(req.body)){
                //cargamos la entidad formateada que necesita el modelo
                var usuario = Convertidor.obtenerEntidadUsuario(req.body);
                Usuario_model.usuario_login(function(error,result){
                    if(error){
                        res.status(400).json({
                            status : false,
                            msg : [Constantes.ERROR_BD]
                        });
                    }else{
                        console.log('***** se obtuvo el usuario para login');
                        console.log(result.length);
                        if(result.length > 0){
                            res.status(400).json({
                                status : false,
                                msg : ['El usuario que intenta registrar ya existe, intente con otro']
                            });
                        }else{
                            Usuario_model.usuario_nuevo(function(error,result){
                                if(error){
                                    console.log('***** error al tratar de guardar el usuario');
                                    console.log(error);
                                    res.status(400).json({
                                        status : false,
                                        msg : [Constantes.ERROR_BD]
                                    });
                                }else{
                                    console.log('***** Se guardo el usuario con exito');
                                    res.status(201).json({
                                        status : true,
                                        msg : ['Se guardó el usuario con éxito, iniciara sesión automaticamente']
                                    });
                                }
                            },usuario);
                        }
                    }
                },usuario.usr);
            }else{
                res.status(400).json({
                    status : false,
                    msg : [Validacion.msg_validacion]
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
    }

};

module.exports = Rest_usuario_controller;