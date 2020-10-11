module.exports = {
    name: "clear",
    aliases: ["purge"],
    execute(message, args) {
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
            message.channel.send("I must have the \"MANAGE_MESSAGES\" permission to use this command.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            message.channel.send("You must have the \"MANAGE_MESSAGES\" permission to use this command.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (!args[0]) {
            message.channel.send("Please input a number of messages to clear.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        if (isNaN(args[0]) || parseInt(args[0]) <= 0 || parseInt(args[0]) > 99) {
            message.channel.send("Invalid input, integers from 1 to 99 accepted.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            const deleteAmount = parseInt(args[0]);
            message.channel.bulkDelete(deleteAmount + 1);
            if (deleteAmount == 1) {
                return message.channel.send(`Deleted \`${deleteAmount}\` message.`)
                    .then(msg => msg.delete({ timeout: 5000 }));
            } else {
                return message.channel.send(`Deleted \`${deleteAmount}\` messages.`)
                    .then(msg => msg.delete({ timeout: 5000 }));
            };
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
