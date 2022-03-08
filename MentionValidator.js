module.exports = class MentionValidator {
    constructor(guildEmojis) {
        this.guildEmojis = guildEmojis;
    }

    isMention(text){
        return /<@!\d+>/.test(text);
    }
}
