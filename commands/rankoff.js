module.exports = {
    name: "rankoff",
    execute(message) {
        if (!message.member.permissions.has("MANAGE_GUILD")) {
            message.channel.send("You must have the \"MANAGE_GUILD\" permission to use this command.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            const { isRankOn } = require("../index");
            if (isRankOn == true) {
                const db = require("quick.db");
                db.delete(`guild_${message.guild.id}_isrankon`);
                message.channel.send("Ranking system disabled.")
                    .then(msg => msg.delete({ timeout: 5000 }));
                return message.react("✅");
            } else {
                message.channel.send("Ranking is already disabled.")
                    .then(msg => msg.delete({ timeout: 5000 }));
                return message.react("❌");
            };
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
