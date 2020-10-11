module.exports = {
    name: "clearfilters",
    execute(message) {
        const { queue } = require("../index");
        const serverQueue = queue.get(message.guild.id);
        if (!serverQueue || !serverQueue.songs[0]) {
            message.channel.send("Nothing is playing.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (message.member.voice.channel != message.guild.me.voice.channel) {
            message.channel.send("You must be in my voice channel.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (serverQueue.nightcore == false
                && serverQueue.asetrate == 48000
                && serverQueue.bass == 0
                && serverQueue.speed == 1
                && serverQueue.pitch == 1 ) {
            message.channel.send("Settings are already default.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            const dispatcher = serverQueue.connection.dispatcher;
            serverQueue.curtime += dispatcher.streamTime;
            if (serverQueue.nightcore == true) {
                serverQueue.nightcore = false;
                serverQueue.seek = serverQueue.curtime * 1.1484375;
                serverQueue.curtime = serverQueue.seek;
                serverQueue.asetrate = 48000;
            };
            if (serverQueue.speed != 1) {
                serverQueue.curtime = serverQueue.curtime * serverQueue.speed;
                serverQueue.seek = serverQueue.curtime;
                serverQueue.speed = 1;
            };
            if (serverQueue.bass != 0) {
                serverQueue.seek = serverQueue.curtime;
                serverQueue.bass = 0;
            };
            if (serverQueue.pitch != 1) {
                serverQueue.seek = serverQueue.curtime;
                serverQueue.pitch = 1;
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
