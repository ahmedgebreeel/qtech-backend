// const sql = require('mysql');



// const pool = sql.createPool({
//     host: "localhost",
//     user: "root",
//     password: '',
//     database: "qtech"
// });



// module.exports = pool;


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('qtech', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
        
});


module.exports = sequelize;
