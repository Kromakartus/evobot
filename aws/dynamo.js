const AWS = require('aws-sdk')
AWS.config.update({region:'us-east-2'})

const dynamoDb = new AWS.DynamoDB()

const setGetAllParams = (tableName) => {
    return params = {
        TableName: tableName,
    }
}

exports.getAll = async (tableName = 'warning') => {
    let scanResults = []
    let items
    do{
        items =  await dynamoDb.scan(setGetAllParams(tableName)).promise()
        items.Items.forEach((item) => scanResults.push(item))
        params.ExclusiveStartKey  = items.LastEvaluatedKey
    }while(typeof items.LastEvaluatedKey != "undefined")

    return scanResults
}