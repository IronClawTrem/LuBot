module.exports = {
    name: "leaderboard",
    execute(message) {
        const { isRankOn } = require("../index");
        if (isRankOn == false) {
            message.channel.send("Ranking is disabled.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            const db = require("quick.db");
            const ranks = db
                .all()
                .filter(i => i.ID.startsWith(`guild_${message.guild.id}_xptotal_`))
                .sort((a, b) => b.data - a.data);
            var i = 0;
            const members = ranks.map(ranks => message.guild.members.cache.get(ranks.ID.substr(33))).slice(0, 10);
            const usernames = members.map(members => members.user.username);
            message.channel.send(`${usernames.map(usernames => `${++i}) ${usernames}`).join("\n")}`);
            return message.react("✅");
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
