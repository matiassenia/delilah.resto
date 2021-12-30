const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('check my love for the orders')
});

module.exports = router;