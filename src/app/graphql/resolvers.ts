import { INSTANCE_NAME, ZOME_NAME } from '../config';
import { HolochainConnection } from '@uprtcl/holochain-provider';

//export const call = new HolochainConnection()

export const resolvers = {
  Query: {
    async allAgents(_, __, { call }) {

      const allAgents = await call(INSTANCE_NAME, ZOME_NAME,'get_all_agents', {});
      return allAgents.map((agent) => ({
        id: agent.agent_id,
        username: agent.username,
      }));
    },
    async me(_, __, { call }) {

      const address = await call(INSTANCE_NAME, ZOME_NAME,'get_my_address', {});
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
    username(parent, _, { call }) {
      //const cachedAgent = cache['data'].data[parent.id];
      //if (cachedAgent && cachedAgent.username) return cachedAgent.username;

      return call(INSTANCE_NAME, ZOME_NAME,'get_username', {
        agent_address: parent.id,
      });
    },
  },
  Mutation: {
    async setUsername(_, { username }, { call }) {

      const agentId = await call(INSTANCE_NAME, ZOME_NAME,'set_username', { username });
      return {
        id: agentId,
        username,
      };
    },
  },
};