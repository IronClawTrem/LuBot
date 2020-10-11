module.exports = {
    name: "queue",
    aliases: ["q"],
    execute(message) {
        const { queue } = require("../index");
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue || !serverQueue.songs[0]) {
            message.channel.send("Nothing is playing.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            var i = 1;
            const songs = serverQueue.songs.map(songs => `${songs.title} - \`${songs.requester}\``);
            const songMap = songs.map(songs => `**${i++})** ${songs}`).join("\n");
            const Discord = require("discord.js");
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor("Queue")
                .setDescription(`${songMap}`)
            message.channel.send(embed)
                .then(msg => msg.delete({ timeout: 10000 }));
            return message.react("✅");
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
