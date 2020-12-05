var Valida = {

    msg_validacion : [],

    form_contacto : function(form){
        var form_valido = true;
        //pasamos cada una de las validaciones para que regrese el mensaje(s)
        if(!this.valida_campo(form.nombre,'nombre')){ form_valido = false}
        if(!this.valida_campo(form.paterno,'apellido paterno')){ form_valido = false}
        if(!this.valida_campo(form.materno,'apellido materno')){ form_valido = false}
        if(!this.valida_campo(form.id_genero,'genero')){ form_valido = false}
        if(!this.valida_campo(form.id_tipo_telefono,'tipo de telefóno')){ form_valido = false}
        if(!this.valida_campo(form.email,'correo electrónico')){ form_valido = false}
        if(!this.valida_campo(form.facebook,'link de face')){ form_valido = false}
        if(!this.valida_campo(form.nacimiento,'fecha de nacimiento')
            || !this.validar_fecha(form.nacimiento)){
            form_valido = false
        }
        if(!this.valida_campo(form.numero,'número de telefono')
            || !this.validar_telefono(form.numero)){
            form_valido = false
        }
        console.log(this.msg_validacion);
        return form_valido;
    },

    form_foro : function(form){
        var form_valido = true;
        //pasamos las validaciones para que nos regrese el mensaje(s) no validos
        if(!this.valida_campo(form.remitente,'nombre')){ form_valido = false;}
        if(!this.valida_campo(form.asunto,'asunto')){ form_valido = false;}
        if(!this.valida_campo(form.mensaje,'mensaje')){ form_valido = false;}
        return form_valido;
    },

    valida_campo : function(campo,tag){
        var es_valido = true;
        if(campo == undefined || campo == null || campo == '' || campo.trim() == ''){
            es_valido = false;
            this.msg_validacion.push('El campo '+tag+' es requerido o no es valido');
        }
        return es_valido;
    },

    validar_telefono : function(telefono){
        var esValido = true;
        if(telefono.match(/^[(]{0,1}[0-9 -]{3,4}[)]{0,1}[0-9 -]{7,11}$/) == null){
            esValido = false;
            this.msg_validacion.push('El campo teléfono es requerido (diez digitos) o es un número inválido (puede tener parentesis/espacio/guiones medios o solo números)');
        }
        return esValido;
    },

    validar_fecha : function (nacimiento){
        var pasado = new Date(nacimiento);
        var hoy = new Date();
        var es_valido = true;
        if(pasado > hoy){
            es_valido = false;
            this.msg_validacion.push('La fecha de nacimiento no puede ser mayor a la fecha de hoy');
        }
        return es_valido;
    }

}

module.exports = Valida;