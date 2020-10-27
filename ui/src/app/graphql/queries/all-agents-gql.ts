import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Profile {
  username: string
}

export interface Agent {
  id: string;
  profile: Profile;
  avatar: string
}

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
      }
    }
  }
`;
}