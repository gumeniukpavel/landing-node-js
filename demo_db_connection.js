var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1111",
    database: 'landing'
});


module.exports = con;
