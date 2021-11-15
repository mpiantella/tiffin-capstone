'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    sslEnabled: true
});

const userTable = process.env.USER_TABLE_NAME || "Remote-Brilliance-Tiffin-User-9OG0AAHE5MUG";

exports.handler = async (event) => {
    const input = (event.arguments || {}).input;
    console.log('input', input)
    if (!input) {
        throw new Error("Provide input in the correct format")
    }
    let updateExpression = "";
    let expressionAttributeValues = {};
    /*
    UpdateExpression: 'set Title = :t, Subtitle = :s',
    ExpressionAttributeValues: {
      ':t' : 'NEW_TITLE',
      ':s' : 'NEW_SUBTITLE'
    }*/
    if (input.applications) {
        updateExpression += " set applications = :ap,";
        expressionAttributeValues[":ap"] = input.applications;
    }

    if (input.address) {
        updateExpression += " address = :ad,";
        expressionAttributeValues[":ad"] = input.address;
    }

    if (input.activities) {
        updateExpression += " activities = :act,";
        expressionAttributeValues[":act"] = input.activities;
    }

    if (input.profile) {
        updateExpression += " profile = :pr";
        expressionAttributeValues[":pr"] = input.profile;
    }

    if (input.subscription) {
        updateExpression += " subscription = :sub";
        expressionAttributeValues[":sub"] = input.subscription;
    }

    console.log("updateExpression", updateExpression)
    let params = {
        TableName: userTable,
        Key: {
            id: input.id
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW"
    };

    let data = await documentClient.update(params).promise()
        .catch((err) => {
            throw err;
        });

    return {
        context: {
            result: data
        }
    }
};