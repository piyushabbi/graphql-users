const graphql = require('graphql');
const axios = require('axios');

const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;
const CompanyType = require('./company.schema');

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
		age: { type: GraphQLInt },
		company: {
			type: CompanyType,
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then(res => res.data);
			}
		}
	}
});

module.exports = UserType;
