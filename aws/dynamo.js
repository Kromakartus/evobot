const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB()

const setParams = (tableName) => {
    return params = {
        RequestItems: {
            [tableName]: {
                Keys: [
                    {
                        'name': {
                            S: 'warning'
                        }
                    }
                ]
            }
        }
    }
}

exports.getAll = async (tableName = 'warning') => {
    return await dynamoDb.batchGetItem(setParams(tableName))
    // dynamoDb.batchGetItem(setParams(tableName), (err, data) => {
    //     if (err)
    //         console.log("Error while getting items: ", err, err.stack)
    //     else
    //         results = data.Responses[tableName]
    // });

    //return results
}