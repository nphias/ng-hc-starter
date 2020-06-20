import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Agent {
  id: string;
  username: string;
}

export interface Me {
  id: string;
  agent: Agent;
}

export interface Response {
  me: Me
}

@Injectable({
  providedIn: 'root',
})
export class MyProfileGQL extends Query<Response> {
  document = gql`
  query myProfile {
    me {
      id
      agent {
        id
        username
      }
    }
  }
`;
}