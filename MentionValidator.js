module.exports = class MentionValidator {
    constructor() {
    }

    isMention(text) {
        return /<@!\d+>/.test(text);
    }
}
