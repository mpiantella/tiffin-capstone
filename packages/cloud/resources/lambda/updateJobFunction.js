'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
    sslEnabled: true
});

const jobTable = process.env.JOB_TABLE_NAME || "Remote-Brilliance-Tiffin-Job-9OG0AAHE5MUG";

exports.handler = (event) => {
    const input = (event.arguments || {}).input;
    console.log('input', input)
    if (!input) {
        throw new Error("Provide input in the correct format")
    }
    let params = {
        TableName: jobTable,
        Item: {
            id: input.id,
            userId: input.userId,
            title: input.title,
            description: input.description,
            category: input.category,
            type: input.type,
            isFullyRemote: input.isFullyRemote,
            howtoApply: input.howtoApply,
            companyDescription: input.companyDescription,
            companyHQ: input.companyHQ,
            companyName: input.companyName,
            companyStatement: input.companyStatement,
            companyWebsiteURL: input.companyWebsiteURL,
            logo: input.logo, // use proper format
            startDate: input.startDate, // use proper format
            endDate: input.endDate, // use proper format
        }
    };

    if (input.applicants) {
        params.Item.applicants = input.applicants;
    }

    let data = await documentClient.put(params).promise()
        .catch((err) => {
            throw err;
        });
    console.log('data => ', JSON.stringify(data));
    return {
        context: {
            result: (data || {}).items
        }
    }
};

/*
    HashKey: 'haskey',
    NumAttribute: 1,
    BoolAttribute: true,
    ListAttribute: [1, 'two', false],
    MapAttribute: {
        foo: 'bar'
    },
    NullAttribute: null
s*/