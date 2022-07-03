const express = require('express');
const productsController = require("../controllers/products.controllers");
const router = express.Router();
const verifyToken = require('../middleware/seguridad');

router.post('/', [verifyToken.verifyToken, verifyToken.validarAdmin], productsController.createProducts);
router.get('/', productsController.getProducts);
router.get('/:productsId', productsController.getProductsById);
router.delete('/:productsId',[verifyToken.verifyToken, verifyToken.validarAdmin],productsController.productsDeleteById);
router.put('/:updateProducts', [verifyToken.verifyToken, verifyToken.validarAdmin],productsController.updateProducts);



router.get('/', (req, res) => {
    res.send('check my love for the products')
});

module.exports = router;