const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');


const UserSocial = sequelize.define('UserSocial', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, 
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    facebook:{
        type: DataTypes.STRING,
        allowNull: true
    },
    twitter:{
        type: DataTypes.STRING,
        allowNull: true
    },
    linkedin:{
        type: DataTypes.STRING,
        allowNull: true
    },
    instagram:{
        type: DataTypes.STRING,
        allowNull: true
    },
    github:{
        type: DataTypes.STRING,
        allowNull: true
    }

})


User.hasOne(UserSocial, {foreignKey: 'userId'});
UserSocial.belongsTo(User, {foreignKey: 'userId'});

module.exports = UserSocial;