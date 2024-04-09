const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [11]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6] 
        }
    }
});

module.exports = User;




































// const pool = require('../config/db');

// const User = {};

// User.createUser = (user, callback)=>{ 

//     pool.query("INSERT INTO users SET ?", user, (err, result)=>{
//         if(err){
//             return callback(err);
//         }
//         return callback(null, result);
//     })

// };


// User.getUserByEmail = (email, callback)=>{
//     pool.query(`SELECT * FROM users WHERE email=?`, email, (err, result)=>{
//         if(err){
//             return callback(err);
//         }  
//         return  callback(null, result[0]);
//     })
// }


// User.getUserByID = async(id)=>{

//     return new Promise((resolve, reject)=>{
//         pool.query(`SELECT * FROM users WHERE id=?`, id, (err, result)=>{
//             if(err){
//                 return reject(err);
//             }
//             return resolve(result[0]);
//         })
//     })
// }

// User.editPersonalInfo = async(userId, updatedUserInfo) => {
//     return new Promise((resolve, reject) => {

//         // Construct the SQL UPDATE query
//         const sql = `UPDATE users SET ? WHERE id = ?`;
        
//         // Execute the query
//         pool.query(sql, [updatedUserInfo, userId], (err, result) => {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve(result);
//         });
//     });
// };



// module.exports = User;