const express = require('express');
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const router = express.Router();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(helmet()); 






app.listen(3000, () => {
    console.log('server on port', PORT);
});



app.get('/', (req, res) => {
    res.send('Hello World!')
})