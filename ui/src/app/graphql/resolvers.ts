import {AgentPubKey } from '@holochain/conductor-api';
import { profile } from 'console';
import {GraphQLError} from 'graphql'
import { Profile } from './interfaces'

const ZOME_NAME = 'profiles'

export const resolvers = {
  Query: {
    async allAgents(_, __, connection) {
    //  if (connection.state == 2)
     //   return new GraphQLError("Holochain is disconnected")
      const response = await connection.call(ZOME_NAME,'get_all_profiles', null);
      console.log(response)
      return response.map((agent: { 
        agent_pub_key: AgentPubKey, profile: Profile}) => ({
        id: agent.agent_pub_key,
        profile: {username:agent.profile.username,fields:JSON.stringify(agent.profile.fields)}
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
    async createProfile(_,  {username, fieldlist}, connection ) {
  //    if (connection.state == 2)
    //    return new GraphQLError("Holochain is disconnected")
    const fields = JSON.parse(fieldlist)
      const response = await connection.call(ZOME_NAME,'create_profile', { username, fields });
      return {
        id: response.agent_pub_key,
        profile: {username:response.profile.username,fields:JSON.stringify(response.profile.fields)}
      };
    },
  }
};