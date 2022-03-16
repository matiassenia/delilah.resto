const sequelize = require('../conexion');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const llave = process.env.LLAVE; ;


const createUser = async (req, res) =>{
    const { nombre_usuario, nombre, apellido, email, telefono, direccion, contrasena, tipo_de_usuario} = req.body

    let arrayInsertUsers = [`${nombre_usuario}`, `${nombre}`,`${apellido}`,`${email}`, `${telefono}`, `${direccion}`, `${contrasena}`, `${tipo_de_usuario}`]
    try {
        const UserData = await sequelize.query('INSERT INTO usuarios(nombre_usuario, nombre, apellido, email, telefono, direccion, contrasena, id_tipo_de_usuario ) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)',
        {replacements: arrayInsertUsers , type: sequelize.QueryTypes.INSERT })
        res.status(201).json({msq: "Usuario creado", data: UserData})
    } catch (error) {
        console.log(`error en la inserción ${error}`)
        if (error.nombre === 'SequelizeUniqueConstraintError') {
        res.status(404).json({msq: "El nombre del usuario ya existe"})
    } else {
        (error) 
        res.status(500).json({msq: "Ah ocurrido un error en la inserción, intenta nuevamente"})
        }
    }
}


const getUsers = async (req, res) => {
    try {
        const result = await sequelize.query("SELECT * FROM usuarios", {type: sequelize.QueryTypes.SELECT} ) 
        res.status(201).json({result})
    } catch (error) {
        console.log(`Algo salió mal ${error}`)
        res.status(404).json({msq: "Ah ocurrido un error"})
    }
}

//

const loginUser = async (req, res) => {
    try {
        const result = await sequelize.query('SELECT * FROM usuarios WHERE nombre_usuario ="'+req.body.nombre_usuario+'"AND contrasena ="'+ req.body.contrasena +'"', { type: sequelize.QueryTypes.SELECT});
        
        const {nombre_usuario, contrasena} = req.body;
            if (nombre_usuario !== result[0].nombre_usuario || contrasena !== result[0].contrasena) {
                return res.status(401).json({message: "Usuario invalido"});
            }
            const usuario = {
                nombre_usuario: nombre_usuario,
                id_usuario: result[0].id_usuario,
                id_role:result[0].id_tipo_de_usuario,
            }
            const jwtToken = jwt.sign(usuario, llave, {expiresIn: '1h'});
            console.log(usuario)
            res.status(200).json({token: jwtToken});
            
    }catch (error) {
        console.log('No se encontró el usuario')
        res.status(404).json({msg: "Error al intentar loguearse"})
    }
}

////


const getUsersById = async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT * FROM usuarios WHERE id_usuario = ${req.params.userId}`, 
        {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        console.log("Hubo un error")
        res.status(400).json({msg: "Usuario no existe"})
    }
} 

const UserDeleteById = async (req, res) => {
    try {
        const result = await sequelize.query(`DELETE FROM usuarios WHERE id_usuario = ${req.params.userId}`, 
        {type: sequelize.QueryTypes.DELETE})
        res.status(200).json({msg:'Usuario eliminado'})
    } catch (error) {
        console.log('no se pudo eliminar al usuario')
        res.status(404).json({error, msg: 'Usuario no eliminado'})
    }
}

const UpdateUserById = async (req, res) => {
    const { nombre_usuario, nombre, apellido, email, telefono, direccion, contrasena, tipo_de_usuario} = req.body
    try {
    const result = await sequelize.query(`UPDATE usuarios 
    SET nombre_usuario = ${nombre_usuario}, nombre =${nombre}, apellido = ${apellido}, email = ${email}, telefono = ${telefono}, direccion = ${direccion}, contrasena = ${contrasena}, tipo_de_usuario = ${tipo_de_usuario}, WHERE id_usuario = ${req.params.userId}`,
    { type: sequelize.QueryTypes.UPDATE })
        res.status(204).json({ message:'Usuario actualizado', result})
    } catch (error) {
        res.status(404).json({error, msg: 'Error al intentar actualizar los usuarios'})
    }
}



exports.createUser = createUser; 
exports.getUsers = getUsers;
exports.getUsersById = getUsersById;
exports.UserDeleteById = UserDeleteById;
exports.UpdateUserById = UpdateUserById;
exports.loginUser = loginUser;