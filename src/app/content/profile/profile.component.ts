import { Component, OnInit, Input } from "@angular/core";
//import { ConnectionService } from "../../core/connection.service";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";

import { User } from "../../models/User";
import { Router } from "@angular/router";


@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  user: User //Promise<User> | null = null

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  postForm = this.fb.group({
    content: ["", Validators.required]
  });

  ngOnInit() {
    if (!sessionStorage.getItem("userhash"))
      this.router.navigate(["signup"]);
    this.user = new User(sessionStorage.getItem("userhash"),sessionStorage.getItem("username"))
    this.user.avatarURL = sessionStorage.getItem("avatar")
  }

  logout(){
    console.log("logging out")
    sessionStorage.clear()
    this.router.navigate(["signup"]);
  }
}

