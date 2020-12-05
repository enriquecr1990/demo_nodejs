$(document).ready(function () {

});

var Catalogo = {

    tipo_telefono : function(response){
        Master.obtener_contenido_peticion_json(
            Backend.url + 'catalogo/tipo_telefono/listar',{},response,'get'
        );
    }

};