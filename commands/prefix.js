module.exports = {
    name: "prefix",
    execute(message, args) {
        if (!message.member.permissions.has("MANAGE_GUILD")) {
            message.channel.send("You must have the \"MANAGE_GUILD\" permission to use this command.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (!args[0]) {
            message.channel.send("Please specify a prefix.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        const db = require("quick.db");
        if (args[0] == db.get(`guild_${message.guild.id}_prefix`)) {
            message.channel.send("This is already the current prefix.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            if (args[0] == "-") {
                db.delete(`guild_${message.guild.id}_prefix`);
            };
            db.set(`guild_${message.guild.id}_prefix`, args[0])
            const { prefix } = require("../index");
            message.channel.send(`Prefix changed from \`${prefix}\` to \`${args[0]}\``)
                    .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("✅");
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
