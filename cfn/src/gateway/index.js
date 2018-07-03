const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    // Get items that has empty state
    const data = await dynamo.scan({
        TableName: process.env.DYNAMODB_TABLE,
        FilterExpression: "#s = :s",
        ExpressionAttributeNames: { "#s": "Status" },
        ExpressionAttributeValues: { ":s": "empty" }
    }).promise().catch(console.err);

    // Roll the dice
    console.log(JSON.stringify(data));
    if (data.Items.length === 0) {
        console.log("Item is nothing.");
        return context.done();
    }
    const rand = max => Math.floor(Math.random() * Math.floor(max));
    const item = data.Items[rand(data.Items.length)];

    console.log(JSON.stringify(item));
    // Update item state
    await dynamo.update({
        TableName: process.env.DYNAMODB_TABLE,
        Key: { Id: item.Id },
        UpdateExpression: "set #s = :s",
        ExpressionAttributeNames: { "#s": "Status" },
        ExpressionAttributeValues: { ":s": "full" },
        ReturnValues: 'ALL_NEW',
    }).promise().catch(console.err);
};