const StringCleaner = require("./StringCleaner");

module.exports = class ArgumentPreparer {
    constructor() {
        this.StringCleaner = new StringCleaner();
    }

    prepareArguments(inputText) {
        let messageSplit = inputText.toString().split(/ (.+)/);
        if (messageSplit.length < 2) {
            return null;
        }
        let gameArguments = messageSplit[1];
        gameArguments = this.StringCleaner.removeMentions(gameArguments);
        const parsedArguments = gameArguments.split(',').filter(a => a.trim() !== "");
        const args = parsedArguments.map(g => g.toLowerCase().trim());
        if (parsedArguments.length === 0) {
            return null;
        }
        return args;
    }
}
