const sequelize = require('../conexion');
const jwt = require ('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { use } = require('../routes/users');
const { response } = require('express');

const signUp = async (req, res) => {
    const {nombre_usuario, email, contrasena, tipo_de_usuario} = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(contrasena, salt);

    let arrayInsertUsers = [`${nombre_usuario}`,`${email}`, `${contrasena}`, `${tipo_de_usuario}`]

    try {
        const result = await sequelize.query('INSERT INTO usuarios(nombre_usuario, nombre, apellido, email, telefono, direccion, contrasena, id_tipo_de_usuario ) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)',
            {replacements: arrayInsertUsers , type: sequelize.QueryTypes.INSERT })
            res.status(201).json({msq: `Usuario registrado con exito! Hola ${nombre_usuario}!`, data: result})
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


const signIn = async (req, res) => {
    try {
        const user = await sequelize.query(`SELECT * FROM usuarios WHERE email = '${req.body,email}'`,
        {type:sequelize.QueryTypes.SELECT})
        user = user[0]
        if (!user) {
            return res.status(400).json({error: 'Hay un error en la inserción de los datos de usuario y/o contraseña'})
        }
        const ValidPass = await bcrypt.compare(req.body.contrasena, user.contrasena, (err, res) => {
            if (err) {
                return res.status(400)
            }
            if (res) {
                const token = jwt.sign({
                    nombre: user.nombre_usuario,
                    id_user: user.id_usuario,
                    id_role: user.id_tipo_de_usuario,
                }, process.env.PRIVATE_KEY, {expiresIn:'1h'})
                const{nombre_usuario} = user;
                res.status(200).headers('Authorization', token).json({
                error: null,
                data: `Bienvenido ${user.nombre_usuario}`,
                token
                })
            } else {
                    return res.status(400).json({error: 'Usuario invalido'})
                }
            })
            } catch (err) {
                res.status(500).json({err, msq:'Error inesperado'})
        }
}

exports.signIn = signIn;
exports.signUp = signUp;

