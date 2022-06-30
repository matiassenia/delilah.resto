const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controllers');


router.post('/', ordersController.createOrder);
router.get('/', ordersController.getOrder);
router.get('/user', ordersController.getUserOrders);
router.delete('/:orderId',ordersController.deleteOrder);
router.put('/:orderId', ordersController.putOrderId);


router.get('/', (req, res) => {
    res.send('check my love for the orders')
});

module.exports = router;