module.exports = class MessageWithEmbed {
    constructor(text, title, embedFields, footerText, messageReplyDetails, color, imageUrl) {
        this.text = text;
        this.title = title;
        this.embedFields = embedFields;
        this.footerText = footerText;
        this.messageReplyDetails = messageReplyDetails;
        this.color = color;
        this.imageUrl = imageUrl;
    }

    buildMessage() {
        let message = {
            embed: {
                title: this.title,
                footer: { text: this.footerText }
            }
        };
        if (this.text) {
            message.embed.description = this.text;
        }
        if (this.imageUrl) {
            message.embed.image = { url: this.imageUrl }
        }
        if (this.color) {
            message.embed.color = this.color;
        }
        if (this.embedFields) {
            message.embed.fields = this.embedFields.map(field => {
                return {
                    name: field.name,
                    value: field.value,
                    inline: field.inline
                };
            })
        }
        if (this.messageReplyDetails) {
            message.messageReferenceID = this.messageReplyDetails.replyMessageId;
            //message.messageReference = { id: this.messageReplyDetails.replyMessageId }
            message.allowedMentions = {
                everyone: true,
                roles: true,
                users: true,
                repliedUser: this.messageReplyDetails.mentionAuthor
            };
        }
        return message;
    }
}
