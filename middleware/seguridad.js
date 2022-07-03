const rateLimit = require ('express-rate-limit');
const jwt = require ('jsonwebtoken');
require('dotenv').config();

//Rate limit
const limiter = rateLimit ({
    windowMs: 60 * 60 * 100,
    max: 5
});


//verificar token

const verifyToken = async (req, res, next) => {
    const authToken = req.headers.authorization.split(" ")[1];
    
    try{
        jwt.verify(authToken, process.env.SECRET_TOKEN, (err, decoded) => {
            if(err){
                console.log("Ah ocurrido un error con la validacion del token");
                return res.status(401).json({msg:"Acceso denegado"})
            }
        }) 
        next();
    } catch (err) {
        console.log("error:" + error);
        res.status(401).json({msg: 'Proporciona un token por favor'})
    }
}
//validar admin

const validarAdmin = async (req, res, next) =>{
    const token = req.headers.authorization.split(" ")[1];
    try {
        jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
            if(err){
                console.log("Ah ocurrido un error con la validacion del token");
                return res.status(401).json({msg: "Token invalido"})
            }
            if(decoded && decoded.tipo_de_usuario !== 2){
                return res.status(403).json({message: 'Para esta acción debes ser usuario de tipo administrador'})
            }
            next();
        })
    } catch (error) {
        console.log("error:" + error);
        res.status(401).json({ msg: 'Proporciona un token por favor' });
    }

    
}



exports.validarAdmin = validarAdmin;
exports.verifyToken = verifyToken;
exports.limiter = limiter



