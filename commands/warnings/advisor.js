module.exports = {
    name: "advisor",
    cooldown: 3,
    aliases: ["ad"],
    description: "Set advise by text and date",
    async execute(message, args) {
        console.log('Que magia hay aca: ', message)
        return message
        .reply('CALMA MAN')
    }
}