export default class MessageArrayJoiner {
    buildMessageArrayFromStringArray(messagesToCombine, maxMessageLength, firstMessageTitle = '') {
        let messageArray = [];
        let arrayIndex = 0;

        if (firstMessageTitle) {
            messageArray.push(`${firstMessageTitle}\n`);
        }

        messagesToCombine.forEach(updateMessage => {
            const messageToAdd = `${updateMessage}\n`;
            const concatenatedMessage = messageArray[arrayIndex] + messageToAdd;
            if (concatenatedMessage.length >= maxMessageLength) {
                messageArray.push(messageToAdd);
                arrayIndex += 1;
            }
            else {
                messageArray[arrayIndex] += messageToAdd;
            }
        });

        return messageArray;
    }
}
