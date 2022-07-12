const sequelize = require('../conexion')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const createOrder = async (req, res) => {
    const {id_usuario, id_plato, id_metodo_de_pago, id_estado} = req.body; 
    const arrayInsertOrder = [`${id_usuario}`,`${id_plato}`,`${id_metodo_de_pago}`,`${id_estado}`];
    try {
        const result = await sequelize.query('INSERT INTO pedidos (id_usuario, id_plato, id_metodo_de_pago, id_estado) VALUES (?,?,?,?)',
        {replacements: arrayInsertOrder, type: sequelize.QueryTypes.INSERT})
        console.log("result", result);
        res.status(201).json({msg: "Pedido creado", result})
    }catch (error){
        if (error.name){
            res.status(400).json({error, msg: 'error en la creación del pedido'})
        } else {
            res.status(500).json({error, msg: 'error inesperado'})
        }
    }
}

const getOrder = async (req, res) => {
    try {
        const result = await sequelize.query(`SELECT id_pedido, hora, e.nombre_plato as estado_del_pedido, mp.nombre_plato as metodo_de_pago, u.nombre_usuario, u.direccion, u.email FROM pedidos left join usuarios u using(id_usuario) left join estado_del_pedido e using(id_estado) left join metodo_de_pago mp using(id_metodo_de_pago)`, 
        {type: sequelize.QueryTypes.SELECT})
        res.status(201).json({result})
    } catch (error){
        if (error.name) {
            res.status(404).json({error, msg: 'error en la busqueda'})
        } else {
            res.status(500).json({error, msg: 'Error inesperado'})
        }
    }
}

const getUserOrders = async (req, res) => {
    const token = req.header('Authorization')
    const verify = jwt.verify(token, process.env.SECRET_TOKEN)

    try {
        const result = await sequelize.query(`SELECT id_pedido, hora, e.nombre_plato as estado_del_pedido, mp.nombre_plato as metodo_de_pago, u.nombre_usuario, FROM pedidos left join usuarios u using (id_usuario) left join estado e using(id_estado) left join metodo_de_pago mp using(id_metodo_de_pago) WHERE id_usuario = ${verify.id_usuario})`,
        {type: sequelize.QueryTypes.SELECT})
        res.status(200).json({result})
    } catch (error) {
        if (error.name) {
            res.status(404).json({error, msg: 'Error, datos no encontrados'})
        } else {
            res.status(500).json({error, msg : 'Error'})
        }
    }
}

const putOrderId = async (req, res) => {
    const {id_status} = req.body;
    try {
        const result = await sequelize.query(`UPDATE pedidos SET id_estado = "${id_status}" WHERE id_pedido = ${req.params.id_pedido}`,
        {type: sequelize.QueryTypes.INSERT})
        res.status(204).json({ msg: 'Pedido actualizado', result })
        } catch (error) {
    if (error.name) {
        res.status(404).json({
            error, msg: 'error en la actualizacion'
        })
        } else {
        res.status(500).json({error, msg: 'error'})
        }
    }
}

const deleteOrder = async (req, res) => {
    try {
        const result = await sequelize.query(`DELETE FROM pedidos WHERE id_pedido = ${res.params.id_pedido}`)
        res.status(204).json({ msg: 'Pedido eliminado', result})
    } catch (error) { 
        if (error.name) {
            res.status(400).json({error, msg : 'Error en la eliminación'})
        } else { 
            res.status(500).json({error, msg:'Error'})
        }
    }
}

exports.createOrder = createOrder;
exports.getOrder = getOrder;
exports.getUserOrders = getUserOrders;
exports.putOrderId = putOrderId;
exports.deleteOrder = deleteOrder;