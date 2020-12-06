$(document).ready(function(){

    $(document).on('click','#btn_buscar_contacto',function(){
        Contacto.buscar_contacto();
    });

    $(document).on('click','#btn_guardar_contacto',function(){
        if(Contacto.validar_formulario()){
            Contacto.guardar();
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

    iniciar_busqueda_contacto : function(){
        $('#btn_buscar_contacto').trigger('click');
    },

    validar_formulario : function(){
        $('.error').remove();
        var validacion = Master.validar('#form_contacto',Master.reglas_validate());
        return validacion;
    },

    buscar_contacto : function(){
        $('#contenedor_tablero_resultados').html(Vistas.spinner_sitio());
        Master.obtener_contenido_peticion_html(
            Backend.url + 'contacto/tablero',
            Master.obtener_post_formulario('form_busqueda_contacto'),function(respuesta){
                $('#contenedor_tablero_resultados').html(respuesta);
                Vistas.procesar_fecha_cumpleanios();
            },
            'post'
        );
    },

    formulario_contacto_nuevo : function(){
        $('#id_contacto').val('');
        Vistas.procesar_tooltips();
        Contacto.procesar_modal_contacto();
    },

    formulario_contacto_modificar : function(id_contacto){
        Contacto.procesar_modal_contacto();
        Contacto.obtener_data_contacto(id_contacto);
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

    guardar : function(){
        Master.enviar_formulario_post(
            '#form_contacto',
            Backend.url + 'contacto/guardar',
            function(response){
                if(response.status){
                    Master.mostrar_ocultar_modal('#mdl_form_contacto',false);
                    Vistas.procesar_mensaje(response.msg,'success');
                    Contacto.buscar_contacto();
                }else{
                    Vistas.procesar_mensaje(response.msg,'warning','#contenedor_mensajes_modal');
                }
            }
        );
    },

    eliminar : function(id_contacto){
        Master.obtener_contenido_peticion_json(
            Backend.url + 'contacto/eliminar/'+id_contacto,
            {},
            function(response){
                if(response.status){
                    Vistas.procesar_mensaje(response.msg,'success');
                    Contacto.buscar_contacto();
                }else{
                    Vistas.procesar_mensaje(response.msg,'warning');
                }
            },
            'post'
        );
    }

}