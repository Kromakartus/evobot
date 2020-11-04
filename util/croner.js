const moment = require('moment')
const dynamo = require('../aws/dynamo')

const internalTime = 1000 * 60 * 60 //1 hour

const croner = () => setInterval(() => {

  try{
    events = await dynamo.getAll()
  }catch(error){
    console.error("Croner fail", error);
  }

  const response = events.map((x, index) => {
    const now = moment(new Date())
    const date = moment(Number(x.date.S))
    if(date.isAfter(now)){
      console.log("Avisar a discord???")
      dynamo.delete({name: {S: x.name}})
    }
  })

}, internalTime)
