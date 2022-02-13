module.exports = class Message {
    constructor(text, messageReplyDetails) {
        this.text = text;
        this.messageReplyDetails = messageReplyDetails;
    }

    buildMessage() {
        let message = {
            content: this.text
        };
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
