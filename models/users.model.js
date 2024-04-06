const pool = require('../config/db');

const User = {};

User.createUser = (user, callback)=>{ 

    pool.query("INSERT INTO users SET ?", user, (err, result)=>{
        if(err){
            return callback(err);
        }
        return callback(null, result);
    })

};


User.getUserByEmail = (email, callback)=>{
    pool.query(`SELECT * FROM users WHERE email=?`, email, (err, result)=>{
        if(err){
            return callback(err);
        }  
        return  callback(null, result[0]);
    })
}






module.exports = User;