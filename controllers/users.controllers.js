const sequelize = require('../conexion');


const createUser = async (req, res) =>{
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


const getUsers = async (req, res) => {
    try {
        const result = await sequelize.query("SELECT * FROM usuarios", {type: sequelize.QueryTypes.SELECT} ) 
        res.status(201).json({result})
    } catch (error) {
        console.log(`Algo salió mal ${error}`)
        res.status(404).json({msq: "Ah ocurrido un error"})
    }
}

const getUsersById = async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT * FROM usuarios WHERE id_usuario = ${req.params.userId}`, 
        {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        console.log('Hubo un error ${error}')
        res.status(404).json({
            error, 
            message: 'Usuario no existe'
        })
    }
} 



exports.createUser = createUser; 
exports.getUsers = getUsers;
exports.getUsersById = getUsersById;
