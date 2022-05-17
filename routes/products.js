const express = require('express');
const productsController = require("../controllers/products.controllers");
const router = express.Router();

router.post('/', productsController.createProducts);
router.get('/', productsController.getProducts);
router.get('/:productsId', productsController.getProductsById);
router.delete('/:productsId',productsController.productsDeleteById);
router.put('/updateProducts', productsController.UpdateProducts);



router.get('/', (req, res) => {
    res.send('check my love for the products')
});

module.exports = router;