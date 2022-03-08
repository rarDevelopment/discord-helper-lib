const MessageWithEmbed = require("./MessageWithEmbed");
const MessageColors = require("./MessageColors");

module.exports = class MessageSender {
    sendMessage(messageToSend, channel, reactionsToAdd) {
        return channel.createMessage(messageToSend).then(messageSent => {
            if (reactionsToAdd) {
                reactionsToAdd.forEach(r => {
                    messageSent.addReaction(r).catch(e => console.error(`Error adding ${r} - ${e}`));
                });
            }
            return messageSent;
        });
    }

    editMessageWithEmbed(embedContent, messageToEdit) {
        const message = {
            embed: embedContent
        };
        messageToEdit.edit(message);
    }

    sendErrorMessage(errorMessage, argInput, username, channelToSend, messageReplyDetails, imageUrl) {
        const messageWithEmbed = new MessageWithEmbed(
            errorMessage,
            "Something went wrong!",
            null,
            `Requested by ${username}`,
            messageReplyDetails,
            new MessageColors().ErrorColor,
            imageUrl);
        let messageToSend = messageWithEmbed.buildMessage();
        if (argInput) {
            if (!messageToSend.embed.fields) {
                messageToSend.embed.fields = [];
            }
            messageToSend.embed.fields.push({
                name: "Your Input",
                value: argInput,
                inline: false
            });
        }

        return this.sendMessage(messageToSend, channelToSend, null);
    }
}
