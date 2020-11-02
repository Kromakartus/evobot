const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB()

exports.getAll = () =>{
    dynamoDb.batchGetItem({}, (err, data) => {
        if (err)
            console.log("Error while getting items: ", err, err.stack)
        else
            console.log("Found:", data)
    });
}