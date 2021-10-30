'use strict';

const fs = require('fs');
// create schema from graphql files
const rootSchema =
    `
schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
}
`;

function loadFile() {
    try {
        const queriesSchema = fs.readFileSync(`${__dirname}/queries.graphql`, 'utf8');
        const mutationsSchema = fs.readFileSync(`${__dirname}/mutations.graphql`, 'utf8');
        const typesSchema = fs.readFileSync(`${__dirname}/types.graphql`, 'utf8');
        const inputSchema = fs.readFileSync(`${__dirname}/input.graphql`, 'utf8');

        const schema = `${rootSchema} ${queriesSchema} ${mutationsSchema} ${typesSchema} ${inputSchema}`

        console.log(schema)
        return schema;
    } catch (err) {
        console.error(err)
    }
}

function writeSchema(schema) {
    try {
        fs.writeFileSync(
            `${process.env.PWD}/resources/appsync/schema.graphql`, schema
        )
        console.log('\n\t ********** Schema was succesfully created **********');
        //file written successfully
    } catch (err) {
        console.error(err)
    }
}

const appendedSchemas = loadFile()
writeSchema(appendedSchemas)