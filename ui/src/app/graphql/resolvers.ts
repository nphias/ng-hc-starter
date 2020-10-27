import {AgentPubKey } from '@holochain/conductor-api';
import {GraphQLError} from 'graphql'

const ZOME_NAME = 'profiles'

export interface Profile {
  username: string;
}

export const resolvers = {
  Query: {
    async allAgents(_, __, connection) {
    //  if (connection.state == 2)
     //   return new GraphQLError("Holochain is disconnected")
      const allAgents = await connection.call(ZOME_NAME,'get_all_profiles', null);
      console.log(allAgents)
      return allAgents.map( (agent: { agent_pub_key: AgentPubKey; profile: Profile }) => ({
        id: agent.agent_pub_key,
        profile: agent.profile
      }))
    },
    async me(_, __, connection) {
   //   if (connection.state == 2)
     //   return new GraphQLError("Holochain is disconnected")
      const response = await connection.call( ZOME_NAME,'get_my_profile', null);
      if (!response) {
        const my_pub_key = await connection.call(ZOME_NAME, 'who_am_i', null);
        return { id: my_pub_key };
      }
      return {
        id: response.agent_pub_key,
        profile: response.profile,
      };
      //return { id: address };
    },
  },
  Mutation: {
    async createProfile(_,  {username}, connection ) {
  //    if (connection.state == 2)
    //    return new GraphQLError("Holochain is disconnected")
      const response = await connection.call(ZOME_NAME,'create_profile', { username });
      return {
        id: response.agent_pub_key,
        profile: response.profile,
      };
    },
  }
};