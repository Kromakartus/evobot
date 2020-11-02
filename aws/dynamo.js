const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB()

const setParams = (tableName) => {
    return params = {
        RequestItems: {
            [tableName]: {
                Keys: [
                    {
                        'name': {
                        }
                    }
                ]
            }
        }
    }
}

exports.getAll = (tableName = 'warning') =>{
    dynamoDb.batchGetItem(setParams(tableName), (err, data) => {
        if (err)
            console.log("Error while getting items: ", err, err.stack)
        else
            console.log("Found:", data)
    });
}