
const Sequelize = require('sequelize');
const path = 'mysql://matias:qwerty1234@localhost:3306/Delilah_resto'; //Ruta de conexión
const sequelize = new Sequelize(path, { //objeto sequelize
    logging: true
});  

sequelize.authenticate().then(() => { //promesa de autenticación
    console.log('Conectado.');
}).catch(err => {
    console.error('Error de conexion:', err);
});

module.exports = sequelize;