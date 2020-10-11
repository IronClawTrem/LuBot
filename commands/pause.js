module.exports = {
    name: "pause",
    execute(message) {
        const { queue } = require("../index");
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue) {
            message.channel.send("Nothing is playing.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (message.member.voice.channel != message.guild.me.voice.channel) {
            message.channel.send("You must be in my voice channel.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (serverQueue.playing == false) {
            return message.channel.send("Music is already paused.")
                .then(message.react("❌"))
                .then(msg => msg.delete({ timeout: 5000 }));
        }
        try {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            const pembed = require("../embeds/pembed");
            pembed.execute(message);
            return message.react("✅");
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
