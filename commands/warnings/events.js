const moment = require('moment')
const dynamo = require('../../aws/dynamo')

try {
  const config = require("../../config.json");
  WARNING_FORMAT = config.WARNING_FORMAT;
} catch (error) {
  WARNING_FORMAT = process.env.WARNING_FORMAT;
}

module.exports = {
    name: "events",
    cooldown: 3,
    aliases: ["e"],
    description: "List scheduled events",
    async execute(message, args) {
      let events = undefined
      try{
        events = await dynamo.getAll()
      }catch(error){
          console.error(error);
          return message.reply("Failed retrieving events").catch(console.error); 
      }

      const response = events
          .sort((a,b) => Number(a.date.S) - Number(b.date.S))
          .map((x, index) => {
            const date = moment(Number(x.date.S)).format(WARNING_FORMAT)
            return `${(index+1)}: ${x.name.S} - ${date}`
          }).join('\n')

      return message.reply(`Events:\n${response}`)
    }
}
