var ExtraQuery = {
    form_busqueda : function(form){
        var extra_sql = ' where 1=1';
        if(form.buscar_nombre != undefined && form.buscar_nombre != ''){
            extra_sql += " and (c.nombre like '%"+form.buscar_nombre+"%' or c.paterno like '%"+form.buscar_nombre+"%' or c.materno like '%"+form.buscar_nombre+"%' )";
        }if(form.buscar_id_genero != undefined && form.buscar_id_genero != ''){
            extra_sql += " and c.id_genero = "+form.buscar_id_genero+"";
        }if(form.buscar_numeroTelefono != undefined && form.buscar_numeroTelefono != ''){
            extra_sql += " and c.numero_telefono like '"+form.buscar_numeroTelefono+"%'";
        }if(form.buscar_nacimiento != undefined && form.buscar_nacimiento != ''){
            //extra_sql += " and c.nacimiento = '"+ComunHelper.convertir_fecha_html_to_bd(form.buscar_nacimiento)+"'";
            extra_sql += " and c.nacimiento = '"+form.buscar_nacimiento+"'";
        }if(form.buscar_idTipoTelefono != undefined && form.buscar_idTipoTelefono != ''){
            extra_sql += " and c.id_catalogo_tipo_telefono ="+form.buscar_idTipoTelefono;
        }
        return extra_sql;
    }
}

module.exports = ExtraQuery;