var express = require('express');
var router = express.Router();
var con = require("../demo_db_connection");



/* GET home page. */
router.get('/', function (req, res, next) {

  con.query(`select * from section_one `, function (error, result) {
    if (error) throw error;
    var sectionOne = result;

    con.query(`select * from tabs `, function (error, result) {

      if (error) throw error;
      var tabs = result;
      res.render('index', {title: 'Home', sectionOne: sectionOne, tabs: tabs});
    });
  });
});


router.get('/portfolio/:code', function (req, res, next) {
  var code =  req.params.code;
  con.query(`select * from portfolio where urlcode = '${code}' limit 1`, function (error, result) {
    if (error) throw error;
    if(result.length>0){
      var portfolioData = result[0];
      con.query(`select * from portfolio_sect_one where portfolio_id  = ${portfolioData.id}`, function (error, result) {
        var sectionOne = result[0];
        res.render('portfolio', { title: 'Portfolio' ,sectionOne: sectionOne });
      });
    }
    else {
      res.send('not found', 404);
    }
  });
 console.log(req.params.portfolioName);


});


router.post('/form', function (req, res) {
  var data = req.body;
  con.connect(function (err) {
    if (err) throw err;
    con.query(`insert into messages (username, surname, subject, email, message)
                    values ('${data.username}', '${data.surname}', '${data.subject}', '${data.email}', '${data.message}')`);
  });
  res.redirect('/');
});



router.get('*', function (req, res, next) {
  res.send('not found', 404);
});
module.exports = router;

