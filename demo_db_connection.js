var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "dfgstudio2020",
    database: 'dfg',
    charset: "utf8_general_ci"
});


module.exports = con;
