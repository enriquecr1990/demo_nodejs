$(document).ready(function(){

    $(document).on('change','#busqueda_avanzada',function(){
       if($(this).is(':checked')){
           $('.busqueda_avanzada').fadeIn();
       }else{
           $('.busqueda_avanzada').fadeOut();
       }
    });

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

    select_tipo_telefono : function(){
        Catalogo.tipo_telefono(function(response){
            if(response.status){
                var html_slt = Vistas.obtener_html_cat_tipo_telefono(response.data);
                $('#buscar_sltTipoTelefono').html(html_slt);
                $('#id_tipo_telefono').html(html_slt);
            }else{
                Vistas.procesar_mensaje(response.msg,'danger');
            }
        });
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

    obtener_html_cat_tipo_telefono : function(cat_tipo_telefono){
        var html_cat = '';
        $.each(cat_tipo_telefono,function(index, ctt){
            html_cat += '<option value="'+ctt.id_catalogo_tipo_telefono+'">'+ctt.tipo_telefono+'</option>';
        });
        return html_cat;
    },

    set_formalario_contacto : function(contacto){
        $('#id_contacto').val(contacto.id);
        $('#nombre').val(contacto.nombre);
        $('#paterno').val(contacto.paterno);
        $('#materno').val(contacto.materno);
        $('#id_tipo_telefono').val(contacto.id_catalogo_tipo_telefono);
        $('#numero').val(contacto.numero_telefono);
        $('#nacimiento').val(this.convertir_fecha_html(contacto.nacimiento));
        $('#correo').val(contacto.correo);
        $('#facebook').val(contacto.facebook);
        contacto.id_genero == 1 ? $('#radio_masculino').attr('checked',true) : $('#radio_femenino').attr('checked',true);
    },

    procesar_fecha_cumpleanios : function(){
        var inputs_fechas = $('.input_nacimiento');
        inputs_fechas.each(function(index,input){
            var fecha_formato = Vistas.getFechaCumpleanios(input.value);
            var td = input.closest('td');
            $(td).find('span.fecha_cumpleanios').html(fecha_formato);
        });
    },

    getFechaCumpleanios : function(strFecha){
        var hostname = location.hostname;
        switch (hostname) {
            case 'enriquecr-nodejs.azurewebsites.net':
                //se dividen en array los elementos de la fecha que se recibe en formato yyyy-mm-dd por el separador - (guion medio)
                //en el servidor de azure el formato devuelto por la app de node es mm-dd-yyyy
                var aFecha = strFecha.split('/')
                var anio = aFecha[2];
                var mes = aFecha[0];
                var dia = parseInt(aFecha[1]) + 1;
                var fecha = new Date(anio + '-' + mes + '-' + dia);
                break;
            default:
                //se dividen en array los elementos de la fecha que se recibe en formato yyyy-mm-dd por el separador - (guion medio)
                var aFecha = strFecha.split('/')
                var anio = aFecha[2];
                var mes = aFecha[1];
                var dia = parseInt(aFecha[0]) + 1;
                var fecha = new Date(anio + '-' + mes + '-' + dia);
                break;
        }
        
        //se crea la fecha restando un numero al mes dado que el date de JS los meses son del 0 al 11
        return fecha.getDate() + ' de ' + this.getMes(fecha.getMonth());
    },

    getMes : function(month){
        var mes = '';
        switch (month) {
            case 0: mes ='enero';break;
            case 1: mes ='febrero';break;
            case 2: mes ='marzo';break;
            case 3: mes ='abril';break;
            case 4: mes ='mayo';break;
            case 5: mes ='junio';break;
            case 6: mes ='julio';break;
            case 7: mes ='agosto';break;
            case 8: mes ='septiembre';break;
            case 9: mes ='octubre';break;
            case 10: mes ='noviembre';break;
            case 11: mes ='diciembre';break;
        }
        return mes;
    },

    convertir_fecha_html : function(fecha){
        var d = new Date(fecha);
        var anio = d.getFullYear();
        var mes = d.getMonth() + 1;
        mes = mes < 10 ? '0'+mes : mes;
        var dia = d.getDate();
        dia = dia < 10 ? '0'+dia : dia;
        return anio+'-'+mes+'-'+dia;
    },

    procesar_tooltips : function(){
        $('[data-toggle="tooltip"]').tooltip();
    },

    login_sistema : function (){
        var html_login = '' +
            '<div class="row">' +
                '<div class="form-group col-lg-4"></div>' +
                '<div class="form-group col-lg-4">' +
                    '<form id="formulario_login">\n' +
                        '<div class="row">\n' +
                            '<div class="form-group col-lg-12">\n' +
                                '<label for="usuario">Usuario: </label>\n' +
                                '<input class="form-control" type="text" placeholder="Nombre de usuario" id="usuario" name="usr" required>\n' +
                            '</div>\n' +
                        '</div>\n' +
                        '<div class="row">\n' +
                            '<div class="form-group col-lg-12">\n' +
                                '<label for="usuario">Contraseña: </label>\n' +
                                '<input class="form-control" type="password" placeholder="Contraseña" id="password" name="pass" required>\n' +
                            '</div>\n' +
                        '</div>\n' +
                        '<div class="row">' +
                            '<div class="form-group text-left">' +
                                '<button id="boton_iniciar_sesion" type="button" class="btn btn-primary">Iniciar sesión</button>\n' +
                            '</div>' +
                            '<div class="form-group text-right">' +
                                '¿No tienes cuenta? <button type="button" class="btn btn-outline-success" id="boton_registrate">Registrate</button>' +
                            '</div>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
                '<div class="form-group col-lg-4"></div>' +
            '</div>';
        $('#contenedor_principal').html(html_login);
    },

    html_tablero_principal : function(){
        var html = '<div class="card">\n' +
            '    <div class="card-body">\n' +
            '        <h5 class="card-title">Resultados</h5>\n' +
            '        <div class="row">\n' +
            '            <div class="form-group col-lg-12 text-right">\n' +
            '                <button type="button" class="btn btn-outline-primary btn-sm" id="agregar_contacto">\n' +
            '                    Nuevo\n' +
            '                </button>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '        <table class="table table-striped table-sm">\n' +
            '            <thead class="thead-light">\n' +
            '                <tr>\n' +
            '                    <th>#</th>\n' +
            '                    <th>Nombre completo</th>\n' +
            '                    <th>Genero</th>\n' +
            '                    <th>Cumpleaños</th>\n' +
            '                    <th>Número(s)</th>\n' +
            '                    <th>Contacto</th>\n' +
            '                    <th></th>\n' +
            '                </tr>\n' +
            '            </thead>\n' +
            '            <tbody id="tbody_resultado_contactos">\n' +
            '            </tbody>\n' +
            '        </table>\n' +
            '    </div>\n' +
            '</div>\n';
        return html;
    },

    html_tablero_resultados : function (data_result){
        var html_registros = '';
        $.each(data_result,function(index,contacto){
            html_registros += '<tr>\n' +
                '                        <td>'+contacto.id+'</td>\n' +
                '                        <td>'+contacto.nombre + ' ' + contacto.paterno + ' ' + contacto.materno + '</td>\n' +
                '                        <td>'+contacto.genero + '</td>\n' +
                '                        <td>\n' +
                '                            <input type="hidden" class="input_nacimiento" value="' +new Date(contacto.nacimiento).toLocaleDateString()+ '">\n' +
                '                            <span class="fecha_cumpleanios"></span>\n' +
                '                        </td>\n' +
                '                        <td><strong>'+contacto.tipo_telefono+':</strong> '+contacto.numero_telefono+'</td>\n' +
                '                        <td>\n' +
                '                            <strong>Correo:</strong> '+contacto.correo+'<br>\n' +
                '                            <strong>Facebook:</strong>'+contacto.facebook+'\n' +
                '                        </td>\n' +
                '                        <td>\n' +
                '                            <button type="button" class="btn btn-outline-warning btn-sm modificar_contacto" data-id_contacto="'+contacto.id+'">Modificar</button><br>\n' +
                '                            <button type="button" class="btn btn-outline-danger btn-sm eliminar_contacto" data-id_contacto="'+contacto.id+'">Eliminar</button>\n' +
                '                        </td>\n' +
                '                    </tr>';
        });
        return html_registros;
    },

    html_modal_formulario : function(){
        var html_formulario = '<!-- Modal -->\n' +
            '<div class="modal fade" id="mdl_form_contacto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">\n' +
            '    <div class="modal-dialog">\n' +
            '        <div class="modal-content">\n' +
            '            <div class="modal-header">\n' +
            '                <h5 class="modal-title" id="exampleModalLabel"><span id="op_form_contacto"></span> Contacto</h5>\n' +
            '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
            '                    <span aria-hidden="true">&times;</span>\n' +
            '                </button>\n' +
            '            </div>\n' +
            '            <form id="form_contacto">\n' +
            '                <input type="hidden" name="id_contacto" id="id_contacto" value="0">\n' +
            '                <div class="modal-body">\n' +
            '                    <div id="contenedor_mensajes_modal" style="display: none"></div>\n' +
            '                    <div class="row">\n' +
            '                        <div class="form-group col-lg-6">\n' +
            '                            <label class="col-form-label" for="nombre">Nombre: <span class="requerido">*</span></label>\n' +
            '                            <input id="nombre" class="form-control" type="text" name="nombre" placeholder="Nombre" required>\n' +
            '                        </div>\n' +
            '                        <div class="form-group col-lg-6">\n' +
            '                            <label class="col-form-label" for="paterno">Paterno: <span class="requerido">*</span></label>\n' +
            '                            <input id="paterno" class="form-control" type="text" name="paterno" placeholder="Apellido paterno" required>\n' +
            '                        </div>\n' +
            '                        <div class="form-group col-lg-6">\n' +
            '                            <label class="col-form-label" for="materno">Materno: <span class="requerido">*</span></label>\n' +
            '                            <input id="materno" class="form-control" type="text" name="materno" placeholder="Apellido materno" required>\n' +
            '                        </div>\n' +
            '                        <div class="form-group col-lg-4">\n' +
            '                            <label class="col-form-label" for="radio_masculino">Genero: <span class="requerido">*</span></label>\n' +
            '                            <div class="row">\n' +
            '                                <div class="custom-control custom-radio">\n' +
            '                                    <input id="radio_masculino" class="custom-control-input" type="radio" name="id_genero" value="1" required>\n' +
            '                                    <label class="custom-control-label" for="radio_masculino">Masculino</label>\n' +
            '                                </div>\n' +
            '                                <div class="custom-control custom-radio">\n' +
            '                                    <input id="radio_femenino" class="custom-control-input" type="radio" name="id_genero" value="2">\n' +
            '                                    <label class="custom-control-label" for="radio_femenino">Femenino</label>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="form-group col-lg-4">\n' +
            '                            <label class="col-form-label" for="nacimiento">Nacimiento: <span class="requerido">*</span></label>\n' +
            '                            <input id="nacimiento" class="form-control" type="date" name="nacimiento" placeholder="Fecha de nacimiento" required>\n' +
            '                        </div>\n' +
            '                        <div class="form-group col-lg-8">\n' +
            '                            <label class="col-form-label" for="id_tipo_telefono" data-toggle="tooltip" data-placement="top" title="Puede tener espacios, guiones medios, parentesis o simplemente numeros; por ejemplo: (246) 123 22 55, 247-145-55-20" >Numero de telefono: <span class="requerido">*</span></label>\n' +
            '                            <div class="row">\n' +
            '                                <div class="form-group col-lg-5">\n' +
            '                                    <select name="id_tipo_telefono" class="custom-select cat_tipo_telefono" data-destino="#id_tipo_telefono" id="id_tipo_telefono" required>\n' +
            '                                        <option value="">-- Seleccione --</option>\n' +
            '                                    </select>\n' +
            '                                </div>\n' +
            '                                <div class="form-group col-lg-7">\n' +
            '                                    <input id="numero" class="form-control" type="text" name="numero" placeholder="Número de teléfono" required>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="form-group col-lg-6">\n' +
            '                            <label class="col-form-label" for="correo">Correo: </label>\n' +
            '                            <input id="correo" class="form-control" type="email" name="email" placeholder="Correo electrónico">\n' +
            '                        </div>\n' +
            '                        <div class="form-group col-lg-6">\n' +
            '                            <label class="col-form-label" for="facebook">Facebook: </label>\n' +
            '                            <input id="facebook" class="form-control" type="url" name="facebook" placeholder="Facebook">\n' +
            '                        </div>\n' +
            '\n' +
            '                        <div class="form-group col-lg-12">\n' +
            '                            <span class="form-text text-muted">Los compos con * son obligatorios</span>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="modal-footer">\n' +
            '                    <button type="reset" id="reset_form_contacto" style="display: none;">Reset form</button>\n' +
            '                    <button type="button" class="btn btn-outline-danger btn-sm" data-dismiss="modal">Cancelar</button>\n' +
            '                    <button type="button" id="btn_guardar_contacto" class="btn btn-outline-success btn-sm">Guardar</button>\n' +
            '                </div>\n' +
            '            </form>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';
        return html_formulario;
    }

}