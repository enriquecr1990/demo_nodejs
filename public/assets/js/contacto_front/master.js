$(document).ready(function(){

    $(document).on('click','#cerrar_sesion',function(){
        Master.cerrar_sesion();
    });

    $(document).on('click','#iniciar_sesion',function(){
        Master.iniciar_sesion();
    });

    Master.iniciar_local_storage();
    Master.validar_login_sistema();

});

var Master = {

    //validar un formulario
    validar : function (id_form,options){
        var validator = $(id_form).validate(options);
        validator.form();
        var result = validator.valid();
        return result;
    },

    //reglas de validacion y estilo de las validaciones
    reglas_validate : function () {
        //var rules = {};
        var rules = {
            errorElement: "span",
            errorPlacement: function ( error, element ) {
                // Add the `help-block` class to the error element
                error.addClass( "help-block invalid-feedback" );

                // Add `has-feedback` class to the parent div.form-group
                // in order to add icons to inputs
                element.parents( ".form-group" ).addClass( "has-feedback" );

                if ( element.prop( "type" ) === "checkbox" ) {
                    error.insertAfter( element.parent( "label" ) );
                } else {
                    error.insertAfter( element );
                }

                // Add the span element, if doesn't exists, and apply the icon classes to it.
            },
            success: function ( label, element ) {
                // Add the span element, if doesn't exists, and apply the icon classes to it.
            },
            highlight: function ( element, errorClass, validClass ) {
                $( element ).addClass( "is-invalid" ).removeClass( "is-valid" );
            },
            unhighlight: function ( element, errorClass, validClass ) {
                $( element ).addClass( "is-valid" ).removeClass( "is-invalid" );
            }
        }
        return rules;
    },

    //funcion para obtener el json como respuesta de una peticion de un controlador
    obtener_contenido_peticion_json : function (url,parametros,processor,metodo) {
        if (!metodo) {
            metodo = "POST";
        }
        $.ajax({
            type : metodo,
            data : parametros,
            dataType: "json",
            url : url,
            success : function (data) {
                processor(data,true);
            },
            error : function (xhr,ajaxOptions,thrownError) {
                //alert(xhr.status);
                //alert(thrownError);
                processor("No se pudo establecer con el servidor",false);
            },
            statusCode : {
                400 : function(response){
                    Vistas.procesar_mensaje(response.responseJSON.msg,'warning','#contenedor_mensajes');
                },401 : function(response){
                    Vistas.procesar_mensaje(response.responseJSON.msg,'warning','#contenedor_mensajes');
                },500 : function(response){
                    Vistas.procesar_mensaje(response.responseJSON.msg,'danger','#contenedor_mensajes');
                }
            }
        });
    },

    obtener_contenido_peticion_json_token : function (url,parametros,processor,metodo) {
        if (!metodo) {
            metodo = "POST";
        }
        $.ajax({
            type : metodo,
            data : parametros,
            dataType: "json",
            url : url,
            headers : {
                'access-token' : window.localStorage.getItem('sesion_token')
            },
            success : function (data) {
                processor(data,true);
            },
            error : function (xhr,ajaxOptions,thrownError) {
                //alert(xhr.status);
                //alert(thrownError);
                processor("No se pudo establecer con el servidor",false);
            },
            statusCode : {
                400 : function(response){
                    Vistas.procesar_mensaje(response.responseJSON.msg,'warning','#contenedor_mensajes');
                },
                401 : function(response){
                    Vistas.procesar_mensaje(response.responseJSON.msg,'warning','#contenedor_mensajes');
                },
                403 :function(response){
                    Vistas.procesar_mensaje(response.msg,'warning','#contenedor_mensajes');
                    window.localStorage.setItem('sesion_activa','no');
                    window.localStorage.setItem('sesion_token','');
                    Master.iniciar_sesion();
                },
                500 : function(response){
                    Vistas.procesar_mensaje(response.responseJSON.msg,'danger','#contenedor_mensajes');
                }
            }
        });
    },

    //funcion que nos devuel el post de un formulario para enviarlo al controller
    obtener_post_formulario : function (id_formulario) {
        return $('#'+id_formulario).serialize()+Master.serializar_json_formulario(undefined);
    },

    //funcion que nos permite serializar en json el post un formulario
    serializar_json_formulario : function (json) {
        var strSerialized = '';
        if(json != null){
            $.each(json,function (key,value) {
                strSerialized += strSerialized == "" ? '&'+key+'='+value : '&'+key+'='+value;
            });
        }
        return strSerialized;
    },

    //funcion para mostar modal de bootstrap
    mostrar_ocultar_modal : function(id_modal,mostrar = false){
        if(mostrar){
            $(id_modal).modal({backdrop: 'static', keyboard: false});
            $(id_modal).modal('show');
        }else{
            $(id_modal).modal('hide');
        }
    },

    iniciar_local_storage : function(){
        if(window.localStorage.getItem('sesion_activa') == null){
            window.localStorage.setItem('sesion_activa','no');
        }if(window.localStorage.getItem('sesion_token') == null){
            window.localStorage.setItem('sesion_token','');
        }
    },

    validar_login_sistema : function(){
        if(window.localStorage.getItem('sesion_activa') == 'no'){
            $('#iniciar_sesion').show();
            $('#cerrar_sesion').hide();
            Vistas.login_sistema();
        }else{
            $('#iniciar_sesion').hide();
            $('#cerrar_sesion').show();
            Contacto.buscar_contactos();
        }
    },

    cerrar_sesion : function (){
        window.localStorage.setItem('sesion_activa','no');
        window.localStorage.setItem('sesion_token','');
        Master.validar_login_sistema();
    },

    iniciar_sesion : function(){
        Master.validar_login_sistema();
    }

};