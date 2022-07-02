const sequelize = require('../conexion');
const jwt = require ('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');


const signUp = async (req, res) => {
    const {nombre_usuario, email, contrasena, id_tipo_de_usuario} = req.body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(contrasena, salt);

    let arrayInsertUsers = [`${nombre_usuario}`,`${email}`, `${passwordHash}`, `${id_tipo_de_usuario}`]

    try {
        const result = await sequelize.query('INSERT INTO usuarios(nombre_usuario, nombre, apellido, email, telefono, direccion, contrasena, id_tipo_de_usuario ) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)',
            {replacements: arrayInsertUsers, type: sequelize.QueryTypes.INSERT})
            res.status(201).json({msq: `Usuario registrado con exito, Bienvenido ${nombre_usuario}!`, data: result})
        } catch (error) {
            console.log(`error ${error}`)
            if (error.nombre === 'SequelizeUniqueConstraintError') {
                res.status(404).json({msq: "Usuario existente"})
        } else {
            (error);
                res.status(500).json({msq: "Ah ocurrido un error en la inserción, intenta nuevamente"})
            }
        }   
    }


const signIn = async (req, res) => {
    try {
        const user = await sequelize.query(`SELECT * FROM usuarios WHERE email = '${req.body,email}'`,
        {type: sequelize.QueryTypes.SELECT})
        user = user[0];
        if (!user) {
            return res.status(400).json({error: 'Hay un error en la inserción de los datos de usuario y/o contraseña'})
        }
        const checkPass = await bcrypt.compare(req.body.contrasena, user.contrasena, (error, res) => {
            if (error) {
                return res.status(400).json({err, msq:'Hay algún dato que no coincide'})
            }
            if (res) {
                const token = jwt.sign({
                    nombre: user.nombre_usuario,
                    id_user: user.id_usuario,
                    id_role: user.id_tipo_de_usuario,
                }, process.env.PRIVATE_KEY, {expiresIn:'1h'})
                const {nombre_usuario} = user;
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
            res.status(500).json({err, msq:'Error, vuelve a intentarlo'})
    }
}

exports.signIn = signIn;
exports.signUp = signUp;

