var express = require('express');
var router = express.Router();
var con = require("../demo_db_connection");



/* GET home page. */
router.get('/', async function (req, res, next) {

  var tabs = await (new Promise((resolve, reject) => {
    con.query(`select * from tabs`, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  }));

  var sectionOne = await (new Promise((resolve, reject) => {
    con.query(`select * from section_one`, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  }));

  var portfolio = await (new Promise((resolve, reject) => {
    con.query(`select * from portfolio`, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  }));
  console.log(portfolio);
  res.render('index', {title: 'Home', sectionOne: sectionOne, tabs: tabs, portfolio: portfolio});
});


router.get('/portfolio/:code', async function (req, res, next) {
  var code =  req.params.code;
  var portfolioData = await (new Promise((resolve, reject) => {
    con.query(`select * from portfolio where urlcode = '${code}' limit 1`, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  }));

  if (portfolioData.length == 0){
    res.send('not found', 404);
  }else {
    portfolioData = portfolioData[0];
  }


  var portfolioSectOne = await (new Promise((resolve, reject) => {
    con.query(`select * from portfolio_sect_one where portfolio_id  = ${portfolioData.id}`, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result[0]);
    });
  }));

  var portfolioSectTwo = await (new Promise((resolve, reject) => {
    con.query(`select * from portfolio_sect_two where portfolio_id  = ${portfolioData.id}`, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result[0]);
    });
  }));

  var portfolioSectThree = await (new Promise((resolve, reject) => {
    con.query(`select * from portfolio_sect_three where portfolio_id  = ${portfolioData.id}`, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result[0]);
    });
  }));

  portfolioSectTwo.items = portfolioSectTwo.items.split(',');
  res.render('portfolio', { title: 'Portfolio','portfolioData': portfolioData, portfolioSectOne: portfolioSectOne, portfolioSectTwo: portfolioSectTwo, portfolioSectThree: portfolioSectThree });


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

