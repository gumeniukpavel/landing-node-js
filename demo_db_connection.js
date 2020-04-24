var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'dfg-studio.com',
    port : 3306,
    user: "root",
    password: "root",
    database: 'landing'
});


module.exports = con;
