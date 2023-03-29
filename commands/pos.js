const infoBot = require('../infoBot')

module.exports = (bot) => {
    bot.on('chat', (username, message) => {
        if (message === 'pos') {
            infoBot.checkPos(bot)
        }
    })
}
