const dynamo = require('../../aws/dynamo')

module.exports = {
    name: "advisor",
    cooldown: 3,
    aliases: ["ad"],
    description: "Set advise by text and date",
    async execute(message, args) {
        let results = []
        console.log("KHE: ", args)
        if(args.includes("debug"))
            console.log('Que magia hay aca: ', message)
        if(args.includes("get"))
            results = await dynamo.getAll(args.length > 1 ? args[1] : 'warning')

        return message
        .reply(`Toma gil: ${results}`)
    }
}