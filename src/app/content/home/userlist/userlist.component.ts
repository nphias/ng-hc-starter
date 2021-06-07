import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {  AgentProfile, ProfilesService } from '../../../services/profiles.service'
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProfilesStore } from "src/app/stores/profiles.store";

interface userData
{
  id:string,
  username:string,
} 

@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html"
})
export class UserListComponent implements OnInit {
  errorMessage!:string
  userForm!: FormGroup

  constructor(
    private profilesService: ProfilesService,
    public p_store: ProfilesStore,
    private router: Router,
    private fb: FormBuilder
    ) { 
  }

  async ngOnInit() {
    this.userForm = this.fb.group({
      Rows : this.fb.array([])
    });
    try {
      this.profilesService.setAllProfiles()
    } catch(exception){
        console.log(exception)
        this.errorMessage = exception
    }
  }

  get formArr() {
    return this.userForm.get("Rows") as FormArray;
  }

  setFormData(){
    this.populateForm(this.p_store.knownProfiles)
  }

  populateForm(agentlist: AgentProfile[]){
    this.formArr.clear()
    for (let i = 0; i < agentlist.length; i++ ) {
      if (agentlist[i].agent_pub_key != sessionStorage.getItem("userhash")){
        this.formArr.push(
          this.fb.group({
            id: this.fb.control(agentlist[i].agent_pub_key),
            username: this.fb.control(agentlist[i].profile.nickname),
          })
        )
      }
    }
  }

  async loadProfile(data:userData){
    try {
      this.router.navigate(["profile", { id: data.id }]);
    } catch(exception){
      console.error(exception)
      this.errorMessage = "type:"+exception.data.type+" "+exception.data.data
       // this.errorMessage = exception
    }
  }
  

}
