const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB();

exports.getAll = () =>{
    dynamodb.batchGetItem({}, (err, data) => {
        if (err)
            console.log("Error while getting items: ", err, err.stack)
        else
            console.log("Found:", data)
    });
}