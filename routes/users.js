const express = require('express');
const router = express.Router();
const userController = require("../controllers/users.controllers");
const verifyToken = require('../middleware/seguridad');


//ENDPOINTS USER
router.post('/', verifyToken.verifyToken, userController.createUser);
router.get('/', verifyToken.verifyToken, verifyToken.ValidarAdmin, userController.getUsers);
router.get('/:userId', verifyToken.verifyToken, verifyToken.ValidarAdmin, userController.getUsersById);
router.delete('/:userId', verifyToken.verifyToken, verifyToken.ValidarAdmin, userController.UserDeleteById);
router.put/('/updateUser', verifyToken.verifyToken, userController.UpdateUserById);
router.post('/login', userController.loginUser);





router.get('/', (req, res) => {
    res.send('check my love for the users')
});

//
module.exports = router;

