var express = require('express');
var router = express.Router();
var con = require("../demo_db_connection");



/* GET home page. */
router.get('/', function(req, res, next) {
<<<<<<< HEAD
  res.render('index', { title: 'Home' });
=======

  res.render('index', { title: 'Express' });
>>>>>>> fca66e36d94c9542c5a6cfe41c924122573e10b7
});

router.post('/form', function(req, res) {
  var data = req.body;
  con.connect(function(err) {
    if (err) throw err;
    con.query(`insert into sys.messages (username, surname, subject, email, message) 
                    values ('${data.username}', '${data.surname}', '${data.subject}', '${data.email}', '${data.message}')`);
  });

 res.redirect('/');
});

router.get('*', function(req, res, next) {

  res.send('not found', 404);
});
module.exports = router;

