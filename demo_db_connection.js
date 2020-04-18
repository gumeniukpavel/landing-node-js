var mysql = require('mysql');

var con = mysql.createConnection({
    host: "185.233.119.13",
    user: "root",
    password: "rootroot"
});


module.exports = con;
