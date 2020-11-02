const dynamo = require('../../aws/dynamo')

module.exports = {
    name: "advisor",
    cooldown: 3,
    aliases: ["ad"],
    description: "Set advise by text and date",
    async execute(message, args) {
        console.log("KHE: ", args)
        if(args.includes("debug"))
            console.log('Que magia hay aca: ', message)
        if(args.includes("get"))
            dynamo.getAll(args.length > 0 ? args[0] : 'warning')

        return message
        .reply('CALMA MAN')
    }
}