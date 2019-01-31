//основні компоненти що поставляються діскордом
const Discord = require("discord.js");
const bot = new Discord.Client();

const fs = require("fs");
//секретний ключ
const token = require("./token.json");
//символ команди
const character ="$";
//данні користувачів
const users = require("./users.json");

//Дія при включені бота(введеня ключа підтвердження)
bot.login(token)
//Відповідь на включення
bot.on("ready", async()=>{
    console.log("Гра починається!");
    console.log(`Я ${bot.user.username} слідкую за ${bot.guilds.size} іграми `);
    console.log(`У мене ${bot.users.size} гравців`);
});
//Відповідь на повідомлення
bot.on("message", message=> {
  //перевіряємо чи автор не бот, щоб не взаємодіяти з ботами та не реагувати на власні повідомлення
  if(message.author.bot) return
  //визначаємо з ким будемо спілкуватись
  let user = message.author;
  //визначаємо де будемо спілкуватись (на каналі чи в приватних повідомленнях)
  let targetSend = message.guild?message.channel:user;
  //перевіряємо чи повідомлення є командою(прямою взаємодією з ботом)
  if(message.content.startsWith(character)){
    //видаляємо симовол команди
    let command = message.content.toLowerCase().substr(1);

    console.log("Read command "+character+command)
    switch (command) {
      case "start":
        console.log("start command")
        targetSend.send("Команда початку гри")

        break;
      case "reg":
      case "registration":
        console.log("reg command")
        if(users[user.id]){
          targetSend.send("Ви вже зареєстровані в гільдії")
        }else{
          targetSend.send("Оберіть один з достпуних класів")
          
        }
        break;
      default:
        targetSend.send("Команда не знайдена")
    }
  }
});
