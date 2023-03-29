const mineflayer = require('mineflayer')
var navigatePlugin = require('mineflayer-navigate')(mineflayer);
const {movec, mov, moveTo} = require('./mov')
const {pica} = require('./pica')
const vec3 = require('vec3')
const {Vec3} = require("vec3");
console.log(process.argv[2])
let unNumeroRandom = Math.floor(Math.random() * 1000)
const options = {
    host: '190.196.208.22', // Change this to the ip you want.
    port: 25565, // Change this to the port you want.
    version: '1.19', // Change this to the version you want.
    username: "lumbero" + unNumeroRandom, // Change this to the username you want.

}
const timeCavar = 700
let listaTalads = []
let taladd = true
let posicionStorage = null
try {
    const bot = mineflayer.createBot(options)
    navigatePlugin(bot);
    bot.on('chat', async (username, message) => {
        try {

            if (username === bot.username) return

            if (message === 'loaded') {
                console.log(bot.entity.position)
                await bot.waitForChunksToLoad()
                bot.chat('Ready!')
            }

            if (message.startsWith('find')) {
                taladd = true
                const name = message.split(' ')[1]
                if (bot.registry.blocksByName[name] === undefined) {
                    bot.chat(`${name} is not a block name`)
                    return
                }
                bot.chat(`Searching for ${name}`)
                bot.chat(bot.registry.blocksByName[name].id)
                const ids = [bot.registry.blocksByName[name].id, 40]
                //const ids = [bot.registry.blocksByName['oak_log'].id]

                let blocks = []

                let ultimaPsicao = null
                let vesEnUltimaPos = 0

                async function talaren() {
                    let primeraPos = bot.entity.position
                    if (taladd) {
                        blocks = bot.findBlocks({matching: ids, maxDistance: 300, count: 50})
                        blocks = blocks.filter(o => bot.canDigBlock(bot.blockAt(o)))
                        let dir = 'left'
                        if (blocks.length == 0) {
                            let random = Math.floor(Math.random() * 10000) + 3000;
                            let random2 = Math.floor(Math.random() * 4) + 1;

                            if (ultimaPsicao == bot.entity.position) {
                                switch (random2) {
                                    case 1:
                                        dir = 'left'
                                        break;
                                    case 2:
                                        dir = 'right'
                                        break;
                                    case 3:
                                        dir = 'back'
                                        break;
                                    case 4:
                                        dir = 'forward'
                                        break;
                                }
                                vesEnUltimaPos++
                                bot.chat("mmm moviendome hacia atras ?")
                                bot.chat(`No hay bloques moviendome`)
                                bot.setControlState(dir, true);
                                bot.setControlState('jump', true);
                                await new Promise(r => setTimeout(r, random));
                                bot.setControlState(dir, false);
                                bot.setControlState('jump', false);
                                ultimaPsicao = bot.entity.position
                                if (vesEnUltimaPos > 3) {
                                    bot.chat("ayuda no hay mas u.u")
                                    taladd = false
                                    if (posicionStorage) {
                                        await botarTodoAlCofre(bot)
                                    } else {
                                        await bot.navigate.to(primeraPos)

                                    }
                                }
                            } else {
                                bot.chat(`No hay bloques moviendome`)
                                bot.setControlState(dir, true);
                                bot.setControlState('jump', true);
                                await new Promise(r => setTimeout(r, random));
                                bot.setControlState(dir, false);
                                bot.setControlState('jump', false);
                                ultimaPsicao = bot.entity.position
                            }

                        } else {
                            for (let bl of blocks) {
                                bot.chat(`chopi chopi ${bl}`)
                                await bot.dig(bot.blockAt(bl))
                                if (!taladd) {
                                    break
                                }
                            }
                        }
                        await talaren()
                    } else {
                        vesEnUltimaPos = 0
                        bot.chat("ya no mas talad")
                        if (posicionStorage) {
                            await botarTodoAlCofre(bot)
                        } else {
                            await bot.navigate.to(primeraPos)

                        }
                    }
                }

                await talaren()
                /*  let caminos = Promise.all(blocks.map(async (block) => {
                      return await bot.navigate.findPathSync(new Vec3(+block.x.toString(), +block.y.toString(), +block.z.toString() + 1))
                  }))
                  console.log(caminos);
      */

                /*for (let i = 0; i < blocks.length; i++) {
                    console.log("moving to " + blocks[i]);
                    let camino = await bot.navigate.findPathSync(new Vec3(+blocks[i].x.toString(), +blocks[i].y.toString(), +blocks[i].z.toString() + 1))
                    if(camino.status == "success"){
                        for(let j=0;j<camino.path.length;j++){
                            await bot.navigate.to(camino.path[j])
                        }
                    }

                    /!*  await bot.navigate.to(new Vec3(+blocks[i].x.toString(), +blocks[i].y.toString(), +blocks[i].z.toString() + 1))
                      await bot.navigate.to(new Vec3(+blocks[i].x.toString() + 1, +blocks[i].y.toString(), +blocks[i].z.toString()))
                      await bot.navigate.to(new Vec3(+blocks[i].x.toString(), +blocks[i].y.toString(), +blocks[i].z.toString()))
                      await bot.navigate.to(new Vec3(+blocks[i].x.toString() - 1, +blocks[i].y.toString(), +blocks[i].z.toString() - 1))*!/
                }*/

                /*  await moveTo(bot, blocks[0], 0, 0, 1)
                  await pica(timeCavar, bot, blocks[0])*/
                bot.chat(`I found ${blocks.length} ${name} blocks in  ms`)
                bot.chat(`Conforme`)

            }
            /* if (message == "talad") {
                 bot.chat(`talanding`)
                 console.log("67");
                 console.log(listaTalads);
                 let evv = new Vec3(+listaTalads[0].x.toString(), +listaTalads[0].y.toString(), +listaTalads[0].z.toString()+1)
                 await bot.navigate.to(evv)
                /!* for (let i = 0; i < listaTalads.length; i++) {

                     await bot.chat(listaTalads[i])

                 }*!/


             }*/
            if (message == "aki lumbero") {
                await bot.navigate.to(bot.players[username].entity.position)
            }
            if (message == "talad") {
                taladd = false
            }
            if (message == "soltaren") {
                function dropAll() {
                    const excludedItems = ['fishing_rod']
                    const item = bot.inventory.items().find(item => !excludedItems.includes(item.name))
                    if (item) {
                        bot.tossStack(item)
                            .then(() => {
                                setTimeout(dropAll)
                            })
                            .catch(err => {
                                console.log(err)
                                setTimeout(dropAll, 100)
                            })
                    }
                }

                dropAll()
            }
            if (message == "cuantoo") {
                console.log(bot.inventory.items())
            }
            if (message == "cofre") {
                await botarTodoAlCofre(bot)
            }
            if (message == "aki storage") {
                bot.chat(`Conforme en ${bot.players[username].entity.position}`)
                posicionStorage = bot.players[username].entity.position.clone()
            }
            if (message == "stg") {
                bot.navigate.to(posicionStorage)

            }

            if (message == "mirame") {
                await bot.lookAt(bot.players[username].entity.position)

            }


        } catch (error) {
            console.log(error);
        }
    })


} catch
    (error) {
    console.log(error);
}

async function irAlli(bot, pos) {
    bot.navigate.to(pos)
    bot.chat(`Conforme`)
}

async function botarTodoAlCofre(bot) {
    if (posicionStorage && bot) {
        bot.chat("buscando cofre")
        await bot.navigate.to(posicionStorage)
        bot.chat("abriendo cofre")
        let cofre = bot.findBlock({
            matching: 162,
            maxDistance: 10
        })
        if (cofre) {
            bot.chat("hay cofre cerca")
            let ches = await bot.openChest(cofre)
            const excludedItems = ['fishing_rod']

            async function meterTodo() {

                let item = bot.inventory.items().find(item => !excludedItems.includes(item.name))
                if (item?.type) {
                    await ches.deposit(item.type, item.metadata, item.count)
                        .then(() => {
                            setTimeout(meterTodo, 1000)
                        })
                        .catch(err => {
                            console.log(err)
                            setTimeout(meterTodo, 100)
                        })
                }
            }

            await meterTodo()
            ches.close()


        } else {
            bot.chat("no hay cofre cerca")
        }
    } else {
        bot.chat("no hay posicion de storage")
    }
}
