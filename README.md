DELILAH RESTO PROJECT

DELILAH RESTÓ

#Objetivo:
Crear el backend para un sistema de pedidos online para un restaurante.

#Acciones User:
- Registrarnos
- Identificarnos
- Crear pedidos
- Obtener solo sus pedidos
- Obtener todo el catálogo de Platos disponibles
----------------------------------------------------------------------------------------------------------

#Acciones Admin:
- Obtener Platos
- Agregar Platos
- Eliminar Platos
- Actualizar Platos
- Obtener todos los pedidos
- Eliminar pedidos
- Actualizar el estado de los pedidos
- Crear pedidos
- Actualizar el tipo de usuario
- Agregar un nuevo Usuario
- Eliminar Usuarios
- Obtener todos los Usuarios
----------------------------------------------------------------------------------------------------------

1. Clonar el proyecto desde tu consola 🚀

copia y pega esta línea de comando:

```
git clone https://github.com/matiassenia/delilah.resto.git
```

----------------------------------------------------------------------------------------------------------

2. Instalar dependencia 🔧

copia y pega esta línea de comando:

```
npm i
```

----------------------------------------------------------------------------------------------------------

3. Crear Base de Datos ⚙️

Al clonar el proyecto hay un archivo llamado script.sql ahí están 
todas las instrucciones para la creación de las tablas que debes 
crear para poder iniciar el servidor con la base de datos. 
También se encuentran la creación de las FOREIGN KEY para 
hacer la relación entre las tablas.

----------------------------------------------------------------------------------------------------------

4. Configurar archivo .env 🖇️

Debes crear un archivo .env para guardar las variables de entorno (en el proyecto tienes un archivo llamado .env para que puedas guiarte):

- SECRET_TOKEN
- EXPIRES_TOKEN

Debe estar escrito tal cual como se muestra en este documento.

- SECRET_TOKEN (es el token que se necesita para generar y decodificar 
el token de cada usuario y así poder hacer las diferentes acciones, 
recuerda que este token debe estar en una variable de entorno y el string debe estar oculto)

- EXPIRES_TOKEN (es el tiempo de validez que tendrá el token 
del usuario para hacer operaciones).

----------------------------------------------------------------------------------------------------------

5. Inicia el servidor 🚀

Tienes varias opciones para iniciar el servidor. Desde tu terminal o editor de código(en la consola) y estando en la carpeta delilah-resto puedes introducir cualquiera de estos comandos:

```
node app.js
nodemon app.js
npm start
```

----------------------------------------------------------------------------------------------------------

6. Puedes ir a swagger copiar y pegar el contenido del archivo YAML para entender mejor el funcionamiento de la API

----------------------------------------------------------------------------------------------------------

7. EDPOINT ✒️

#API Desing:

| Metodo  | Enpoint                | Body                                                     | Header  | Descripcion                        |
|---------|------------------------|----------------------------------------------------------|---------|------------------------------------|
| USERS   |                        |                                                          |         |                                    |
|         |                        |                                                          |         |                                    |
| POST    | /authorization/register  |{email, contrasena}                                       |         | Registra un usuario nuevo          |
| POST    | /authorization/login     |{nombre_usuario, nombre, apellido, email, telefono, direccion, contrasena, tipo_de_usuario} |         | Inicio de sesión del usuario       |
| GET     | /users          |                                                          | {TOKEN} | Obtiene todos los usuarios (Admin) |
| POST    | /users          |{nombre_usuario, email, telefono, direccion, contrasena, id_tipo_de_usuario} | {TOKEN} | Crear un nuevo usuario (Admin)     |
| GET     | /users/:userId  |                                                          | {TOKEN} | Obtiene usuario por su ID (Admin)  |
| PUT     | /users/:userId  |{id_tipo_de_usuario}                                                 | {TOKEN} | Actualiza tipo de usuario (Admin)  |
| DELETE  | /users/:userId  |{productsId} (por parámetro)                                 | {TOKEN} | Elimina Usuario (Admin)            |
|         |                        |                                                          |         |                                  |
| PRODUCTS|                        |                                                          |         |                                    |
|         |                        |                                                          |         |                                    |
| POST    | /products       |{nombre_plato, descripcion_plato, precio, imagen}                                | {TOKEN} | Crea un plato (Admin)              |
| GET     | /products          |                                                          |         | Devuelve todos los platos          |
| GET     | /products/:productsId |                                                          |         | Devuelve un plato según su ID      |
| PUT     | /products/:productsId |{nombre_plato, descripcion_plato, precio, imagen }                                | {TOKEN} | Actualiza un plato (Admin)         |
| DELETE  | /products/:productsId |{productsId} (por parámetro)                                 | {TOKEN} | Elimina un plato (Admin)           |
|         |                        |                                                          |         |                                    |
| ORDERS  |                        |                                                          |         |                                    |
|         |                        |                                                          |         |                                    |
| POST    | /orders         |{id_usuario, id_plato, id_metodo_de_pago, id_estado}              | {TOKEN} | Crea un nuevo pedido               |
| GET     | /orders         |                                                          | {TOKEN} | Obtiene todos los pedidos (Admin)  |
| GET     | /orders/user    |                                                          | {TOKEN} | Obtiene los pedidos del usuario    |
| PUT     | /orders/:orderId|{id_pedido} (por parámetro)                                 | {TOKEN} | Actualiza estado del pedido (Admin)     |
| DELETE  | /orders/:orderId|{id_pedido} (por parámetro)                                 | {TOKEN} | Elimina el pedido (Admin)           |
