const { DateTime } = require("luxon");
const asyncHandler = require("express-async-handler");
const testModel = require('../models/testModel')
const bcrypt = require("bcrypt");
const { mysqlConfig } = require("../databases/mysql/mysqlConnect");
const UserSql = require('../models/userMysqlModel')

//@desc firstTest Test
//@route GET /api/test/firstTest
//@access public
const firstTest = (req, res) => {

    res.status(200).json({ message: "first Test" })
}

//@desc errorTest Test
//@route GET /api/test/errorTest
//@access public
const errorTest = (req, res) => {

    res.status(400);
    throw new Error("test Error");
}

//@desc postTestMongodb Test
//@route POST /api/test/mongodbTest
//@access public
const postTestMongodb = asyncHandler(async (req, res) => {
    const { testName, testContent, testResult } = req.body;
    const time = String(
        DateTime.now().setZone("Asia/Ho_Chi_Minh").toFormat("yyyy-MM-dd HH:mm:ss")
    );
    if (testName && testContent && testResult) {
        const result = await testModel.create({
            testName,
            testContent,
            testResult,
            time
        })
        res.status(200).json({
            message: `post success!!! id: ${result._id}`
        })
    } else {
        res.status(400);
        throw new Error('testName, testContent, testResult need to be filled');
    }
})

//@desc bcryptTest Test
//@route POST /api/test/bcryptTest
//@access public
const bcryptTest = asyncHandler(async (req, res) => {
    const { text } = req.body;
    if (text) {
        const hashedText = await bcrypt.hash(text, 10);
        // console.log(hashedText);

        res.status(200).json({
            result: `${text} after using bcrypt: ${hashedText}`
        });
    } else {
        res.status(400);
        throw new Error("text field nessesary!")
    }

})

//@desc mysql Test
//@route GET /api/test/mysqlTest
//@access public
const getAllSqlTest = asyncHandler(async (req, res) => {
    // const script = "SELECT * FROM user";
    const script = `
        SELECT T.transaction_id, P.product_name, P.price, T.quantity, P.price * T.quantity AS ThanhTien, (
            SELECT SUM(P2.price * T2.quantity)
            FROM product AS P2
            JOIN transaction AS T2 ON P2.product_id = T2.product_id
            WHERE T2.transaction_id = T.transaction_id
        ) AS TongGiaTien
        FROM 
            product AS P
        JOIN 
            transaction AS T 
        ON 
            P.product_id = T.product_id
        WHERE 
            T.transaction_id = "sdf45erfdg";
    `
    mysqlConfig.query(script, (err, result) => {
        if (err) {
            res.status(404);
            throw new Error('Not Found Data!');
        }
        res.status(200).send(result);
    })
})

//@desc mysql Test
//@route POST /api/test/mysqlTest
//@access public
const postUserSql = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    // const script = `
    //     insert into user(email,_password,_username)
    //     values("${email}","${password}","${username}")
    // `

    // if (!email || !username || !password) {
    //     res.status(400);
    //     throw new Error('need fill email,password,username');
    // }

    // mysqlConfig.query(script, (err, result) => {
    //     if (err) {
    //         res.status(404);
    //         throw new Error('Not Found Data!');
    //     }
    //     res.status(200).json({
    //         message: "Post User successfull"
    //     });
    // })

    try {
        await UserSql.create({
            username: username,
            email: email,
            password: password,
        });
        res.status(200).json({
            mesage: "New user created"
        })
    } catch (error) {
        res.status(400)
        throw new Error("can't create User")
    }



})




module.exports = { firstTest, errorTest, postTestMongodb, bcryptTest, getAllSqlTest, postUserSql }