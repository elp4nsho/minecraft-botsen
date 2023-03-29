const {createBot} = require("./utils/aBot")
const {
    pos: comandoPos,
    aki: comandoAki,
    espirala: comandoEspirala,
    escala: comandoEscala,
    tunela: comandoTunela
} = require("./commands")
const vec3 = require('vec3')
const timeCavar = 700;

(async () => {
    const bot = await createBot(process.argv[2] || 'bot1')
    comandoPos(bot)
    comandoAki(bot)
    comandoEspirala(bot)
    comandoEscala(bot)
    comandoTunela(bot)

})()


/*
bot.on('chat', async (username, message) => {
        if (username === bot.username) return
        switch (message) {
            case 'loaded':
                await bot.waitForChunksToLoad()
                bot.chat('Ready!')
                break
            case 'list':
                sayItems()
                break
            case 'dig':
                seguirCavando = true
                await dig()
                break
            case 'stop dig':
                seguirCavando = false
                break
            case 'build':
                build()
                break
            case 'equip dirt':
                equipDirt()
                break
            case 'pos':
                bot.chat(bot.entity.position.toString())
                break
            case 'aki':
                irAlli(username)
                break
        }
    })
*/

function sayItems(items = bot.inventory.items()) {
    const output = items.map(itemToString).join(', ')
    if (output) {
        bot.chat(output)
    } else {
        bot.chat('empty')
    }
}

let hacia = {
    atras: async () => {
        return new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await bot.navigate.to(bot.entity.position.offset(0, 0, -1))
                        bot.chat(`listo jefe`)
                        resolve()
                    } catch (err) {
                        console.log(err.stack)
                    }
                }, timeCavar)
            }
        )
    },
    alFrente: async () => {
        return new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        bot.chat(`listo jefe`)
                        await bot.navigate.to(bot.entity.position.offset(0, 0, 1))
                        resolve()
                    } catch (err) {
                        console.log(err.stack)
                    }
                }, timeCavar)
            }
        )
    },
    izquierda: async () => {
        return new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await bot.navigate.to(bot.entity.position.offset(-1, 0, 0))
                        bot.chat(`listo jefe`)
                        resolve()
                    } catch (err) {
                        console.log(err.stack)
                    }
                }, timeCavar)
            }
        )
    },
    derecha: async () => {
        return new Promise((resolve, reject) => {
                setTimeout(async () => {
                    try {
                        await bot.navigate.to(bot.entity.position.offset(1, 0, 0))
                        bot.chat(`listo jefe`)
                        resolve()
                    } catch (err) {
                        console.log(err.stack)
                    }
                }, timeCavar)
            }
        )
    }
}

let cavar = {
    abajo: async () => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                let target
                target = bot.blockAt(bot.entity.position.offset(0, -1, 0))
                if (target && bot.canDigBlock(target)) {
                    try {
                        await bot.dig(target)
                        bot.chat(`finished digging ${target.name}`)
                        resolve()
                    } catch (err) {
                        console.log(err.stack)
                    }
                }
            }, timeCavar)
        })
    },
    alFrente: async (altura = 0) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                let target
                target = bot.blockAt(bot.entity.position.offset(0, altura, 1))
                if (target && bot.canDigBlock(target)) {
                    try {
                        await bot.dig(target)
                        bot.chat(`finished digging ${target.name}`)
                        resolve()
                    } catch (err) {
                        console.log(err.stack)
                    }
                }
            }, timeCavar)
        })
    },
    atras: async (altura = 0) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                let target
                target = bot.blockAt(bot.entity.position.offset(0, altura, -1))
                if (target && bot.canDigBlock(target)) {
                    try {
                        await bot.dig(target)
                        bot.chat(`finished digging ${target.name}`)
                        resolve()
                    } catch (err) {
                        console.log(err.stack)
                    }
                }
            }, timeCavar)
        })
    },
    derecha: async (altura = 0) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                let target
                target = bot.blockAt(bot.entity.position.offset(1, altura, 0))
                if (target && bot.canDigBlock(target)) {
                    try {
                        await bot.dig(target)
                        bot.chat(`finished digging ${target.name}`)
                        resolve()
                    } catch (err) {
                        console.log(err.stack)
                    }
                }
            }, timeCavar)
        })
    },
    izquierda: async (altura = 0) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                let target
                target = bot.blockAt(bot.entity.position.offset(-1, altura, 0))
                if (target && bot.canDigBlock(target)) {
                    try {
                        await bot.dig(target)
                        bot.chat(`finished digging ${target.name}`)
                        resolve()
                    } catch (err) {
                        console.log(err.stack)
                    }
                }
            }, timeCavar)
        })
    },
    alFrenteBajo: async () => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                let target
                target = bot.blockAt(bot.entity.position.offset(0, 0, 1))
                if (target && bot.canDigBlock(target)) {
                    try {
                        await bot.dig(target)
                        bot.chat(`finished digging ${target.name}`)
                        resolve()
                    } catch (err) {
                        console.log(err.stack)
                    }
                }
            }, timeCavar)
        })
    }
}

