import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class SetUsernameGQL extends Mutation {
  document = gql`
    mutation setUsername($username: String!) {
      setUsername(username: $username) {
        id
        username
      }
    }
  `;
}