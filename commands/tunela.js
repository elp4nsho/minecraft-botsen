const tunela = require('../utils/romper').romperTunel

module.exports = (bot) => {
    bot.on('chat', async (username, message) => {
        if (message.includes('tunela')) {
            bot.chat("tuneleta")
            let veces = message.split(' ')[1] || 1
            await tunela(bot, veces)
        }
    })
}
