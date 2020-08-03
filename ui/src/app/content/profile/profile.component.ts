import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { HolochainService } from 'src/app/core/holochain.service';
import { Agent } from 'src/app/graphql/actions/myprofile-gql';



@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: Agent //Promise<User> | null = null
  errorMessage:string = ""

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private holochainservice: HolochainService
  ) {}

  postForm = this.fb.group({
    content: ["", Validators.required]
  });

  ngOnInit() {
    if (!sessionStorage.getItem("userhash"))
      this.router.navigate(["signup"]);
    if(this.holochainservice.hcConnection.state == 2)
      this.errorMessage = "Holochain is disconnected"
    this.user = <Agent>{id:sessionStorage.getItem("userhash"),username:sessionStorage.getItem("username")}
    this.user.avatar = sessionStorage.getItem("avatar")
  }

  logout(){
    console.log("logging out")
    sessionStorage.clear()
    this.router.navigate(["signup"]);
  }
}

