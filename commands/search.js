module.exports = {
    name: "search",
    async execute(message, args) {
        if (message.author.id != "261085323788943360") return;
        const ytsr = require("youtube-sr");
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$0") : "";
        const searchString = args.slice(0).join(" ");
        try {
            if (url.match(/^https?:\/\/www.youtube.com\/playlist(.*)$/)) {
                const id = url.substr(38);
                var playlist = await ytsr.getPlaylist(id);
                for (const videolist of Object.values(playlist.videos)) {
                    const video = await ytsr.searchOne(`https://www.youtube.com/watch?v=${videolist.id}`);
                };
            }
            else if (url.match(/^https?:\/\/youtube.com\/playlist(.*)$/)) {
                const id = url.substr(34);
                var playlist = await ytsr.getPlaylist(id);
                for (const videolist of Object.values(playlist.videos)) {
                    const video = await ytsr.searchOne(`https://www.youtube.com/watch?v=${videolist.id}`);
                };
            }
            else {
                var video = await ytsr.searchOne(searchString);
            };
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
