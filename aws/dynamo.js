const AWS = require('aws-sdk')

let AWS_REGION, WARNING_TABLE;
try {
    const config = require("../config.json");
    AWS_REGION = config.AWS_REGION;
    WARNING_TABLE = config.WARNING_TABLE;
} catch (error) {
    AWS_REGION = process.env.AWS_REGION;
    WARNING_TABLE = process.env.WARNING_TABLE;
}

AWS.config.update({region: AWS_REGION})

const dynamoDb = new AWS.DynamoDB()

const getParams = (tableName, extra) => {
    return params = {
        TableName: tableName,
        ...extra
    }
}

exports.getAll = async (tableName = WARNING_TABLE) => {
    let scanResults = []
    let items
    do{
        items =  await dynamoDb.scan(getParams(tableName)).promise()
        items.Items.forEach((item) => scanResults.push(item))
        params.ExclusiveStartKey  = items.LastEvaluatedKey
    }while(typeof items.LastEvaluatedKey != "undefined")

    return scanResults
}

exports.exists = async (data, tableName = WARNING_TABLE) => {
    return await dynamoDb.query(getParams(tableName, {
        KeyConditionExpression: "#n = :name",
        ExpressionAttributeNames:{
            "#n": "name"
        },
        ExpressionAttributeValues: {
            ":name": data.name
        }
    })).promise()
}

exports.save = async (data, tableName = WARNING_TABLE) => {
    return await dynamoDb.putItem(getParams(tableName,{
        Item: data
    })).promise()
}

exports.delete = async (data, tableName = WARNING_TABLE) => {
    return await dynamoDb.deleteItem(getParams(tableName,{
        Key: data
    })).promise()
}