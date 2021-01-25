let express = require('express');
var jwt = require('jsonwebtoken');
var Constantes = require('../config/constantes');

const routes_jwt = express.Router();

routes_jwt.use(function(req,res,next){
    const token = req.headers['access-token'];
    if(token){
        jwt.verify(token,Constantes.PRIVATE_KEY,function (err,decoded){
            if(err){
                res.status(403).json({
                    status : false,
                    msg : 'Token Invalido o expirado'
                });
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }else{
        res.status(403).send({
            status : false,
            msg : 'Token invalido, vuelve al login para obtener uno'
        });
    }
});

module.exports = routes_jwt;