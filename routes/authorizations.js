const express = require('express');
const router = express.Router();
const authController = require("../controllers/authorizations.controllers");

//Rutas de logueo y registro

router.post('/login', authController.signIn);
router.post('/register', authController.signUp);

//un check

router.get('/', (req, res) => {
    res.send('check my love for the authorizations')
});

module.exports = router;