function play(message, guild, song) {
    const { queue } = require("../index");
    const serverQueue = queue.get(guild.id);
    if (!song) {
        try {
            serverQueue.songs = [];
            queue.delete(guild.id);
            return message.guild.me.voice.channel.leave();
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        }
    };
    try {
        const ytdl = require("discord-ytdl-core");
        serverQueue.stream = ytdl(song.url, {
            filter: "audioonly",
            opusEncoded: true,
            highWaterMark: 1<<25,
            encoderArgs: ["-af", `\
aresample=48000,\
asetrate=${serverQueue.asetrate},\
atempo=${serverQueue.speed},\
atrim=start=${serverQueue.seek/1000},\
bass=g=${serverQueue.bass},\
rubberband=pitch=${serverQueue.pitch}`]
        });
        const dispatcher = serverQueue.connection.play(serverQueue.stream, {
            type: "opus"
        }).on("finish", () => {
            serverQueue.stream.destroy();
            if (serverQueue.filterCmd == false) {
                if (!serverQueue.loop) serverQueue.songs.shift();
                serverQueue.curtime = 0;
                serverQueue.seek = 0;
            };
            serverQueue.filterCmd = false;
            play(message, guild, serverQueue.songs[0]);
        }).on("error", (error) => {
            message.channel.send(`${error}`);
            return message.react("❌");
        });
        dispatcher.setVolume(0.25);
        const npembed = require("../embeds/npembed");
        npembed.execute(message);
    } catch (error) {
        message.channel.send(`${error}`);
        return message.react("❌");
    };
};

return module.exports.play = play;
