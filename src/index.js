const express = require('express'); 
const helmet = require("helmet");
const dotenv = require("dotenv").config();

const cors = require('cors');
const app = express();
const PORT = 3000;
const sequelize = require('sequelize');


app.use(express.json());
app.use(helmet()); 
app.use(cors());

const userr = require('../router/users');
const productss = require('../router/products');
const orderss = require('../router/orders');
const authorizationss = require('../router/authorizations');

app.use('/user', userr);
app.use('/products', productss);
app.use('/orders', orderss);
app.use('/authorization', authorizationss);






app.listen(PORT, () => {
    console.log('server on port', PORT);
});



app.get('/', (req, res) => {
    res.send('Hello World!')
})