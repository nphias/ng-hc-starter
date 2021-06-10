import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile, ProfilesService } from 'src/app/services/profiles.service';
import { ProfilesStore } from 'src/app/stores/profiles.store';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnInit {
  //user: Agent;
  registered: boolean =false//Promise<boolean> = new Promise(()=>{return false});
  errorMessage?: string //= "Sign up"
  avatarLink: string = "../../assets/img/avatar_placeholder.jpg"

  constructor(
    private fb: FormBuilder,
    private pstore: ProfilesStore,
    private profilesService: ProfilesService,
    private router: Router
  ) {}

  profileForm = this.fb.group({
    handle: ["", Validators.required],
    avatar: ["", Validators.required]
  });

  ngOnInit() {
    try {
      this.profilesService.getMyProfile()

  }catch(exception){
    console.log(exception)
  }
  }


 async signUp(){
    //console.log("signup called")
    const handle:string = this.profileForm.get("handle")?.value;
    this.avatarLink = this.profileForm.get("avatar")?.value;
    if (handle.length == 0) {
      return;
    }
    if (this.avatarLink.length == 0) {
      this.avatarLink = "../../assets/img/avatar_placeholder.jpg";
    }
    const profile:Profile = {nickname:handle, fields:{avatar:this.avatarLink}}
      try{
        await this.profilesService.createProfile(profile)
        console.log("user registered")
        this.setAndRoute(profile)
      }catch(error){
        this.errorMessage = error
      }
  };

  setAndRoute(profile:Profile){
    console.log("redirected from signup")
    sessionStorage.setItem("userhash",this.pstore.myAgentPubKey)
    sessionStorage.setItem("username",profile.nickname)
    sessionStorage.setItem("avatar",profile.fields.avatar)
    this.router.navigate(["home"]);
  }


  isRegistered(){
    const profile = this.pstore.MyProfile
    console.log(profile)
    if(profile){
      console.log("myagentkey:",this.pstore.myAgentPubKey)
     // console.log(profile)
      this.registered = true
     // this.setAndRoute(profile)
    } else {
      this.registered = false
    }   
  }
}
