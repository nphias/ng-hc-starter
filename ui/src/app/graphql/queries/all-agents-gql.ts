import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {Agent} from '../interfaces'

export interface Response {
  allAgents: Agent[]
}

@Injectable({
  providedIn: 'root',
})
export class AllAgentsGQL extends Query<Response> {
  document = gql`
  query GetAllAgents {
    allAgents {
      id
      profile {
        username
        fields
      }
    }
  }
`;
}