async function moverPa(x = 0, y = 0, z = 0) {
    bot.navigate.to(bot.entity.position.offset(x, y, z))
}

async function irAlli(username) {
    const player = bot.players[username].entity.position
    bot.navigate.to(player)
    bot.chat(`Conforme`)
}


let seguirCavando = true

async function dig() {
    if (!seguirCavando) {
    } else {
        bot.chat(`oki oki`)
        try {
            await cavar.abajo()

            for (let i = 0; i < 10; i++) {
                await cavar.abajo()
                await cavar.alFrente(1)
                await cavar.alFrente()
                await moverPa(0, 0, 1)
                await cavar.abajo()
                await cavar.izquierda(1)
                await cavar.izquierda()
                await hacia.izquierda()
                await cavar.abajo()
                await cavar.atras(1)
                await cavar.atras()
                await hacia.atras()
                await cavar.abajo()
                await cavar.derecha(1)
                await cavar.derecha()
                await hacia.derecha()
            }
            for (let i = 0; i < 1000; i++) {
                await cavar.derecha(1)
                await cavar.derecha()
                await hacia.derecha()
            }

            //await dig()
        } catch (err) {
            console.log(err.stack)
        }
    }
}

function build() {
    const referenceBlock = bot.blockAt(bot.entity.position.offset(0, -1, 0))
    const jumpY = Math.floor(bot.entity.position.y) + 1.0
    bot.setControlState('jump', true)
    bot.on('move', placeIfHighEnough)

    let tryCount = 0

    async function placeIfHighEnough() {
        if (bot.entity.position.y > jumpY) {
            try {
                await bot.placeBlock(referenceBlock, vec3(0, 1, 0))
                bot.setControlState('jump', false)
                bot.removeListener('move', placeIfHighEnough)
                bot.chat('Placing a block was successful')
            } catch (err) {
                tryCount++
                if (tryCount > 10) {
                    bot.chat(err.message)
                    bot.setControlState('jump', false)
                    bot.removeListener('move', placeIfHighEnough)
                }
            }
        }
    }
}

async function equipDirt() {
    let itemsByName
    if (bot.supportFeature('itemsAreNotBlocks')) {
        itemsByName = 'itemsByName'
    } else if (bot.supportFeature('itemsAreAlsoBlocks')) {
        itemsByName = 'blocksByName'
    }
    try {
        await bot.equip(bot.registry[itemsByName].dirt.id, 'hand')
        bot.chat('equipped dirt')
    } catch (err) {
        bot.chat(`unable to equip dirt: ${err.message}`)
    }
}

function itemToString(item) {
    if (item) {
        return `${item.name} x ${item.count}`
    } else {
        return '(nothing)'
    }
}

