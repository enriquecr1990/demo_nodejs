$(document).ready(function(){

    $(document).on('click','#btn_comentario_nuevo',function(){
        Foro.agregar_comentario_nuevo();
    });

    $(document).on('click','#btn_cancelar_comentario',function(){
        Foro.cancelar_comentario();
    });

    $(document).on('click','#btn_guardar_comentario',function (){
        if(Foro.validar_formulario()){
            Foro.guardar_comentario();
        }
    });

    $(document).on('click','.btn_iniciar_modificar_comentario',function(){
        Foro.iniciar_modificar_comentario($(this));
    });

    $(document).on('click','#btn_actualizar_comentario',function (){
        if(Foro.validar_formulario()){
            Foro.actualizar_comentario();
        }
    });

    $(document).on('click','#btb_eliminar_comentario',function(){
        var confirmacion = confirm('¿Estas seguro de eliminar el comentario?');
        var id_comentario = $(this).data('id_comentario');
        if(confirmacion){
            Foro.eliminar_comentario(id_comentario);
        }
    });

    Foro.buscar_comentarios_foro();

});

var Foro = {

    id_comentario_modificar : '',

    agregar_comentario_nuevo : function(){
        $('#div_nuevo_comentario').fadeOut();
        $('#div_form_comentario').fadeIn();
        $('#seccion_mensajes_foro').fadeOut();
        $('#btn_actualizar_comentario').fadeOut();
        $('#btn_guardar_comentario').fadeIn();
        Foro.reiniciar_form_comentario();
    },

    validar_formulario : function(){
        $('.error').remove();
        var validacion = Master.validar('#form_comentario_foro',Master.reglas_validate());
        return validacion;
    },

    cancelar_comentario : function(){
        $('#div_nuevo_comentario').fadeIn();
        $('#div_form_comentario').fadeOut();
        $('#seccion_mensajes_foro').fadeIn();
        Foro.reiniciar_form_comentario();
    },

    reiniciar_form_comentario : function(){
        $('#btn_reiniciar_form').trigger('click');
        $('#remitente').prop('readonly',false);
        $('#asunto').prop('readonly',false);
    },

    buscar_comentarios_foro : function(){
        $('#seccion_mensajes_foro').html(Vistas.spinner_sitio());
        Master.obtener_contenido_peticion_html(
            Backend.url + 'foro/mensajes',
            {},
            function(response_html){
                $('#seccion_mensajes_foro').html(response_html);
            },
            'get'
        );
    },

    guardar_comentario : function(){
        Master.obtener_contenido_peticion_json(
            Backend.url + 'foro/guardar',
            Master.obtener_post_formulario('form_comentario_foro'),
            function(response_json){
                if(response_json.status){
                    $('#div_nuevo_comentario').fadeIn();
                    $('#div_form_comentario').fadeOut();
                    $('#seccion_mensajes_foro').fadeIn();
                    Foro.reiniciar_form_comentario();
                    Vistas.procesar_mensaje(response_json.msg,'success');
                    Foro.buscar_comentarios_foro();
                }else{
                    Vistas.procesar_mensaje(response_json.msg,'warning');
                }
            },'post'
        );
    },

    iniciar_modificar_comentario :function(btn_modificar){
        Foro.agregar_comentario_nuevo();
        this.id_comentario_modificar = btn_modificar.data('id_comentario');
        var nombre = btn_modificar.data('nombre');
        var asunto = btn_modificar.data('asunto');
        var mensaje = btn_modificar.data('mensaje');
        $('#remitente').val(nombre).prop('readonly',true);
        $('#asunto').val(asunto).prop('readonly',true);
        $('#mensaje').val(mensaje);
        $('#btn_actualizar_comentario').fadeIn();
        $('#btn_guardar_comentario').fadeOut();
    },

    actualizar_comentario : function(){
        Master.obtener_contenido_peticion_json(
            Backend.url + 'foro/actualizar/' + this.id_comentario_modificar,
            Master.obtener_post_formulario('form_comentario_foro'),
            function(response_json){
                if(response_json.status){
                    $('#div_nuevo_comentario').fadeIn();
                    $('#div_form_comentario').fadeOut();
                    $('#seccion_mensajes_foro').fadeIn();
                    Foro.reiniciar_form_comentario();
                    Vistas.procesar_mensaje(response_json.msg,'success');
                    Foro.buscar_comentarios_foro();
                }else{
                    Vistas.procesar_mensaje(response_json.msg,'warning');
                }
            },
            'post'
        )
    },

    eliminar_comentario : function (id_comentario){
        Master.obtener_contenido_peticion_json(
            Backend.url + 'foro/eliminar/' + id_comentario,{},
            function(response_json){
                if(response_json.status){
                    Vistas.procesar_mensaje(response_json.msg,'success');
                    Foro.buscar_comentarios_foro();
                }else{
                    Vistas.procesar_mensaje(response_json.msg,'warning');
                }
            },'post'
        );
    }

}