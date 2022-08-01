module.exports = class DiscordCommand {
    constructor(name, description, fullDescription, cooldown, aliases, subcommandNames) {
        this.name = name;
        this.description = description;
        this.fullDescription = fullDescription;
        this.cooldown = cooldown;
        this.aliases = aliases;
        this.subcommands = subcommandNames;
    }
}
