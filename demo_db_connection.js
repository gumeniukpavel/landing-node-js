var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "dfgstudio2020",
    database: 'dfg'
});


module.exports = con;
