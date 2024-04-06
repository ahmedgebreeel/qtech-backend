const sql = require('mysql');



const pool = sql.createPool({
    host: "localhost",
    user: "root",
    password: '',
    database: "qtech"
});



module.exports = pool;