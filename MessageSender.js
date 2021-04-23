const MessageReplyDetails = require("./MessageReplyDetails");
const MessageWithEmbed = require("./MessageWithEmbed");

module.exports = class MessageSender {
    sendMessage(messageToSend, channel, reactionsToAdd) {
        return channel.createMessage(messageToSend).then(m => {
            if(reactionsToAdd){
                reactionsToAdd.forEach(r => {
                    m.addReaction(r).catch(e => console.error(`Error adding ${r} - ${e}`));
                });
            }
        });
    }

    editMessageWithEmbed(embedContent, messageToEdit) {
        const message = {
            embed: embedContent
        };
        messageToEdit.edit(message);
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