//cargamos las dependecias para integrar el autenticación
//como el JSON web token y el hash para el encryp de la contraseña
var jwt = require('jsonwebtoken');
var hash = require('password-hash');
var Constantes = require('../config/constantes');

var Login = {

    obtener_token : function(){
        const payload = { check : true};
        const token = jwt.sign(payload, Constantes.PRIVATE_KEY,{
            expiresIn: 1440
        });
        return token;
    },

    validar_token : function(token){
        var response = {
            valid : false,
            msg : 'Token invalido, inicie sesión nuevamente y obtener uno valido'
        };
        if(token){
            jwt.verify(token,Constantes.PRIVATE_KEY,function(err){
                if(err){
                    return {valid : false, msg : 'Token invalido'};
                }else{
                    return {valid : false, msg : 'Token valido puede continuar'};
                }
            });
        }
        return response;
    },

    validar_contrasenia : function(pass_bd,pass_login){
        var response = {
            status : false,
            msg : 'Contraseña incorrecta'
        };
        if(hash.verify(pass_login,pass_bd)){
            response.status = true;
            response.msg = 'Login correcto, Bienvenido al sistema';
        }
        return response;
    }

}

module.exports = Login;