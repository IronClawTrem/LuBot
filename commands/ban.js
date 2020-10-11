module.exports = {
    name: "ban",
    execute(message, args) {
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
            message.channel.send("I must have the \"BAN_MEMBERS\" permission to use this command.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            message.channel.send("You must have the \"BAN_MEMBERS\" permission to use this command.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (!args[0] || !message.mentions.members.first()) {
            message.channel.send("Please specify a valid member to ban.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (message.mentions.members.first().roles.highest.position >= message.member.roles.highest.position && message.author.id != message.guild.owner.id) {
            message.channel.send("You don't have permission to ban this member.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (message.mentions.members.first().id == message.author.id) {
            message.channel.send("You cannot ban yourself.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            const reason = args.slice(2).join(" ");
            if (message.mentions.members.first().bannable) {
                message.mentions.members.first().ban({ reason: `${reason}` });
                message.channel.send(`<@${message.author.id}> has successfully banned <@${message.mentions.members.first().id}>`)
                    .then(msg => msg.delete({ timeout: 5000 }));
                return message.react("✅");
            } else {
                message.channel.send("I cannot ban this member, please drag my role to the top of the roles list.")
                    .then(msg => msg.delete({ timeout: 5000 }));
                return message.react("❌");
            };
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
