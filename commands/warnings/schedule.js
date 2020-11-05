const moment = require('moment')
const dynamo = require('../../aws/dynamo')

try {
    const config = require("../../config.json");
    WARNING_FORMAT = config.WARNING_FORMAT;
    WARNING_MAXIMUM_SIZE = config.WARNING_MAXIMUM_SIZE
} catch (error) {
    WARNING_FORMAT = process.env.WARNING_FORMAT;
    WARNING_MAXIMUM_SIZE = process.env.WARNING_MAXIMUM_SIZE
}

module.exports = {
    name: "schedule",
    cooldown: 3,
    aliases: ["sc"],
    description: "Schedule an event",
    async execute(message, args) {
        let name, date, msg = undefined

        try{
            name = args.shift()
            date = args.shift()

            if(moment(date, WARNING_FORMAT).format(WARNING_FORMAT) !== date)
                throw new Error(`Invalid date format(must be ${WARNING_FORMAT})`)

            date = moment(date, WARNING_FORMAT).valueOf().toString()
            if(args.length > 0) 
                msg = args.join(' ')
        }catch(error){
            console.error(error);
            return message.reply(error.message).catch(console.error); 
        }

        const actualEvents = await dynamo.getAll()
        if(actualEvents.length >= WARNING_MAXIMUM_SIZE)
            return message.reply(`Already got maximum events allowed (${WARNING_MAXIMUM_SIZE})`); 

        const savedEvent = await dynamo.exists({name: {S:name}})
        if(savedEvent.Count > 0)
            return message.reply("Event has already scheduled"); 

        try{
            let data = {name: {S: name}, date: {S: date}}
            if(msg) data = Object.assign(data, {msg: {S: msg}})
            const result = await dynamo.save(data)
        }catch(error){
            console.error(error);
            return message.reply("Failed saving on dynamo").catch(console.error); 
        }

        return message.reply(`Scheduled correctly`)
    }
}
