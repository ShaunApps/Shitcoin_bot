require('dotenv').config();
const request = require('request');
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = process.env.TOKEN || "telegram token";
const bot = new TelegramBot(TOKEN, {polling: true});


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const message1 = "Hi! I'm a Shitcoin bot, and I exist to provide you information on certain shitcoins/cryptocurrencies";
  const message2 = "Enter /price followed by a shitcoin name and I will post the current USD value listed on Coinmarketcap";

  bot.sendMessage(chatId, message2);
  bot.sendMessage(chatId, message1);
})


bot.onText(/\/price (.+)/, (msg, match) => {

  const chatId = msg.chat.id;
  const name = match[1];
  const url = "https://api.coinmarketcap.com/v1/ticker/" + name.toLowerCase();
  let data;
  let message;

  request(url, function(error, response, body) {
    if (!error) {
      data = JSON.parse(body)[0].price_usd;
      message = `The current price of ${name} is: $${data}`;
      bot.sendMessage(chatId, message).catch((error) => {
        console.log(error.code);
        console.log(error.response.body);
      });;
    }
  })

})


// Listen for any kind of message. There are different kinds of
// messages. Test to ensure bot is receiving messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
