var express = require('express');
var router = express.Router();
var con = require("../demo_db_connection");
const TelegramBot = require('node-telegram-bot-api');
const token = '1158589755:AAE3iN8wYOFi2Vxv-tNmK_YLVdkdzhKy_Y4';
const bot = new TelegramBot(token, {polling: true});
const chatIds = [244203169, 379182131, 279118447];
var messageOptions = {
  parse_mode: "markdown"
};

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if( chatIds.indexOf(chatId) == -1 ){
    bot.sendMessage(chatId, 'Отказано в доступе');
  }else{
    // if( msg.text == '/getAll'){
      // var messages = await (new Promise((resolve, reject) => {
      //   con.query(`select * from messages`, function (error, result) {
      //     if (error) {
      //       reject(error);
      //     }
      //     resolve(result);
      //   });
      // }));
      //
      // var text = 'Все заявки: ';
      //
      // for (let i = 0; i < messages.length; i++) {
      //   if( !messages[i].subject ){
      //     subject = 'Пусто';
      //   }else{
      //     subject = messages[i].subject;
      //   }
      //   text += `
      // *Имя:* ${messages[i].username} *Фамилия:* ${messages[i].surname} *Тема:* ${subject} *E-mail:* ${messages[i].email} *Сообщение:* ${messages[i].message}`
      // }
      //
      // bot.sendMessage(chatId, text, messageOptions);
    // }

    bot.sendMessage(chatId, 'Разрешено в доступе');
  }
});

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

  if( !data.name || !data.surname || !data.email || !data.message ){
    res.send("<p style='font-size: 24px; color: red'>При отправке сообщения возникли ошибки. Заполните поля и попробуйте снова!</p>");
  }else{
    let subject;
    if( !data.subject ){
      subject = 'Пусто';
    }else{
      subject = data.subject;
    }
    for (let i = 0; i < chatIds.length; i++) {
      bot.sendMessage(chatIds[i],
    `*Новая заявка с сайта!*
      *Имя:* ${data.name} 
      *Фамилия:* ${data.surname} 
      *Тема:* ${subject}
      *E-mail:* ${data.email} 
      *Сообщение:* ${data.message}`, messageOptions);
    }
    con.query(`insert into messages (username, surname, subject, email, message)
                  values ('${data.name}', '${data.surname}', '${data.subject}', '${data.email}', '${data.message}')`);

    res.send("<p style='font-size: 24px; color: green'>Сообщение успешно отправлено</p>");
  }
});



router.get('*', function (req, res, next) {
  res.send('not found', 404);
});
module.exports = router;

