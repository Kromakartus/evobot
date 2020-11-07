const moment = require('moment')
const dynamo = require('../aws/dynamo')

try {
  const config = require("../config.json");
  RECEIVER_CRONER = config.RECEIVER_CRONER;
} catch (error) {
  RECEIVER_CRONER = process.env.RECEIVER_CRONER;
}

const internalTime = 1000 * 60 * 30
const newDayHour = 1
let lastDayNotified = undefined

const isNotified = (newDate) => {
  return lastDayNotified &&
      lastDayNotified.getFullYear() === newDate.getFullYear() &&
      lastDayNotified.getMonth() === newDate.getMonth() &&
      lastDayNotified.getDate() === newDate.getDate()
}

exports.croner = (client) => setInterval(async () => {

  const now = new Date()
  const hour = now.getHours();

  const channel = client.channels.cache.get(""+RECEIVER_CRONER)

  try{
    events = await dynamo.getAll()
  }catch(error){
    console.error("Croner fails...", error);
  }
  
  await Promise.all(events.map(async (x, index) => {
    const mNow = moment(now)
    const date = moment(Number(x.date.S))

    if(mNow.isAfter(date)){
      await channel.send(`⚠️⚠️⚠️FINALLY => ${x.name.S}⚠️⚠️⚠️\n${x.msg.S || ""}`)
      await dynamo.delete({name: x.name})
    }else if(hour <= newDayHour && !isNotified(now)){
      const diff = date.diff(mNow, 'days')
      await channel.send(`We are waiting for ${x.name.S}... At least ${diff} more days 🤣`)
      lastDayNotified = now
    }

  }));    

}, internalTime)
