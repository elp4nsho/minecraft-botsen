const mTo = require('../utils/moves').mTo
module.exports = {
    romperEspirala:async  (bot, n = 10) => {
        try {
            let posInicial = bot.entity.position.clone()
            await mTo(bot, bot.entity.position.x, bot.entity.position.y, bot.entity.position.z + 1)
            await module.exports.romp(bot,0, -1, 0)
            await module.exports.romp(bot,0, 0, 1)

            await mTo(bot, bot.entity.position.x, bot.entity.position.y, bot.entity.position.z + 1)

            for (let i = 0; i < n; i++) {
                await module.exports.romp(bot,0, -1, 0)
                await module.exports.romp(bot,0, 1, 1)
                await module.exports.romp(bot,0, 0, 1)
                await mTo(bot, bot.entity.position.x, bot.entity.position.y, bot.entity.position.z + 1)
                await module.exports.romp(bot,0, -1, 0)
                await module.exports.romp(bot,-1, 1, 0)
                await module.exports.romp(bot,-1, 0, 0)
                await mTo(bot, bot.entity.position.x - 1, bot.entity.position.y, bot.entity.position.z)
                await module.exports.romp(bot,0, -1, 0)
                await module.exports.romp(bot,0, 1, -1)
                await module.exports.romp(bot,0, 0, -1)
                await mTo(bot, bot.entity.position.x, bot.entity.position.y, bot.entity.position.z - 1)
                await module.exports.romp(bot,0, -1, 0)
                await module.exports.romp(bot,1, 1, 0)
                await module.exports.romp(bot,1, 0, 0)
                await mTo(bot, bot.entity.position.x + 1, bot.entity.position.y, bot.entity.position.z)
            }
            await mTo(bot, posInicial.x, posInicial.y, posInicial.z)
        } catch (err) {
            console.log(err.stack)
        }
    },
    romperEscala:async  (bot, n = 10) => {
        let miPosInicial = bot.entity.position.clone()
        try {
            await module.exports.romp(bot,0, -1, 0)

            for (let i = 0; i < n; i++) {
                await module.exports.romp(bot,0, -1, 0)
                await module.exports.romp(bot,0, 1, 1)
                await module.exports.romp(bot,0, 0, 1)
                await mTo(bot, bot.entity.position.x, bot.entity.position.y, bot.entity.position.z + 1)
            }
            await mTo(bot, miPosInicial.x, miPosInicial.y, miPosInicial.z)

            //await dig()
        } catch (err) {
            console.log(err.stack)
        }
    },
    romperTunel:async  (bot, n = 10) => {
        let miPosInicial = bot.entity.position.clone()
        try {
            await module.exports.romp(bot,0, -1, 0)
            for (let i = 0; i < n; i++) {
                await module.exports.romp(bot,0, 1, 1)
                await module.exports.romp(bot,0, 0, 1)
                await mTo(bot, bot.entity.position.x, bot.entity.position.y, bot.entity.position.z + 1)
            }
            //await dig()
        } catch (err) {
            console.log(err.stack)
        }
    },
    romp: async (bot, x, y, z, timeCavar = 700) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {

                    let target
                    target = bot.blockAt(bot.entity.position.offset(x, y, z))
                    if (target && bot.canDigBlock(target)) {
                        await bot.dig(target)
                        bot.chat(`finished digging ${target.name}`)
                        resolve()
                    }
                } catch (err) {
                    console.log(err)
                    resolve()
                }
            }, timeCavar)
        })
    },
}
