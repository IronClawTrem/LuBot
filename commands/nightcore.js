module.exports = {
    name: "nightcore",
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
        try {
            const dispatcher = serverQueue.connection.dispatcher;
            if (serverQueue.nightcore == false) {
                serverQueue.nightcore = true;
                serverQueue.curtime += dispatcher.streamTime;
                serverQueue.seek = serverQueue.curtime / 1.1484375;
                serverQueue.curtime = serverQueue.seek;
                serverQueue.asetrate = 55125;
            } else {
                serverQueue.nightcore = false;
                serverQueue.curtime += dispatcher.streamTime;
                serverQueue.seek = serverQueue.curtime * 1.1484375;
                serverQueue.curtime = serverQueue.seek;
                serverQueue.asetrate = 48000;
            };
            serverQueue.filterCmd = true;
            dispatcher.end();
            return message.react("✅");
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
