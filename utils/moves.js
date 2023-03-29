const {Vec3} = require("vec3");
module.exports = {
    mTo: (bot, x, y, z) => {
        let posicao = bot.entity.position.clone()
        let vecesError = 0
        return new Promise((resolve, reject) => {
            let haciaVec = new Vec3(x, y, z)
            bot.navigate.to(haciaVec)

            let moverseInterval = setInterval(() => {
                bot.chat("moverse")

                if (bot.entity.position.x.toString().split(".")[0] === x.toString().split(".")[0] && bot.entity.position.y.toString().split(".")[0] === y.toString().split(".")[0] && bot.entity.position.z.toString().split(".")[0] === z.toString().split(".")[0]) {
                    clearInterval(moverseInterval)
                    resolve()
                }else{
                    if(posicao.x.toString().split(".")[0] === bot.entity.position.x.toString().split(".")[0] && posicao.y.toString().split(".")[0] === bot.entity.position.y.toString().split(".")[0] && posicao.z.toString().split(".")[0] === bot.entity.position.z.toString().split(".")[0]){
                        vecesError++
                    }
                    if(vecesError > 2) {
                        bot.chat("No pude llegar a la posición")
                        clearInterval(moverseInterval)
                        resolve()
                    }
                    posicao = bot.entity.position.clone()
                }
            }, 1000)

        })
    }
}
