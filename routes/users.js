const express = require('express');
const router = express.Router();
const userController = require("../controllers/users.controllers");


//ENDPOINTS USER
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUsersById);
router.delete('/:userId', userController.UserDeleteById);
router.put/('/updateUser', userController.UpdateUserById);
router.post('/login', userController.loginUser);





router.get('/', (req, res) => {
    res.send('check my love for the users')
});

//
module.exports = router;

