module.exports = class DiscordSlashCommand {
    constructor(name, description, options, type) {
        this.name = name;
        this.description = description;
        this.options = options;
        this.type = type;
    }
}
