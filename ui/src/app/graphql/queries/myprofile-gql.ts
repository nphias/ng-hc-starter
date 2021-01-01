import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';
import {Agent} from '../interfaces'

export interface Response {
  me: Agent
}

@Injectable({
  providedIn: 'root',
})
export class MyProfileGQL extends Query<Response> {
  document = gql`
  query myProfile {
    me {
      id
      profile {
        username
      }
    }
  }
`;
}