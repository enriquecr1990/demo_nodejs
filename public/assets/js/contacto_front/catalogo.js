$(document).ready(function () {

});

var Catalogo = {

    tipo_telefono : function(response){
        Master.obtener_contenido_peticion_json(
            Backend.url + 'api/rest/catalogo/tipo_telefono',{},response,'get'
        );
    }

};