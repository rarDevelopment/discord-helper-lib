export default class ChannelValidator {
    constructor() {
    }

    isChannel(text) {
        return /<#\d+>/.test(text);
    }
}
