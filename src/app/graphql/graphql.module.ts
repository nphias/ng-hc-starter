import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import { makeExecutableSchema } from 'graphql-tools'
import { ApolloLink } from 'apollo-link'
import { SchemaLink } from 'apollo-link-schema'
//import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { HolochainConnection } from '@uprtcl/holochain-provider';
import { typeDefs } from './schema'
import {resolvers} from './resolvers'



//const uri = 'https://api.spacex.land/graphql/'; // <-- add the URL of the GraphQL server here
export function createApollo() {
   const connection = new HolochainConnection({ host: 'ws://localhost:8888'})
    //connection.connection()
    const schemaLinks = new SchemaLink({ schema: makeExecutableSchema({ typeDefs, resolvers })})//, context:connection})
    const links =[schemaLinks] 

  return {
    link: ApolloLink.from(links),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
          errorPolicy: 'all'
        }
      }
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo
      //deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}