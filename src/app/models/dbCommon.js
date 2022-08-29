const mysql = require("mysql");
require('dotenv').config({ path: './src/environment/environment.env' });

var connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    multipleStatements:process.env.MULTIPLE_STATEMENTS
});

module.exports = connection;
