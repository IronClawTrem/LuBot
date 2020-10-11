const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const queue = new Map();
module.exports.queue = queue;
const db = require("quick.db");

const fs = require("fs");
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

client.on("message", async message => {
    const prefix = db.get(`guild_${message.guild.id}_prefix`) || "-";
    module.exports.prefix = prefix;
    const isRankOn = db.get(`guild_${message.guild.id}_isrankon`) || false;
    module.exports.isRankOn = isRankOn;
    if (isRankOn == true && !message.author.bot && !message.content.startsWith(`${prefix}`)) xp(message);
    if (!message.content.startsWith(`${prefix}`) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    try {
        return command.execute(message, args);
    } catch (error) {
        console.log(error);
        message.channel.send("An unexpected error occured and has been logged for review, please try again. Sorry about that.")
            .then(msg => msg.delete({ timeout: 5000 }));
        return message.react("❌");
    };

    function xp(message) {
        const randomNumber = Math.floor(Math.random() * 10) + 15;
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber);
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber);
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1;
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`);
        var xpNeeded = level * 500;
        if (xpNeeded < xp) {
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1);
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded);
            message.channel.send(`${message.author} has just leveled up to level ${newLevel}`)
                .then(msg => msg.delete({ timeout: 5000 }));
        };
    };
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activity: { name: `tunes! | prefix: ${config.PREFIX}`, type: "LISTENING" } });
});

function setPresence() {
    return client.user.setPresence({ activity: { name: `tunes! | prefix: ${config.PREFIX}`, type: "LISTENING" } });
};
setInterval(setPresence, 43200000);

client.login(`${config.TOKEN}`);
