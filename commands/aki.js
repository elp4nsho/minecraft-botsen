const mTo = require('../utils/moves').mTo
module.exports = (bot) => {
    bot.on('chat', async (username, message) => {
        if (message.includes('aki')) {
            if(message.split(' ')[1] == bot.entity.username){
                if (bot?.players[username]?.entity?.position) {
                    await mTo(bot, bot.players[username].entity.position.x, bot.players[username].entity.position.y, bot.players[username].entity.position.z)
                    bot.chat(`fin  move!`)
                }
            }
        }
    })
}
