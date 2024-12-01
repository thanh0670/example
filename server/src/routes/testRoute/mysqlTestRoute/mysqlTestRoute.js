const express = require("express");
const { getAllSqlTest, postUserSql } = require("../../../controllers/testController");

const router = express.Router();


router.route('/mysqlTest').get(getAllSqlTest).post(postUserSql);




module.exports = router;