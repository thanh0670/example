const mysql = require('mysql');
const { Sequelize, Datatypes } = require('sequelize');





const mysqlConfig = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "example",
    port: "3306"
});

const sequelize = new Sequelize(
    "example",
    "root",
    "123456",
    {
        host: "localhost",
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            accquire: 30000,
            idle: 10000
        }

    }
)

const sequelizeConnect = () => {
    sequelize.authenticate()
        .then(() => {
            console.log("mysql connected!");
        })
        .catch(err => {
            console.log(err);
        })
}


const mysqlConnect = () => {
    mysqlConfig.connect(function (err) {
        if (err) throw err;
        console.log("Mysql Connected!!!")
    });
}


module.exports = { mysqlConfig, mysqlConnect, sequelizeConnect, sequelize };

