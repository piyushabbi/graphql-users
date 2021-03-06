// Schema tells graphql about the type of data contained inside the object.
const graphql = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} = graphql;
const axios = require('axios');

/**
 * Company GraphQLObject
 * name: The name of this Objectype
 * fields: All different properties that the company has. Each field tells the type and of the property included in the fields.
 */
const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		users: {
			type: new GraphQLList(UserType),
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:3000/companies/${parentValue.id}/users`)
					.then(res => res.data);
			}
		}
	})
});

/**
 * User GraphQLObject
 * name: The name of this Objectype
 * fields: All different properties that the user has. Each field tells the type and of the property included in the fields.
 */
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
		company: {
			type: CompanyType,
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(res => res.data);
			}
		}
	})
});

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

/**
 * Mutation
 * Used to change the object in any fashion. eg: delete user, etc
 */
const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		addUser: {
			type: UserType,
			args: {
				firstName: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
				companyId: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				const { firstName, age } = args;
				return axios
					.post('http://localhost:3000/users', {
						firstName,
						age
					})
					.then(res => res.data);
			}
		},
		deleteUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parentValue, args) {
				return axios
					.delete(`http://localhost:3000/users/${args.id}`)
					.then(res => res.data);
			}
		},
		editUser: {
			type: UserType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				firstName: { type: GraphQLString },
				age: { type: GraphQLInt },
				companyId: { type: GraphQLString }
			},
			resolve(parentValue, args) {
				const { firstName, age } = args;
				return axios
					.patch(`http://localhost:3000/users/${args.id}`, args)
					.then(res => res.data);
			}
		}
	})
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation
});
