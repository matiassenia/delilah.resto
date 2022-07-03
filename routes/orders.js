const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controllers');
const verifyToken = require('../middleware/seguridad')

router.post('/',[verifyToken.verifyToken, verifyToken.validarAdmin] ,ordersController.createOrder);
router.get('/', [verifyToken.verifyToken, verifyToken.validarAdmin],ordersController.getOrder);
router.get('/user',[verifyToken.verifyToken, verifyToken.validarAdmin] ,ordersController.getUserOrders);
router.delete('/:orderId',[verifyToken.verifyToken, verifyToken.validarAdmin],ordersController.deleteOrder);
router.put('/:orderId', [verifyToken.verifyToken, verifyToken.validarAdmin],ordersController.putOrderId);


router.get('/', (req, res) => {
    res.send('check my love for the orders')
});

module.exports = router;