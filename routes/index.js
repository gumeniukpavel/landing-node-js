var express = require('express');
var router = express.Router();
var con = require("../demo_db_connection");



/* GET home page. */
router.get('/', async function (req, res, next) {

  var advantage = await (new Promise((resolve, reject) => {
    con.query(`select * from advantage`, function (error, result) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  }));

  var technology = await (new Promise((resolve, reject) => {
    con.query(`select * from technology`, function (error, result) {
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

  res.render('index', {title: 'DFG Studio', advantage: advantage,  portfolio: portfolio, technology: technology});
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
  res.render('portfolio', { title: portfolioData.title + ' - DFG Studio','portfolioData': portfolioData, portfolioSectOne: portfolioSectOne, portfolioSectTwo: portfolioSectTwo, portfolioSectThree: portfolioSectThree });
});


router.post('/form', function (req, res) {
  var data = req.body;
  con.query(`insert into messages (username, surname, subject, email, message)
                  values ('${data.username}', '${data.surname}', '${data.subject}', '${data.email}', '${data.message}')`);

  res.redirect('/');
});



router.get('*', function (req, res, next) {
  res.send('not found', 404);
});
module.exports = router;

