const express = require('express');
const router = express.Router();
const userController = require("../controllers/users.controllers");
const verifyToken = require('../middleware/seguridad');


//ENDPOINTS USER
router.post('/', [verifyToken.verifyToken, verifyToken.validarAdmin], userController.createUser);
router.get('/', [verifyToken.verifyToken, verifyToken.validarAdmin], userController.getUsers);
router.get('/:userId', [verifyToken.verifyToken, verifyToken.validarAdmin], userController.getUsersById);
router.delete('/:userId', [verifyToken.verifyToken, verifyToken.validarAdmin], userController.UserDeleteById);
router.put/('/updateUser', [verifyToken.verifyToken, verifyToken.validarAdmin], userController.UpdateUserById);






router.get('/', (req, res) => {
    res.send('check my love for the users')
});

//
module.exports = router;

