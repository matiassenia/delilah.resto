const express = require('express');
const router = express.Router();
const authController = require("../controllers/authorizations.controllers")

router.post('login', authController.signIn);
router.post('register', authController.signUp);

router.get('/', (req, res) => {
    res.send('check my love for the authorizations')
});

module.exports = router;