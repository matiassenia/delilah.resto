const express = require('express');
const router = express.Router();
const userController = require("../controllers/users.controllers");
const verifyToken = require('../middleware/seguridad');


//ENDPOINTS USER
router.post('/', [verifyToken.verifyToken, verifyToken.ValidarAdmin], userController.createUser);
router.get('/', [verifyToken.verifyToken, verifyToken.ValidarAdmin], userController.getUsers);
router.get('/:userId', [verifyToken.verifyToken, verifyToken.ValidarAdmin], userController.getUsersById);
router.delete('/:userId', [verifyToken.verifyToken, verifyToken.ValidarAdmin], userController.UserDeleteById);
router.put/('/updateUser', [verifyToken.verifyToken, verifyToken.ValidarAdmin], userController.UpdateUserById);






router.get('/', (req, res) => {
    res.send('check my love for the users')
});

//
module.exports = router;

