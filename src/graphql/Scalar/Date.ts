import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const resolver = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',

    parseValue: value => new Date(value),
    serialize: value => new Date(value),
    parseLiteral: ast => {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null
    },
  }),
}

export default {
  typeDef: `
        scalar Date
    `,
  resolver,
}
