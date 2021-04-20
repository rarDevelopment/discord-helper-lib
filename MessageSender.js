const MessageReplyDetails = require("./MessageReplyDetails");
const MessageWithEmbed = require("./MessageWithEmbed");

module.exports = class MessageSender {

    RegularColor = 16777215;
    ErrorColor = 16711680;

    sendMessage(messageToSend, channel) {
        return channel.createMessage(messageToSend);
    }

    sendErrorMessage(errorMessage, argInput, username, channelToSend, replyMessageId, imageUrl) {
        const messageWithEmbed = new MessageWithEmbed(
            errorMessage,
            "Something went wrong!",
            null,
            `Requested by ${username}`,
            new MessageReplyDetails(replyMessageId, true),
            this.ErrorColor,
            imageUrl);
        let messageToSend = messageWithEmbed.buildMessage();
        if (argInput) {
            messageToSend.embed.fields.push({
                name: "Your Input",
                value: argInput,
                inline: false
            });
        }

        return this.sendMessage(messageToSend, channelToSend, null);
    }
}