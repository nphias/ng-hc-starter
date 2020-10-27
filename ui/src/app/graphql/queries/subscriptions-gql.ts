import {Injectable} from '@angular/core';
import {Subscription} from 'apollo-angular';
import gql from 'graphql-tag';



@Injectable({
  providedIn: 'root',
})
export class UsernameSetGQL extends Subscription {
  document = gql`
    subscription getusernames {
      usernameSet {
        user_address {
          id
        }
      }
    }
  `;
}