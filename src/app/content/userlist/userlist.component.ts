import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from "../../models/User";
import { Router } from "@angular/router";
import { AllAgentsGQL } from 'src/app/graphql/actions/all-agents-gql';

@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.css"]
})
export class UserListComponent implements OnInit {
  user: User;
  userlist: Observable<User[]>;

  constructor(private agents: AllAgentsGQL,  private router: Router) {
  }

  ngOnInit() {
    this.userlist = this.agents.watch().valueChanges.pipe(map(result=>{
      return result.data.allAgents.map(agent => new User(agent.id,agent.username))
    }))
  }

}
