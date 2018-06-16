// Schema tells graphql about the type of data contained inside the object.
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const axios = require('axios');

const UserType = require('./user.schema');
const CompanyType = require('./company.schema');

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
				return axios
					.get(`http://localhost:3000/users/${args.id}`)
					.then(res => res.data);
			}
		},
		company: {
			type: CompanyType,
			args: {
				id: {
					type: GraphQLString
				}
			},
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:3000/companies/${args.id}`)
					.then(res => res.data);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
