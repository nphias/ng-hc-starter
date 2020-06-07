
export const typeDefs =`
  type Agent {
    id: ID!
    username: String
  }
  type Me {
    id: ID!
    agent: Agent!
  }
  type Query {
    allAgents: [Agent!]!
    me: Me!
  }
  type Mutation {
    setUsername(username: String!): Agent!
  }
`;