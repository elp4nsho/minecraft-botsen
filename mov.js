const {Vec3} = require("vec3");
module.exports.mov = async (bot, x = 0, y = 0, z = 0) => {
    bot.navigate.to(bot.entity.position.offset(x, y, z))
}
module.exports.movec = (bot, elVec) => {
    bot.navigate.to(bot.entity.position.offset(elVec.x, elVec.y, elVec.z))

}
module.exports.moveTo = async (bot, pos, x = 0, y = 0, z = 0) => {

    bot.navigate.to(new Vec3(+pos.x.toString() + x, +pos.y.toString() + y, +pos.z.toString() + z))

}

module.exports.moveNoma = async (bot,) => {


}
