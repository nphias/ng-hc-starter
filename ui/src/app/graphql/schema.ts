
export const typeDefs =`
type Profile {
  username: String!
}

type Agent {
  id: ID!
  profile: Profile
}

type Query {
  allAgents: [Agent!]!
  me: Agent!
}

type Mutation {
  createProfile(username: String!): Agent!
}


`;