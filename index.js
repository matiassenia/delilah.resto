const express = require('express'); 
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	
})
const cors = require('cors');
const app = express();
const PORT = 4000;
const sequelize = require('sequelize');


app.use(express.json());
app.use(helmet()); 
app.use(cors());



//routes 
const userr = require('./routes/users');
const productss = require('./routes/products');
const orderss = require('./routes/orders');
const authorizationss = require('./routes/authorizations');

app.use('/users', limiter, userr);
app.use('/products', limiter, productss);
app.use('/orders', limiter, orderss);
app.use('/authorization',limiter, authorizationss);






app.listen(PORT, () => {
    console.log('server on port', PORT);
});



app.get('/', (req, res) => {
    res.send('Hello World!')
})