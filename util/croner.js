const moment = require('moment')
const dynamo = require('../aws/dynamo')

try {
  const config = require("../../config.json");
  INTERVAL_CRONER = config.INTERVAL_CRONER;
  RECEIVER_CRONER = config.RECEIVER_CRONER;
} catch (error) {
  INTERVAL_CRONER = process.env.INTERVAL_CRONER;
  RECEIVER_CRONER = process.env.RECEIVER_CRONER;
}

const internalTime = 1000 * Number(INTERVAL_CRONER)

exports.croner = (client) => setInterval(async () => {

  const channel = client.channels.cache.get(""+RECEIVER_CRONER)

  try{
    events = await dynamo.getAll()
  }catch(error){
    console.error("Croner fails...", error);
  }

  await Promise.all(events.map(async (x, index) => {
    const now = moment(new Date())
    const date = moment(Number(x.date.S))
    if(date.isAfter(now)){
      await channel.send(`${x.name}\n${x.msg ?? ""}`)
      await dynamo.delete({name: {S: x.name}})
    }
  }));

}, internalTime)
