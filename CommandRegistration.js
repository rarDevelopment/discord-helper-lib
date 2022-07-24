module.exports = class CommandRegistration {
    registerCommands(bot, commands) {
        commands.forEach(command => {
            bot.registerCommand(command.name, command.execute.bind(command), {
                description: command.help.usage,
                fullDescription: command.help.message
            });
            if (command.aliases) {
                command.aliases.forEach(alias => {
                    bot.registerCommandAlias(alias, command.name);
                });
            }
        });
    }
}
