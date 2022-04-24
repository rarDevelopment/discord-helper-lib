import emojiRegex from 'emoji-regex/RGI_Emoji.js';

export default class EmojiValidator {
    constructor(guildEmojis) {
        this.guildEmojis = guildEmojis;
    }

    getValidEmojiFromText(text) {
        const regex = emojiRegex();
        const emojiMatch = text.match(regex);
        if (emojiMatch) {
            const emoji = emojiMatch[0];
            return emoji;
        }
        const customEmojiRegex = /(<a?)?:\w+:(\d{18}>)?/;
        const customEmojiMatch = text.match(customEmojiRegex);
        if (customEmojiMatch) {
            const emoji = customEmojiMatch[0];
            let guildHasEmoji = false;
            this.guildEmojis.forEach(guildEmoji => {
                const emojiNameToCheck = `${guildEmoji.name}:${guildEmoji.id}`;
                if (emoji.toLowerCase().includes(emojiNameToCheck.toLowerCase())) {
                    guildHasEmoji = true;
                }
            });
            if (guildHasEmoji) {
                return emoji;
            }
            else {
                return null;
            }
        }
        return null;
    }
}
