const rateLimit = require ('express-rate-limit');
const jwt = require ('jsonwebtoken');


//Rate limit
const limiter = rateLimit({
    windowMs: 60 * 60 * 100,
    max: 5
});


