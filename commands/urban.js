module.exports = {
    name: "urban",
    async execute(message, args) {
        if (!args[0]) {
            message.channel.send("Please type a word or phrase to search.")
                .then(msg => msg.delete({ timeout: 5000 }));
            return message.react("❌");
        };
        try {
            const urbansearch = args.slice(0).join(" ");
            const urban = require("urban");
            const urbanresult = urban(urbansearch);
            urbanresult.first(function(json) {
                if (!json) {
                    message.channel.send("I looked far and wide, couldn't find anything I'm afraid.")
                        .then(msg => msg.delete({ timeout: 5000 }));
                    return message.react("❌");
                };
                message.channel.send(`Top definition for **${urbansearch}**:\n\n${json.definition}`);
                return message.react("✅");
            });
            return;
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
