// Schema tells graphql about the type of data contained inside the object.
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const _ = require('lodash');

const UserType = require('./user.schema');

const mockData = [
	{
		id: '23',
		firstName: 'Jordan',
		age: 31
	},
	{
		id: '8',
		firstName: 'Kobe',
		age: 24
	}
];

/**
 * RootQuery: Required to jump and land on a specific node in the graph of data.
 * Example: We can ask the RootQuery regarding the users, if we give an id as agrument, it will return an object of user type.
 * --
 * Resolve Function: Actually responsible to search the db with the given argument and return the data. @arg: args object has access to whatever argument is passed to the query.
 */
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: {
				id: {
					type: GraphQLString
				}
			},
			resolve(parentValue, args) {
				return _.find(mockData, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
