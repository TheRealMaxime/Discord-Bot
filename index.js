const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const fs = require('fs');
const { time } = require("console");
const ms = require('ms')

const Client = new Discord.Client({disableEveryone: true});

const prefix = "?";

Client.on("ready", () =>{
    console.log("bot working");
});

Client.on("ready", async () =>{
  Client.user.setActivity("?help", {type: "WATCHING"});
});

            

Client.on("guildMemberAdd", member => {
member.guild.channels.cache.find(channel => channel.id === "714799288974180407").send("**__" + member.displayName + "__** A rejoin le serveur, nous sommes maintenant:** " + member.guild.memberCount + "** Lisez les règles avant de continuer");
});
  


Client.on("message", message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  if(message.member.hasPermission("BAN_MEMBERS")){
    if(message.content.startsWith(prefix + "ban")){
      let mention = message.mentions.members.first();

      if(mention == undefined){
        message.reply(" Member undefined. Please mention a member!");
      }
      else {
        if(mention.bannable){
      mention.ban();
      message.channel.send(mention.displayName + " successful banned");
        }
        else {
      message.reply(" Impossible to ban the member");
        }
      }
    }
        else if(message.content.startsWith(prefix + "mute")){
          let mention = message.mentions.members.first();

          if(mention == undefined){
            message.reply("Member undefined. Please mention a member!");
          }
          else {
            mention.roles.add("796468265743679528");
            message.reply(mention.displayName + " successful muted");
        }
      }
      else if(message.content.startsWith(prefix + " unmute")){
        let mention = message.mentions.members.first();

        if(mention == undefined){
          message.reply("Member undefined. Please mention a member!");
        }
        else {
          mention.roles.remove("796468265743679528");
          message.reply(mention.displayName + " successful unmuted");
        }
      }
       }
});


Client.on("message", message => {
if(message.content == prefix + "id")
message.reply("Your ID is:**__\n" + message.author.id + "__**")
});

Client.on("message", message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;

  if(message.member.hasPermission("KICK_MEMBERS")){
    if(message.content.startsWith(prefix + "kick")){
      let mention = message.mentions.members.first();

      if(mention == undefined){
        message.reply(" Member undefined. Please mention a member!");
      }
      else {
        if(mention.kickable){
      mention.kick();
      message.channel.send(mention.displayName + " successful kicked");
        }
        else {
      message.reply(" Impossible to kick the member");
        }
      }
    }
  }
});

Client.on("message", message => {
  if(message.member.permissions.has("MANAGE_MESSAGES")){
    if(message.content.startsWith(prefix + "clear")){
      let args = message.content.split(" ");

      if(args[1] == undefined){
        message.reply(" Please enter the number of message than you want to delete");
      }
      else {
        let number = parseInt(args[1]);

        if(isNaN(number)){
          message.reply(" Please enter the number of message than you want to delete");
        }
        else {
          message.channel.bulkDelete(number).then(messages => {
            console.log(messages.size + " messages deleted!");
          }).catch(err => {
            console.log(" Clear error: " + err);
          });
        }
      }
    }
  }
});

Client.on("message", message => {
  if(message.author.bot) return;
  if(message.content.startsWith(prefix + "help")){
    let args = message.content.split(" ");

var embed = new Discord.MessageEmbed()
.setColor("#FE5258")
.setTitle("About us")
.setDescription("Hey! I'm the assistant of Koda! I'm here for help you. If you have some question feel free to contact the owner of this bot [@maxime.exe#0001] or join our server support: https://discord.gg/Q3E2fUx7cG")
.setURL("https://discord.gg/Q3E2fUx7cG")
message.channel.send(embed)
  }
});

Client.on("message", message => {
  if(message.author.bot) return;
  if(message.content.startsWith(prefix + "help")){
    let args = message.content.split(" ");

var embed = new Discord.MessageEmbed()
.setColor("#FE5258")
.setTitle("Help")


.setDescription(" The command for use me are: \n\n ?help for asking help \n\n ?ban for ban a user (only for Staff)\n\n?kick for kick a user(only for staff)\n\n?clear for clearing the number of message of your choice (ex: ?clear 10) You musn't clear message other 100\n\n?id for know your id\n\n?info for know all your info\n\n?giveaway for creating an giveaway (info for run this command you must type for exemple: ?giveaway 1d #announcement a nitro <= With the 1 in front and the ('d'), the bot will count 1 day of giveaway. If you want to do a giveaway of 1 minute you do : ?giveaway 1m #channel prize)\n\n?play for playing your music (Not disponible)\n\n?say for doing reapet a thing in the saloon than you want in a beautiful embed(soon)\n\n\n More command soon... \n\n\n The link for the official website: https://koda.zyrosite.com/ ")
.setURL("https://koda.zyrosite.com/")
.setTimestamp()

message.channel.send(embed);
  }
});


