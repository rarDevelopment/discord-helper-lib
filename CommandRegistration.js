module.exports = class CommandRegistration {
    /** Run this with a list of DiscordCommand objects */
    registerCommands(bot, commands) {
        commands.forEach(command => {
            bot.registerCommand(command.name, command.execute.bind(command), {
                description: command.help.message,
                fullDescription: command.help.usage,
                cooldown: command.cooldown,
                caseInsensitive: true,
            });
            if (command.aliases) {
                command.aliases.forEach(alias => {
                    bot.registerCommandAlias(alias, command.name);
                });
            }
            if (command.subcommands) {
                command.subcommands.forEach(subcommandName => {
                    bot.commands[command.name].registerSubcommand(subcommandName, command[subcommandName].bind(command), {
                        description: command.help.usage.replace(command.name, subcommandName),
                        cooldown: command.cooldown,
                        caseInsensitive: true
                    });
                });
            }
        });
    }
    /** Run this with a list of DiscordSlashCommand objects */
    async registerSlashCommands(bot, commands) {
        commands.forEach(command => {
            bot.createCommand({
                name: command.name,
                description: command.description,
                options: command.options,
                type: command.type
            });
        });

        const allCommands = await bot.getCommands();
        const existingCommandNames = commands.map(c => c.name);
        const commandsToDelete = allCommands.filter(c => !existingCommandNames.includes(c.name));
        commandsToDelete.forEach(c => {
            bot.deleteCommand(c.id);
        });
    }
    /** Run this in your interactionCreate event handler and pass in the interaction and a list of DiscordSlashCommand objects. */
    setUpSlashCommand(interaction, commands) {
        const command = commands.find(c => c.name === interaction.data.name);
        if (command) {
            return command.execute(interaction);
        }
        console.error(`Could not process interaction with name ${interaction.data.name}`);
        return interaction.createMessage("ERROR: This interaction was not found.");
    }
}
