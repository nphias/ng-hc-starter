import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

export interface deleteResult {
  deleteUsername: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class RemoveMeGQL extends Mutation {
  document = gql`
    mutation deleteUsername($name:String) {
      deleteUsername(name:$name)
    }
  `;
}