module.exports = class ChannelValidator {
    isChannel(text) {
        return /<#\d+>/.test(text);
    }
}
