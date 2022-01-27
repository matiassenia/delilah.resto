const sequelize = require('../conexion');


const registerUser = async (req, res) =>{
    const { nombre_usuario, nombre, apellido, email, telefono, direccion, contrasena, tipo_de_usuario} = req.body

    let arrayInsertUsers = [`${nombre_usuario}`, `${nombre}`,`${apellido}`,`${email}`, `${telefono}`, `${direccion}`, `${contrasena}`, `${tipo_de_usuario}`]

    try {
        const UserData = await sequelize.query('INSERT INTO usuarios(nombre_usuario, nombre, apellido, email, telefono, direccion, contrasena, id_tipo_de_usuario ) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)',
        {replacements: arrayInsertUsers , type: sequelize.QueryTypes.INSERT })
        res.status(201).json({msq: "Usuario creado", data: UserData})
    } catch (error) {
        console.log(`error en la inserción ${error}`)
        res.status(404).json({msq: "Ah ocurrido un error en la inserción, intenta nuevamente"})
    }
}

const loginUser = async (req, res) => {
    
}

exports.registerUser = registerUser;
exports.loginUser = loginUser;
