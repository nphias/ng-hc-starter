import { INSTANCE_NAME, ZOME_NAME } from '../config';

export const resolvers = {
  Query: {
    async allAgents(_, __, connection) {
      console.log(connection)
      const allAgents = await connection.call(INSTANCE_NAME, ZOME_NAME,'get_all_agents', {});
      console.log(allAgents)
      return allAgents.map((agent) => ({
        id: agent.agent_id,
        username: agent.username,
      }));
    },
    async me(_, __, connection) {
      
      const address = await connection.call(INSTANCE_NAME, ZOME_NAME,'get_my_address', {});
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
    username(parent, _, connection ) {
      //const cachedAgent = cache['data'].data[parent.id];
      //if (cachedAgent && cachedAgent.username) return cachedAgent.username;

      return connection.call(INSTANCE_NAME, ZOME_NAME,'get_username', {
        agent_address: parent.id,
      });
    },
  },
  Mutation: {
    async setUsername(_,  {username}, connection ) {
      console.log(username)
      const agent = await connection.call(INSTANCE_NAME, ZOME_NAME,'set_username', { username });
      return {
        id: agent.agent_id,
        username,
      };
    },
  },
};