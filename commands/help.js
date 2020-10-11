module.exports = {
    name: "help",
    execute(message) {
        try {
            message.channel.send("\
**Music Control:**\n\
- play (plays a song via youtube url or search string)\n\
- pause (pauses the currently playing song)\n\
- unpause (unpauses the currently playing song)\n\
- skip (skips to the next song in the queue)\n\
- stop (stops the current song and clears the queue)\n\
- loop (replays the currently playing song after it finishes)\n\
- np (shows the song currently playing)\n\
- queue (shows the current queue)\n\n\
**Audio Filters:**\n\
- nightcore (toggles nightcore mode for the current queue)\n\
- bass (changes the volume of bass frequencies for the current queue)\n\
- speed (changes the playback speed for the current queue)\n\
- pitch (changes the pitch of the audio for the current queue)\n\
- clearfilters (removes all custom playback settings)\n\n\
**Misc:**\n\
- prefix (changes the command prefix)\n\
- clear (clears a specified amount of chat messages)\n\
- kick (kicks a member from the server)\n\
- ban (bans a member from the server)\n\
- rankon (turns on chat XP ranking)\n\
- rankoff (turns off chat XP ranking)\n\
- rank (displays your rank)\n\
- leaderboard (show the top 10 ranked members)\n\
- urban (searches urban dictionary for an entered string)");
            return message.react("✅");
        } catch (error) {
            message.channel.send(`${error}`);
            return message.react("❌");
        };
    }
};
