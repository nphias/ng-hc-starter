import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
//import { Agent, Profile } from 'src/app/graphql/queries/myprofile-gql';
import { Agent, Profile } from 'src/app/graphql/interfaces'

//import { UsernameSetGQL } from 'src/app/graphql/queries/subscriptions-gql';
//import { Observable,Subscription } from 'rxjs';


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: Agent //Promise<User> | null = null
  errorMessage:string = ""
  //usernameSubscription: Subscription

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  postForm = this.fb.group({
    content: ["", Validators.required]
  });

  ngOnInit() {
    if (!sessionStorage.getItem("userhash"))
      this.router.navigate(["signup"]);
    const profile:Profile = {username:sessionStorage.getItem("username"),fields:{"":""}}
    this.user = <Agent>{id:sessionStorage.getItem("userhash"),profile}
    this.user.avatar = sessionStorage.getItem("avatar")
  }

  logout(){
    console.log("logging out")
    sessionStorage.clear()
    this.router.navigate(["signup"]);
  }
}

