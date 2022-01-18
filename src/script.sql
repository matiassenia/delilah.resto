CREATE DATABASE IF NOT EXISTS Delilah_resto;
USE Delilah_resto;


--Creo la tabla usuarios:

CREATE TABLE usuarios(
			id_usuario int NOT NULL primary key auto_increment,
			nombre_usuario varchar (265),
    		nombre varchar (265),
    		apellido varchar (265),
    		email varchar (265),
			telefono varchar (265),
			direccion varchar (265),
			contrasena varchar (265),
			id_tipo_de_usuario int
)


--Inserto datos del usuario:

INSERT INTO  usuarios (nombre_usuario, nombre, apellido, email, telefono, direccion, contrasena, id_tipo_de_usuario)
VALUES('PeterPeter','Peter','Pitardo','pitpeter@gmail.com','19191919566','perepepe 77','acrat01', 1)

--Creo la tabla tipo de usuario:

CREATE TABLE tipo_de_usuario(
			id_tipo_de_usuario int NOT NULL PRIMARY KEY AUTO_INCREMENT,
			nombre_usuario varchar (265)
)

--Inserto valores tabla tipo_de_usuario:

INSERT INTO tipo_de_usuario (nombre_usuario) VALUES ('administrador');
INSERT INTO tipo_de_usuario (nombre_usuario) VALUES ('usuario')


--Creo la tabla nuestros platos:

CREATE TABLE nuestros_platos(
			id_plato int NOT NULL PRIMARY KEY AUTO_INCREMENT,
			nombre_plato varchar (265),
    		descripcion_plato varchar (265),
    		precio int,
    		imagen varchar(255)
)

--Inserto valores a la tabla nuestros_platos:

INSERT INTO  nuestros_platos (nombre_plato, descripcion_plato , precio , imagen)
VALUES('Bagel de salmón','Bagel/queso crema/salmón ahumado/eneldo',425, "https://via.placeholder.com/111");

INSERT INTO  nuestros_platos (nombre_plato, descripcion_plato , precio , imagen)
VALUES('Hamburguesa clásica','Pan brioche/queso cheddar/Medallón de carne/Lechuga/Tomate',350, "https://via.placeholder.com/222");

INSERT INTO nuestros_platos (nombre_plato, descripcion_plato , precio , imagen)
VALUES('Sandwich veggie','Pan de miga integral/queso dambo/palta/mayonesa de remolacha',310, "https://via.placeholder.com/333");

INSERT INTO  nuestros_platos (nombre_plato, descripcion_plato , precio , imagen)
VALUES('Ensalada veggie','Hojas verdes/nueces/vinagreta de miel/duraznos/palta',340, "https://via.placeholder.com/444");

INSERT INTO  nuestros_platos (nombre_plato, descripcion_plato , precio , imagen)
VALUES('Focaccia','Pan de tipo italiano/romero/aceite de oliva',300, "https://via.placeholder.com/555");



--Creo la tabla platos pedidos

CREATE TABLE platos_pedidos(
			id_platos_pedidos int NOT NULL PRIMARY KEY AUTO_INCREMENT,
			id_plato int,
    		id_pedido int,
    		cantidad int
)



--Creo la tabla pedidos 

CREATE TABLE pedidos(
			id_pedido int NOT NULL primary key auto_increment,
			hora TIMESTAMP not null default CURRENT_TIMESTAMP,
    		id_estado int,
    		id_metodo_de_pago int,
    		id_usuario int,
    		id_plato int
)

--Creo la tabla metodo de pago

CREATE TABLE metodo_de_pago(
			id_metodo_de_pago int NOT NULL primary key auto_increment,
			nombre varchar (265)
)

--Inserto valores metodo_de_pago

INSERT INTO metodo_de_pago (nombre) VALUES ('efectivo');
INSERT INTO metodo_de_pago (nombre) VALUES ('tarjeta de credito');
INSERT INTO metodo_de_pago (nombre) VALUES ('tarjeta de debito');

--Creo la tabla estado del pedido

CREATE TABLE estado_del_pedido(
			id_estado int NOT NULL primary key auto_increment,
			nombre varchar (265)
)

--Inserto valores estado_del_pedido

INSERT INTO estado_del_pedido (nombre) VALUES ('Nuevo');
INSERT INTO estado_del_pedido (nombre) VALUES ('Confirmado');
INSERT INTO estado_del_pedido (nombre) VALUES ('Preparando');
INSERT INTO estado_del_pedido (nombre) VALUES ('Enviando');
INSERT INTO estado_del_pedido (nombre) VALUES ('Entregado');


--Modificar la tabla de usuarios:

ALTER TABLE usuarios 
ADD FOREIGN KEY (id_tipo_de_usuario) REFERENCES tipo_de_usuario(id_tipo_de_usuario);
 

ALTER TABLE pedidos 
ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);

ALTER TABLE pedidos 
ADD FOREIGN KEY (id_metodo_de_pago) REFERENCES metodo_de_pago(id_metodo_de_pago);

ALTER TABLE pedidos 
ADD FOREIGN KEY (id_estado)REFERENCES estado_del_pedido(id_estado);

ALTER TABLE platos_pedidos 
ADD FOREIGN KEY (id_plato) REFERENCES nuestros_platos(id_plato);

ALTER TABLE platos_pedidos 
ADD FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido);


--Creo un usuario de ser necesario para utilizar solo esta base de datos 

CREATE USER 'user_resto'@'localhost' IDENTIFIED BY 'qwerty1234';
GRANT ALL PRIVILEGES ON Delilah_resto TO 'user_resto'@'localhost';

