module.exports = class CommandRegistration {
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
    registerSlashCommands(bot, commands) {
        commands.forEach(command => {
            bot.createCommand({
                name: command.name,
                description: command.description,
                options: command.options,
                type: command.type
            });
        });
    }
}
