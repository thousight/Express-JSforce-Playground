import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'

import ServerStatus from './ServerStatus'
import Date from './Scalar/Date'

import Query from './Query'
import Mutation from './Mutation'

const schema = makeExecutableSchema({
  typeDefs: [ServerStatus.typeDef, Date.typeDef, Query, Mutation],
  resolvers: [ServerStatus.resolvers, Date.resolver],
})

const apolloServer = new ApolloServer({ schema })

export default apolloServer
