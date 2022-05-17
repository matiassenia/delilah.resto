const sequelize = require('../conexion');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Probar 8/5/22

const createProducts = async (req, res) =>{
    const { nombre_plato, descripcion_plato, precio, imagen} = req.body
    
    //insert data
    let arrayInsertProducts= [`${nombre_plato}`, `${descripcion_plato}`,`${precio}`,`${imagen}`]
    
    try {
        const productData = await sequelize.query('INSERT INTO nuestros_platos(nombre_plato, descripcion_plato, precio, imagen) VALUES( ?, ?, ?, ?,)',
        {replacements: arrayInsertProducts , type: sequelize.QueryTypes.INSERT })
        res.status(201).json({msq: "Producto creado", data: productData})

    } catch (error) {
        console.log(`error en la inserción ${error}`)
        if (error.nombre === 'SequelizeUniqueConstraintError') {
        res.status(404).json({msq: "El producto ya existe con ese nombre"})
    } else {
        (error) 
        res.status(500).json({msq: "Ah ocurrido un error en la inserción, intenta nuevamente"})
        }
    }
}


const getProducts = async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT * FROM nuestros_platos`, {type: sequelize.QueryTypes.SELECT}) 
        res.status(201).json({result})
    } catch (error) {
        console.log(`Algo salió mal ${error}`)
        if (error.nombre){
        res.status(404).json({msq: "Ah ocurrido un error"})
        } else {
        res.status(500).json({error, msg:'Error, intenta nuevamente'})
        }
    }
}

const getProductsById = async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT * FROM nuestros_platos WHERE id_plato = ${req.params.id}`, 
        {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        console.log("Hubo un error")
        if (error.nombre_plato){
        res.status(400).json({error, msg: "El producto no existe"})
        } else{
            res.status(500).json({error, msg: 'Error inesperado'
            })
        }
    }
} 

const productsDeleteById = async (req, res) => {
    try {
        const result = await sequelize.query(`DELETE FROM nuestros_platos WHERE id_plato = ${req.params.id}`, 
        {type: sequelize.QueryTypes.DELETE})
        res.status(200).json({result, msg:'Producto eliminado'})
    } catch (error) {
        console.log('no se pudo eliminar al producto')
        if(error.nombre_plato){
        res.status(404).json({error, msg: 'No se pudo eliminar el producto'})
        }else{
            res.status(500).json({error, msg:'Error inesperado'})
        }
    }
}

const updateProducts = async (req, res) => {
    const {nombre_plato, descripcion_plato, precio, imagen} = req.body
    try {
    const result = await sequelize.query(`UPDATE nuestros_platos SET nombre_plato = "${nombre_plato}", descripcion = "${descripcion_plato}", precio = "${precio}", img = "${imagen}", WHERE id_plato = ${req.params.id}`,
    { type: sequelize.QueryTypes.UPDATE })
        res.status(204).json({ message:'Producto actualizado', result})
    } catch (error) {
        if (error.nombre){
        res.status(404).json({error, msg: 'Error al intentar actualizar los datos del producto'})
        }else {
        res.status(500).json({error, msg:'Error inesperado'})
        }
    }
}
exports.createProducts = createProducts;
exports.getProducts = getProducts;
exports.getProductsById = getProductsById;
exports.productsDeleteById = productsDeleteById;
exports.updateProducts = updateProducts;