const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

/**
 * User GraphQLObject
 * name: The name of this Objectype
 * fields: All different properties that the user has. Each field tells the type and of the property included in the fields.
 */
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt }
	}
});

module.exports = UserType;
