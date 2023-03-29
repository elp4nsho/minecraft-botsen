module.exports.pica = async (timeCavar=700,bot,pos, x = 0, y = 0, z = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            let target
            target = bot.blockAt(bot.entity.position.offset(pos.x + x, pos.y + y, pos.z + z))
            if (target && bot.canDigBlock(target)) {
                try {
                    await bot.dig(target)
                    bot.chat(`pikado un ${target.name}`)
                    resolve()
                } catch (err) {
                    console.log(err.stack)
                }
            }
        }, timeCavar)
    })
}
