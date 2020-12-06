CREATE DATABASE IF NOT EXISTS `sitio_contacto` DEFAULT CHARACTER SET utf8 ;
USE `sitio_contacto` ;

CREATE TABLE IF NOT EXISTS `sitio_contacto`.`catalogo_tipo_telefono` (
    `id_catalogo_tipo_telefono` INT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
    `tipo_telefono` VARCHAR(150) NOT NULL,
    PRIMARY KEY (`id_catalogo_tipo_telefono`))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `sitio_contacto`.`contacto` (
    `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(75) NOT NULL,
    `paterno` VARCHAR(45) NOT NULL,
    `materno` VARCHAR(45) NOT NULL,
    `nacimiento` DATE NOT NULL,
    `id_genero` INT(1) UNSIGNED NOT NULL,
    `correo` VARCHAR(100) NOT NULL,
    `facebook` VARCHAR(150) NOT NULL,
    `id_catalogo_tipo_telefono` INT(3) UNSIGNED NOT NULL,
    `numero_telefono` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_contacto_catalogo_tipo_telefono_idx` (`id_catalogo_tipo_telefono` ASC),
CONSTRAINT `fk_contacto_catalogo_tipo_telefono`
FOREIGN KEY (`id_catalogo_tipo_telefono`)
REFERENCES `sitio_contacto`.`catalogo_tipo_telefono` (`id_catalogo_tipo_telefono`)
ON DELETE NO ACTION
ON UPDATE NO ACTION)
ENGINE = InnoDB;


START TRANSACTION;
USE `sitio_contacto`;
INSERT INTO `sitio_contacto`.`catalogo_tipo_telefono` (`id_catalogo_tipo_telefono`, `tipo_telefono`) VALUES (1, 'Celular');
INSERT INTO `sitio_contacto`.`catalogo_tipo_telefono` (`id_catalogo_tipo_telefono`, `tipo_telefono`) VALUES (2, 'Casa');
INSERT INTO `sitio_contacto`.`catalogo_tipo_telefono` (`id_catalogo_tipo_telefono`, `tipo_telefono`) VALUES (3, 'Oficina');
INSERT INTO `sitio_contacto`.`catalogo_tipo_telefono` (`id_catalogo_tipo_telefono`, `tipo_telefono`) VALUES (4, 'Fax');

COMMIT;