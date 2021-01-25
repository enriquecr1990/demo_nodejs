var swig = require('swig');
//cargamos las constantes que vamos a utilizar en el controlador
var Constantes = require('../config/constantes');

//Creamos la variable tipo/estilo clase front controller
var Front_controller = {

    //funcion index que unicamente cargara la vista del front, todo lo del consumo de servicios se solventara con JS
    index : function(req,res){
        try{
            var html_head = swig.renderFile(Constantes.RUTA_VISTAS+'default/header.html');
            var menu = swig.renderFile(Constantes.RUTA_VISTAS+'default/menu_front.html');
            var principal = swig.renderFile(Constantes.RUTA_VISTAS + 'contacto_front/principal.html');
            var html_footer = swig.renderFile(Constantes.RUTA_VISTAS+'default/footer.html',{
                entregable : 'contacto_front' // para cargar los JS necesarios del front
            });
            res.send(html_head + menu + principal + html_footer);
        }catch (e){
            var mensajes = swig.renderFile(Constantes.RUTA_VISTAS + 'default/mensajes.html',{
                tipo_mensaje : 'danger',
                mensajes : [Constantes.ERROR_MSG]
            });
            res.send(mensajes);
        }
    }

}

module.exports = Front_controller;