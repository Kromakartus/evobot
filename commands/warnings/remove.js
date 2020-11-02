const dynamo = require('../../aws/dynamo')

module.exports = {
    name: "remove-schedule",
    cooldown: 3,
    aliases: ["rsc"],
    description: "Remove scheduled event",
    async execute(message, args) {
        let name = undefined

        try{
            name = args.shift()
        }catch(error){
            console.error(error);
            return message.reply(error.message).catch(console.error); 
        }

        const savedEvent = await dynamo.exists({name: {S:name}})
        if(savedEvent.Count === 0)
            return message.reply("Event not exist"); 

        try{
            const result = await dynamo.delete({name: {S:name}})
        }catch(error){
            console.error(error);
            return message.reply("Failed deleting from dynamo").catch(console.error); 
        }

        return message.reply(`Event deleted correctly`)
    }
}
