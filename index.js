//основні компоненти що поставляються діскордом
const Discord = require("discord.js");
const bot = new Discord.Client();

const fs = require("fs");
//секретний ключ
const token = require("./token.json");
//символ команди
const character ="$";
//данні користувачів
const users_path = "./date/users.json";
const users = require(users_path);
//База класів
const classes = require("./date/classes.json");
//База предметів
const items = require("./date/items.json");

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
  //перевіряємо реєстрацію
  let reg = users[user.id]?true:false;
  if(reg){
    player = users[user.id]
  }
  //визначаємо де будемо спілкуватись (на каналі чи в приватних повідомленнях)
  let targetSend = message.guild?message.channel:user;
  //перевіряємо чи повідомлення є командою(прямою взаємодією з ботом)
  if(message.content.startsWith(character)){
    //видаляємо симовол команди
    let command = message.content.toLowerCase().substr(1);

    console.log("Read command "+character+command);
    switch (command) {

      case "start":
        console.log("start command");
        targetSend.send("Команда початку гри");

        break;
      case "reg":
      case "registration":
        console.log("reg command");
        if(reg){
          targetSend.send("Ви вже зареєстровані в гільдії");
        }else{
          targetSend.send("Оберіть один з доступуних класів");
          targetSend.send("Класс маг - "+classes.маг.опис);
          targetSend.send("Класс воїн - "+classes.воїн.опис);
          player={"статус":"реєстрація-1"};
        }
        break;
      case "маг":
      case "воїн":
        if(reg && player.статус === "реєстрація-1"){
            player={"клас":command,"статус":"реєстрація-2"};
            console.log(player);
        }
        break;
      case "info":
      let bicon = bot.user.displayAvatarURL; //бере теперішню аватарку бота
            let info = new Discord.RichEmbed()
            .setDescription("RPG GAME")
            .setColor("#15f153")
            .setThumbnail(bicon)
            .addField("Cyber Spells", bot.user.username)
            .addField("Create On", bot.user.createdAt);
            return message.channel.send(info);
            break;
        break;
      default:
        targetSend.send("Команда не знайдена")
    }
    console.log("Sacsec finish");
    users[user.id]=player
    fs.writeFile(users_path, JSON.stringify(users), (err) => {
        if (err) console.error(err)
    });
  }
});
