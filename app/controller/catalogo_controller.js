//cargamos el modelo de catalogo_model para procesar el catalogo que usaremos en la app
var Catalogo_model = require('../model/catalogo_model');

//Creamos la variable tipo/estilo clase catalogo controller
var Catalogo_controller = {

    //funcion del controlador tipo telefono que devuelve el json de los resultados
    tipo_telefono : function(req,res){
        Catalogo_model.tipo_telefono(function(error,result){
            if(error){
                console.log('***** error al obtener el catalogo');
                res.json({status : false,
                    msg : ['No se pudo obtener el catalogo']
                });
            }else{
                console.log('***** se obtuvo el catalog con exito');
                res.json({status : true,
                    msg : '',
                    data : result
                });
            }
        });
    }

}

module.exports = Catalogo_controller;