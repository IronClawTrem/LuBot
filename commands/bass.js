module.exports = {
    name: "bass",
    execute(message, args) {
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
        if (!args[0]) {
            message.channel.send(`Current bass output gain: ${serverQueue.bass}dB`)
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("✅");
        };
        if (args[0].toLowerCase() == "off") {
            args[0] = 0;
        };
        if (args[0] < 0 || isNaN(args[0]) || args[0] > 100) {
            message.channel.send("Invalid input, integers / decimals from 0 to 100 accepted.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            const dispatcher = serverQueue.connection.dispatcher;
            serverQueue.curtime += dispatcher.streamTime;
            serverQueue.seek = serverQueue.curtime;
            serverQueue.bass = args[0];
            serverQueue.filterCmd = true;
            dispatcher.end();
            return message.react("✅");
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
