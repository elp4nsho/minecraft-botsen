const espirala = require('../utils/romper').romperEspirala

module.exports = (bot) => {
    bot.on('chat', async (username, message) => {
        if (message.includes('espirala')) {
            bot.chat("espiraleta")
            let veces = message.split(' ')[1] || 1
            await espirala(bot, veces)
        }
    })
}