Client.on("message", message => {
  if(message.content.startsWith(prefix + "play")){
    if(message.member.voice.channel){
      message.member.voice.channel.join().then(connection => {
        let args = message.content.split(" ");
        
        if(args[1]){
          message.reply("Message of the video of link of the video not mentionned!")
        }
        
        else {
        let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio"}));

        dispatcher.on("finish", () => {
          dispatcher.destroy();
          connection.disconnect();
        });

        dispatcher.on("error ", err =>{
          console.log("dispatchor error : " +  err);
        });
        }
      }).catch(err => {
        message.reply("Erreur when connecting : " + err);
      });
    }
    else {
      message.reply("You are not connected to a vocal channel!");
    }
  }
});

function Savebdd() {
  fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
    if (err) console.log("Error when saving.");
  });
}

Client.on("message", message => {
  if(message.content.startsWith("?mb")){
    message.delete()
    if(message.member.permissions.has("MANAGE_MESSAGES")){
      if(message.content.length > 5){
        message_welcome = message.content.slice(4)
        console.log(message_welcome)
        bdd["message_welcome"] = message_welcome
        Savebdd()
      }
    }
  }
});


Client.on("message", message => {
  if (message.content.startsWith("?info")) {
    if(message.mentions.users.first()) {
        user = message.mentions.users.first();
   } else{
        user = message.author;
    }
    const member = message.guild.member(user);

    const embed = new Discord.MessageEmbed() 
    .setColor('#ff5555')
    .setThumbnail(user.avatarURL)
    .setTitle(`Info about request :`)
    .addField('Pseudo :', `${member.nickname ? member.nickname : member.displayName}`, true)
    .setImage(message.author.displayAvatarURL({dynamic:true}))
    .addField('Status:', `online`, true)
    .addField('Playing :', `${user.presence.game ?user.presence.game.name : (" ")}`, true)
    .addField('\n\nRoles :', member.roles.cache.map(roles => `${roles.name}`), true)
    .addField(`Answering :`,`${message.author.username}#${message.author.discriminator}`)
message.channel.send(embed);
  }
});

Client.on('message', async message => {
  let args = message.content.substring(prefix.length).split(" ")
  if(message.member.permissions.has('ADMINISTRATOR')){
  if (message.content.startsWith(`${prefix}giveaway`)) {
      let time = args[1]
      if (!time) return message.channel.send('You did not specify a time!');

      if (
          !args[1].endsWith("d") &&
          !args[1].endsWith("h") &&
          !args[1].endsWith("m") &&
          !args[1].endsWith("s") 
      )
          return message.channel.send('You need to use d (days), h (hours), m (minutes), or s (seconds)')

          let gchannel = message.mentions.channels.first();
          if (!gchannel) return message.channel.send("I can't find that channel in the server!")

          let prize = args.slice(3).join(" ")
          if (!prize) return message.channel.send('Arguement missing. What is the prize?')

          message.delete()
          gchannel.send(":tada: **NEW GIVEAWAY** :tada:")
          let gembed = new Discord.MessageEmbed()
              .setTitle("New Giveaway!")
              .setDescription(`React with :tada: to enter the giveaway!\nHosted By: **${message.author}**\nTime: **${time}**\nPrize: **${prize}**`)
              .setTimestamp(Date.now + ms(args[1]))
              .setColor(3447003)
          let n = await gchannel.send(gembed)
          n.react("🎉")
          setTimeout(() => {
              if(n.reactions.cache.get("🎉").count <= 1) {
                  return message.channel.send("Not enough people for me to draw a winner!")
              }

              let winner = n.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).random();
              gchannel.send(`Congratulations ${winner}! You just won the **${prize}**!`
              );
          }, ms(args[1]));
  }
}
})

Client.login('process.env.TOKEN');
