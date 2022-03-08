module.exports = class ChannelValidator {
    constructor() {
    }

    isChannel(text) {
        return /<#\d+>/.test(text);
    }
}
