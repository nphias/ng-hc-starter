import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import { makeExecutableSchema } from 'graphql-tools'
import { ApolloLink } from 'apollo-link'
import { SchemaLink } from 'apollo-link-schema'
import {InMemoryCache} from 'apollo-cache-inmemory';

import { HolochainService } from '../core/holochain.service'
import { typeDefs } from './schema';
import {resolvers} from './resolvers';


export function createApollo(hcs:HolochainService) {
  console.log("in graph module with connection:",hcs.hcConnection)
  const callZome = hcs.hcConnection
  const schemaLinks = new SchemaLink({ schema: makeExecutableSchema({ typeDefs, resolvers}), context: callZome })
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
      useFactory: createApollo,
      deps: [HolochainService]
    },
  ],
})
export class GraphQLModule {}