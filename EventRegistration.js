module.exports = class EventRegistration {
    registerEvents(bot, events) {
        events.forEach(event => {
            bot.on(event.name, event.execute.bind(event));
        });
    }
}
