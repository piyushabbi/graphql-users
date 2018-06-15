const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const expressGraphQL = require('express-graphql');
const config = require('./config');
const schema = require('./schema/schema');

const port = config.port || 4000;
const app = express();

/**
 * graphiql: true intended for development
 * schema required
 */
const graphQlMiddlewareOpts = expressGraphQL({
	schema,
	graphiql: true
});

/**
 * Add Route: /graphql
 * Graphql library handles any request that our app makes to the /graphql
 */
app.use('/graphql', graphQlMiddlewareOpts);

app.listen(port, () => {
	console.log(`Server Running on Port ${port}.`);
});
