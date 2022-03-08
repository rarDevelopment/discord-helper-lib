module.exports = class DiscordUrlBuilder {
    constructor(guildId) {
        this.guildId = guildId;
    }

    DiscordBaseUrl = "https://discord.com/channels";

    buildChannelUrl(channelId) {
        return `${this.DiscordBaseUrl}/${this.guildId}/${channelId}/`;
    }

    buildMessageUrl(channelId, messageId) {
        return `${this.DiscordBaseUrl}/${this.guildId}/${channelId}/`;
    }
}
