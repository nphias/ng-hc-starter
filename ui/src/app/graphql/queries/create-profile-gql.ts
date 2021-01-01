import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class CreateProfileGQL extends Mutation {
  document = gql`
    mutation CreateProfile($username: String!, $fieldlist: String!) {
      createProfile(username: $username, fieldlist: $fieldlist) {
        id
        profile {
          username
          fields
        }
      }
    }
  `;
}