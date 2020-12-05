$(document).ready(function(){



});

var Vistas = {

    spinner_sitio : function(){
        /*var html_spinner = '<div class="d-flex justify-content-center">' +
                '<div class="spinner-grow text-info" role="status">' +
                '   <span class="sr-only"></span>' +
                '</div>' +
            '</div>';*/
        var html_spinner = '<div class="progress">' +
            '  <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>' +
            '</div>';
        return html_spinner;
    },

    procesar_mensaje : function(msg = [],type = 'info',contenedor_mensaje= '#contenedor_mensajes'){
        if(Array.isArray(msg) && msg.length != 0){
            var html_msg = '';
            $.each(msg,function(index,value){
                html_msg += '<li>'+value+'</li>';
            });
            var html_informacion = '<div class="row">' +
                '   <div class="form-group col-lg-12">' +
                '       <div class="alert alert-'+type+'">' +
                '           <strong>Mensajes del sistema</strong><br>' +
                '' + html_msg +
                '       </div>' +
                '   </div>' +
                '</div>';
            $(contenedor_mensaje).html(html_informacion);
            $(contenedor_mensaje).fadeIn(500);
            setTimeout(function(){
                $(contenedor_mensaje).fadeOut(500);
                $(contenedor_mensaje).html('');
            },8000);
        }
    },
}