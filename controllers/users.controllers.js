const sequelize = require('../conexion');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const KEY = process.env.PRIVATE_KEY


const createUser = async (req, res) =>{
    const { nombre_usuario, nombre, apellido, email, telefono, direccion, contrasena, tipo_de_usuario} = req.body
    //pass hash
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(contrasena, salt);
    console.log("password hasheado");
    console.log(passwordHash);
    
    //insert data
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
        const result = await sequelize.query('SELECT * FROM usuarios', {type: sequelize.QueryTypes.SELECT}) 
        res.status(201).json({result})
    } catch (error) {
        if (error.nombre){
        res.status(404).json({msq: 'Usuario no encontrado'})
        } else {
        res.status(500).json({error, msg:'Error, intenta nuevamente'})
        }
    }
}




const getUsersById = async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT * FROM usuarios WHERE id_usuario = ${req.params.userId}`, 
        {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        console.log("Hubo un error")
        if (error.nombre){
        res.status(400).json({error, msg: "Usuario no existe"})
        } else{
            res.status(500).json({error, msg: 'Error inesperado'
            })
        }
    }
} 

const UserDeleteById = async (req, res) => {
    try {
        const result = await sequelize.query(`DELETE FROM usuarios WHERE id_usuario = ${req.params.userId}`, 
        {type: sequelize.QueryTypes.DELETE})
        res.status(200).json({result, msg:'Usuario eliminado'})
    } catch (error) {
        console.log('no se pudo eliminar al usuario')
        if(error.nombre){
        res.status(404).json({error, msg: 'No se pudo eliminar el usuario'})
        }else{
            res.status(500).json({error, msg:'Error inesperado'})
        }
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
        if (error.nombre){
        res.status(404).json({error, msg: 'Error al intentar actualizar los datos del usuario'})
        }else {
        res.status(500).json({error, msg:'Error inesperado'})
        }
    }
}



exports.createUser = createUser; 
exports.getUsers = getUsers;
exports.getUsersById = getUsersById;
exports.UserDeleteById = UserDeleteById;
exports.UpdateUserById = UpdateUserById;
