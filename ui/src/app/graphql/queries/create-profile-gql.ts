import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CreateProfileGQL extends Mutation {
  document = gql`
    mutation CreateProfile($username: String!) {
      createProfile(username: $username) {
        id
        profile {
          username
        }
      }
    }
  `;
}