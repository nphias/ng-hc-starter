import { INSTANCE_NAME, ZOME_NAME } from '../config';
//import { HolochainConnection } from '@uprtcl/holochain-provider';

//export const call = new HolochainConnection()

export const resolvers = {
  Query: {
    async allAgents(_, __, { callZome }) {

      const allAgents = await callZome.call(INSTANCE_NAME, ZOME_NAME,'get_all_agents', {});
      return allAgents.map((agent) => ({
        id: agent.agent_id,
        username: agent.username,
      }));
    },
    async me(_, __, { callZome }) {

      const address = await callZome.call(INSTANCE_NAME, ZOME_NAME,'get_my_address', {});
      return { id: address };
    },
  },
  Me: {
    agent(parent) {
      return { id: parent.id };
    },
  },
  Agent: {
    id(parent) {
      return parent.id;
    },
    username(parent, _, { callZome }) {
      //const cachedAgent = cache['data'].data[parent.id];
      //if (cachedAgent && cachedAgent.username) return cachedAgent.username;

      return callZome.call(INSTANCE_NAME, ZOME_NAME,'get_username', {
        agent_address: parent.id,
      });
    },
  },
  Mutation: {
    async setUsername(_, { username }, { callZome }) {

      const agentId = await callZome.call(INSTANCE_NAME, ZOME_NAME,'set_username', { username });
      return {
        id: agentId,
        username,
      };
    },
  },
};