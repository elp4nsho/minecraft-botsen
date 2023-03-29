const escalara = require('../utils/romper').romperEscala

module.exports = (bot) => {
    bot.on('chat', async (username, message) => {
        if (message.includes('escalara')) {
            bot.chat("escalereta")
            let veces = message.split(' ')[1] || 1
            await escalara(bot, veces)
        }
    })
}
