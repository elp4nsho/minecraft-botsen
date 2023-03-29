const mineflayer = require('mineflayer')
var navigatePlugin = require('mineflayer-navigate')(mineflayer);


module.exports.createBot = (nameBot) => {
    return new Promise((resolve, reject) => {
        const options = {
            host: '190.196.208.22', // Change this to the ip you want.
            port: 25565, // Change this to the port you want.
            version: '1.19', // Change this to the version you want.
            username: nameBot

        }

        const bot = mineflayer.createBot(options)
        navigatePlugin(bot);
        bot.once('spawn', () => {
            resolve(bot)
            bot.look
        })
    })
}
