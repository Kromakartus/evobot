const moment = require('moment')
const dynamo = require('../../aws/dynamo')

try {
    const config = require("../../config.json");
    WARNING_FORMAT = config.WARNING_FORMAT;
} catch (error) {
    WARNING_FORMAT = process.env.WARNING_FORMAT;
}

module.exports = {
    name: "schedule",
    cooldown: 3,
    aliases: ["sc"],
    description: "Set advise by text and date",
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

        const r = await dynamo.exists({name: {S:name}})
        if(r.Count > 0)
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
