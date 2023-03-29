module.exports = {
    checkPos: (bot) => {
        bot.chat(`x: ${bot.entity.position.x} y: ${bot.entity.position.y} z: ${bot.entity.position.z}`)
    }
}
