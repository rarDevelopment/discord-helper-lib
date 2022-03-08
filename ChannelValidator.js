module.exports = class ChannelValidator {
    constructor(guildEmojis) {
        this.guildEmojis = guildEmojis;
    }

    isChannel(text) {
        return /<#\d+>/.test(text);
    }
}
