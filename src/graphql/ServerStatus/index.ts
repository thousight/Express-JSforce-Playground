import getServerStatus from './getServerStatus'

const typeDef = `
  enum ServerEnvironments {
    Dev
    Prod
  }

  enum ServerStatuses {
    Live
    Down
  }

  type ServerStatus {
    environment: ServerEnvironments
    status: ServerStatuses
  }
`
const resolvers = {
  Query: {
    getServerStatus,
  },
}

export default {
  typeDef,
  resolvers,
}
