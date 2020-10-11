module.exports = {
    name: "rank",
    async execute(message) {
        const { isRankOn } = require("../index");
        if (isRankOn == false) {
            message.channel.send("Ranking is disabled.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            const db = require("quick.db");
            var user = message.mentions.users.first() || message.author;
            var level = db.get(`guild_${message.guild.id}_level_${user.id}`) || 0;
            level = level.toString();
            let xp = db.get(`guild_${message.guild.id}_xp_${user.id}`) || 0;
            var xpNeeded = level * 500 + 500;
            let every = db
                .all()
                .filter(i => i.ID.startsWith(`guild_${message.guild.id}_xptotal_`))
                .sort((a, b) => b.data - a.data);
            var rank = every.map(x => x.ID).indexOf(`guild_${message.guild.id}_xptotal_${user.id}`) + 1;
            rank = rank.toString();
            // var image = await Canvacord.rank({
            //     username: user.username,
            //     discrim: user.discriminator,
            //     status: user.presence.status,
            //     currentXP: xp.toString(),
            //     neededXP: xpNeeded.toString(),
            //     rank,
            //     level,
            //     avatarURL: user.displayAvatarURL({ format: "png" }),
            //     color: "white"
            // });
            // message.channel.send(new Discord.MessageAttachment(image, "rank.png"));
            message.channel.send(`<@${user.id}> is rank ${rank} on the server at level ${level}. (${xp}xp/${xpNeeded}xp)`);
            return message.react("✅");
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
