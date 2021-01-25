class Contacto {

    constructor(nombre,paterno,materno,id_genero,nacimiento,id_catalogo_tipo_telefono,numero_telefono,correo,facebook) {
        this.nombre = nombre;
        this.paterno = paterno;
        this.materno = materno;
        this.id_genero = id_genero;
        this.nacimiento = nacimiento;
        this.id_catalogo_tipo_telefono = id_catalogo_tipo_telefono;
        this.numero_telefono = numero_telefono;
        this.correo = correo;
        this.facebook = facebook;
    }

}

module.exports = Contacto;