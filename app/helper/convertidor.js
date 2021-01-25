//cargamos la entidad contacto
var Contacto = require('../entities/contacto');
var Usuario = require('../entities/usuario');
var pass_hash = require('password-hash');

var Convertidor = {

    /**
     * funcion que devuelve la entidad de contacto
     * necesita el req.bodu para funcionar
     */
    obtenerEntidadContacto : function(body){
        var contacto = new Contacto(
            body.nombre ? body.nombre : '',
            body.paterno ? body.paterno : '',
            body.materno ? body.materno : '',
            body.id_genero ? body.id_genero : '',
            body.nacimiento ? body.nacimiento : '',
            body.id_tipo_telefono ? body.id_tipo_telefono : '',
            body.numero ? body.numero : '',
            body.email ? body.email : '',
            body.facebook ? body.facebook : ''
        );
        return contacto;
    },

    obtenerEntidadUsuario : function(params){
        var usuario = new Usuario(
            params.usr ? params.usr : '',
            params.pass ? pass_hash.generate(params.pass) : ''
        );
        return usuario;
    }

}

module.exports = Convertidor;