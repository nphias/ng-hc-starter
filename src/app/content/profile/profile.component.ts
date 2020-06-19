import { Component, OnInit, Input } from "@angular/core";
//import { ConnectionService } from "../../core/connection.service";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

import { User } from "../../models/User";
import { Router } from "@angular/router";
import { HolochainService } from 'src/app/core/holochain.service';


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: User //Promise<User> | null = null
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
    this.user = new User(sessionStorage.getItem("userhash"),sessionStorage.getItem("username"))
    this.user.avatarURL = sessionStorage.getItem("avatar")
  }

  logout(){
    console.log("logging out")
    sessionStorage.clear()
    this.router.navigate(["signup"]);
  }
}

