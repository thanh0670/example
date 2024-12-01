// const mysql = require('mysql');
const { Sequelize, Datatypes } = require('sequelize');
const { mysqlConfig } = require('../../configs/mysqlConfig');




// config ket noi truc
// const mysqlConfig = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "123456",
//     database: "example",
//     port: "3306"
// });

// config ket noi gian tiep thong qua sequelize

const sequelize = new Sequelize(
    mysqlConfig.DB,
    mysqlConfig.USER,
    mysqlConfig.PASSWORD,
    {
        host: mysqlConfig.HOST,
        dialect: mysqlConfig.DIALECT,
        logging: false,
        pool: {
            max: mysqlConfig.POOL.max,
            min: mysqlConfig.POOL.min,
            accquire: mysqlConfig.POOL.accquire,
            idle: mysqlConfig.POOL.idle
        }

    }
)

// ket noi gian tiep thong qua sequelize

const sequelizeConnect = () => {
    sequelize.authenticate()
        .then(() => {
            console.log("mysql connected!");
        })
        .catch(err => {
            console.log(err);
        })
}

const sequelizeSync = async () => {
    try {
        await sequelize.sync({ force: false }); // Đồng bộ tất cả model, không xóa dữ liệu cũ
        console.log("Database & tables synced!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
}

// ket noi truc tiep sql
// const mysqlConnect = () => {
//     mysqlConfig.connect(function (err) {
//         if (err) throw err;
//         console.log("Mysql Connected!!!")
//     });
// }



module.exports = { sequelizeConnect, sequelize, sequelizeSync };

