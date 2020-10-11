module.exports = {
    name: "stop",
    execute(message) {
        const { queue } = require("../index");
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue) {
            message.channel.send("Nothing is playing.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (message.guild.me.voice.channel != message.member.voice.channel) {
            message.channel.send("You must be in my voice channel to stop music.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
            return message.channel.send("Music stopped.")
                .then(message.react("✅"))
                .then(msg => msg.delete({ timeout: 5000 }));
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
