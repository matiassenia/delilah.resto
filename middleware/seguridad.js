const rateLimit = require ('express-rate-limit');
const jwt = require ('jsonwebtoken');
require('dotenv').config();

//Rate limit
const limiter = rateLimit ({
    windowMs: 60 * 60 * 100,
    max: 5
});

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    
    try{
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) =>{
            if(err){
                console.log("ah ocurrido un error con la validacion del token");
                return res.status(401).json({msg:"Token invalidooo"})
            }
        }) 
        next()
    } catch (err) {
        console.log("error:" + error);
        res.status(401).json({msg: 'Proporciona un token por favor'})
    }
}
//validate admin
const ValidarAdmin = async (req, res, next) => {
    const token = req.headers['authorization']; 
        if (!token) {
            return res.status(401).json({msg: "usuario noo valido"})
            }
        const jwtClient = token.split(" ")[1];
        try{
            jwt.verify(jwtClient, process.env.SECRET_TOKEN, (err, decoded) => {
                if (err) {
                    console.log("ha ocurrido un error con la validacion del token administrador");
                    return res.status(401).json ({msg:"Token admin invalido"})
                }
                if (decoded && decoded.id_role !== 2){
                    return res.status(403).json({msg: "Es usuario invalido para ejecutar este tipo de acción"})
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



