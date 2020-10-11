module.exports = {
    name: "rankon",
    execute(message) {
        if (!message.member.permissions.has("MANAGE_GUILD")) {
            message.channel.send("You must have the \"MANAGE_GUILD\" permission to use this command.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            const { isRankOn } = require("../index");
            if (isRankOn == false) {
                const db = require("quick.db");
                db.set(`guild_${message.guild.id}_isrankon`, true);
                message.channel.send("Ranking system enabled.")
                    .then(msg => msg.delete({ timeout: 5000 }));
                return message.react("✅");
            } else {
                message.channel.send("Ranking is already enabled.")
                    .then(msg => msg.delete({ timeout: 5000 }));
                return message.react("❌");
            };
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
