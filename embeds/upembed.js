module.exports = {
    execute(message) {
        try {
            const { queue } = require("../index");
            const serverQueue = queue.get(message.guild.id);
            const Discord = require("discord.js");
            const upembed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor("Unpaused")
                .setTitle(`${serverQueue.songs[0].title}`)
                .setImage(`${serverQueue.songs[0].thumbnail}`);
            return message.channel.send(upembed)
                .then(msg => msg.delete({ timeout: 5000 }));
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
