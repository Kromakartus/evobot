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
                throw new Error(`Invalid date: format must be ${WARNING_FORMAT}`)

            const now = moment(new Date())
            date = moment(date, WARNING_FORMAT).valueOf().toString()

            if(now.isAfter(moment(Number(date))))
                throw new Error(`Invalid date: the date must be after right now`)

            if(moment(Number(date)).diff(now, 'years') > 1)
                throw new Error(`Invalid date: The date can't be more than 2 year`)

            if(args.length > 0) 
                msg = args.join(' ')
            else
                throw new Error(`You must define a description`)
        }catch(error){
            return message.reply(`$sc <name> <date> <description>: ${error.message}`).catch(console.error); 
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
