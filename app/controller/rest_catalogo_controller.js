//cargamos el modelo de catalogo_model para procesar el catalogo que usaremos en la app
//reutilizamos el modelo que ya habiamos construido en el sistema web I
var Catalogo_model = require('../model/catalogo_model');

//Creamos la variable tipo/estilo clase catalogo controller
var Rest_catalogo_controller = {

    //funcion del controlador tipo telefono que devuelve el json de los resultados
    tipo_telefono : function(req,res){
        Catalogo_model.tipo_telefono(function(error,result){
            if(error){
                console.log('***** error al obtener el catalogo');
                res.status(500).json({status : false,
                    msg : ['No se pudo obtener el catalogo']
                });
            }else{
                console.log('***** se obtuvo el catalog con exito');
                res.status(200).json({status : true,
                    msg : '',
                    data : result
                });
            }
        });
    }

}

module.exports = Rest_catalogo_controller;