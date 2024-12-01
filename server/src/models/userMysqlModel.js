const { DataTypes } = require('sequelize');
const { sequelize } = require('../databases/mysql/mysqlConnect');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Kiểm tra định dạng email
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Tự động thêm `createdAt` và `updatedAt`
    tableName: 'users', // Tên bảng trong cơ sở dữ liệu
});

module.exports = User;
