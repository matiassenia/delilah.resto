const rateLimit = require ('express-rate-limit');
const jwt = require ('jsonwebtoken');
require('dotenv').config();
const KEY = process.env.LLAVE

//Rate limit
const limiter = rateLimit ({
    windowMs: 60 * 60 * 100,
    max: 5
});


const ValidarAdmin = async (req, res, next) => {
    const token = req.headers["authorization"]; 
        if (!token) {
            return res.status(401).json({msg: "usuario noo valido"})
            }
        const jwtClient = token.split(" ")[1];
        try{
            jwt.verify(jwtClient, KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json ({msg:"Token invalido"})
                    console.log("ha ocurrido un error con la validacion del token");
                }
                if (decoded && decoded.id_role !== 2){
                    return res.status(401).json({msg: "Es usuario invalido para ejecutar este tipo de acción"})
                }
                next();
                console.log(decoded)
            });
        } catch (e) {
            console.log("error:" + error);
            res.status(401).json({msg: 'Proporciona un token por favor'})
        }
}


const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"]; 
        if (!token) {
            return res.status(401).json({msg: "usuario no valido"})
            }
        const jwtClient = token.split(" ")[1];
        try{
            jwt.verify(jwtClient, KEY, (err, decoded) => {
                if (err) {
                    return res.status(401).json ({msg:"Token invalido"})
                    console.log("ha ocurrido un error con la validacion del token");
                }
                next();
                console.log(decoded)
            });
        } catch (e) {
            console.log("error:" + error);
            res.status(401).json({msg: 'Proporciona un token por favor'})
        }
}


exports.ValidarAdmin = ValidarAdmin;
exports.verifyToken = verifyToken;



