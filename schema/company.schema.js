const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

/**
 * Company GraphQLObject
 * name: The name of this Objectype
 * fields: All different properties that the company has. Each field tells the type and of the property included in the fields.
 */
const CompanyType = new GraphQLObjectType({
	name: 'Company',
	fields: {
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		description: { type: GraphQLString }
	}
});

module.exports = CompanyType;
