$(document).ready(function(){

    $(document).on('click','#boton_iniciar_sesion',function(){
        Contacto.inicar_sesion_rest();
    });

    $(document).on('click','#boton_registrate',function(){
        Contacto.registrarte_como_usuario();
    });

    $(document).on('click','#btn_buscar_contacto',function(){
        Contacto.buscar_contacto();
    });

    $(document).on('click','#btn_guardar_contacto',function(){
        if(Contacto.validar_formulario()){
            if($('#id_contacto').val() == 0){
                Contacto.guardar_nuevo();
            }else{

                Contacto.actualizar_contacto($('#id_contacto').val());
            }
        }
    });

    $(document).on('click','#agregar_contacto',function(){
        Contacto.formulario_contacto_nuevo();
    });

    $(document).on('click','.modificar_contacto',function(){
        var id_contacto = $(this).data('id_contacto');
        Contacto.formulario_contacto_modificar(id_contacto);
    });

    $(document).on('click','.eliminar_contacto',function () {
        var id_contacto = $(this).data('id_contacto');
        var confirmacion = confirm('¿Está seguro de eliminar el contacto?');
        if(confirmacion){
            Contacto.eliminar(id_contacto);
        }
    });

    $(document).on('change','.input_buscar',function(){
        Contacto.iniciar_busqueda_contacto();
    });

    Contacto.iniciar_busqueda_contacto();

});

var Contacto = {

    inicar_sesion_rest : function(){
        if(Contacto.validar_form_login()){
            Master.obtener_contenido_peticion_json(
                Backend.url + 'api/rest/usuario',Master.obtener_post_formulario('formulario_login'),
                function(response_json){
                    if(response_json.status){
                        window.localStorage.setItem('sesion_activa','si');
                        window.localStorage.setItem('sesion_token',response_json.data.token);
                        Vistas.procesar_mensaje(response_json.msg,'success');
                        Master.validar_login_sistema();
                    }else{
                        Vistas.procesar_mensaje(response_json.msg,'warning','#mensajes_login');
                    }
                },'get'
            );
        }
    },

    registrarte_como_usuario : function(){
        if(Contacto.validar_form_login()){
            Master.obtener_contenido_peticion_json(
                Backend.url + 'api/rest/usuario',
                Master.obtener_post_formulario('formulario_login'),
                function (response_json){
                    if(response_json.status){
                        Vistas.procesar_mensaje(response_json.msg);
                        $('#formulario_login').find('input').attr('readonly',true);
                        setTimeout(function(){Contacto.inicar_sesion_rest();},2000);
                    }else{
                        Vistas.procesar_mensaje(response_json.msg,'warning');
                    }
                },'post'
            );
        }
    },

    validar_form_login : function(){
        $('.error').remove();
        var validacion = Master.validar('#formulario_login',Master.reglas_validate());
        return validacion;
    },

    iniciar_busqueda_contacto : function(){
        $('#btn_buscar_contacto').trigger('click');
    },

    validar_formulario : function(){
        $('.error').remove();
        var validacion = Master.validar('#form_contacto',Master.reglas_validate());
        return validacion;
    },

    buscar_contactos : function(){
        var html_tablero_principal = Vistas.html_tablero_principal();
        $('#contenedor_principal').html(html_tablero_principal);
        Master.obtener_contenido_peticion_json_token(
            Backend.url + 'api/rest/contacto',{},
            function(response){
                if(response.status){
                    var html_registros = Vistas.html_tablero_resultados(response.data);
                    $('#tbody_resultado_contactos').html(html_registros);
                    Vistas.procesar_fecha_cumpleanios();
                }else{
                    Vistas.procesar_mensaje(response.msg);
                }
            },'get'
        );
    },

    formulario_contacto_nuevo : function(){
        var html_formulario = Vistas.html_modal_formulario();
        $('#contenedor_modal').html(html_formulario);
        Vistas.select_tipo_telefono();
        Master.mostrar_ocultar_modal('#mdl_form_contacto',true);
    },

    formulario_contacto_modificar : function(id_contacto){
        Contacto.formulario_contacto_nuevo();
        Master.obtener_contenido_peticion_json_token(
            Backend.url + 'api/rest/contacto/'+id_contacto,{},
            function(response){
                if(response.status){
                    Vistas.set_formalario_contacto(response.data.contacto);
                }
            },'get'
        );
    },

    obtener_data_contacto : function(id_contacto){
        Master.obtener_contenido_peticion_json(
            Backend.url + 'contacto/data_contacto/' + id_contacto,{},
            function(response_json){
                if(response_json.status){
                    Vistas.set_formalario_contacto(response_json.data.contacto);
                    Contacto.procesar_modal_contacto();
                }else{
                    Vistas.procesar_mensaje(response.msg)
                }
            },
            'post'
        );
    },

    procesar_modal_contacto : function(){
        $('.is-invalid').removeClass('is-invalid');
        $('.is-valid').removeClass('is-valid');
        $('.error').remove();
        Master.mostrar_ocultar_modal('#mdl_form_contacto',true);
    },

    guardar_nuevo : function(){
        Master.obtener_contenido_peticion_json_token(
            Backend.url + 'api/rest/contacto',
            Master.obtener_post_formulario('form_contacto'),
            function(response){
                if(response.status){
                    Master.mostrar_ocultar_modal('#mdl_form_contacto',false);
                    Vistas.procesar_mensaje(response.msg);
                    Contacto.buscar_contactos();
                }else{
                    Vistas.procesar_mensaje(response.msg,'warning','#contenedor_mensajes_modal');
                }
            },'post'
        );
    },

    actualizar_contacto : function(id_contacto){
        Master.obtener_contenido_peticion_json_token(
            Backend.url + 'api/rest/contacto/'+id_contacto,
            Master.obtener_post_formulario('form_contacto'),
            function(response){
                if(response.status){
                    Master.mostrar_ocultar_modal('#mdl_form_contacto',false);
                    Vistas.procesar_mensaje(response.msg);
                    Contacto.buscar_contactos();
                }else{
                    Vistas.procesar_mensaje(response.msg,'warning','#contenedor_mensajes_modal');
                }
            },'put'
        );
    },

    eliminar : function(id_contacto){
        Master.obtener_contenido_peticion_json_token(
            Backend.url + 'api/rest/contacto/'+id_contacto,
            {},
            function(response){
                if(response.status){
                    Vistas.procesar_mensaje(response.msg,'success');
                    Contacto.buscar_contactos();
                }else{
                    Vistas.procesar_mensaje(response.msg,'warning');
                }
            },
            'delete'
        );
    }

}