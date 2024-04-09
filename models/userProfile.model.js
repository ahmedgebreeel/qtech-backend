const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const UserProfile = sequelize.define('UserProfile', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, 
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    fullNameEnglish: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fullNameArabic: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fullAddress: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});


User.hasOne(UserProfile, {foreignKey:'userId'});
UserProfile.belongsTo(User, {foreignKey:'userId'});

module.exports = UserProfile;
