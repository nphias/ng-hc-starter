import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
// import { computeStyle } from '@angular/animations/browser/src/util';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { SetUsernameGQL } from 'src/app/graphql/actions/set-username-gql';
import { MyProfileGQL } from 'src/app/graphql/actions/myprofile-gql'
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User;
  registered: Promise<boolean> = new Promise(()=>{return false});
  errorMessage: string = ""

  constructor(
    private fb: FormBuilder,
    private setUser: SetUsernameGQL,
    private myprofile:MyProfileGQL,
    private router: Router
  ) {}

  profileForm = this.fb.group({
    handle: ["", Validators.required],
    avatar: ["", Validators.required]
  });

  ngOnInit() {
    this.registered = this.isRegistered().then((result)=>{
      if(result)
      this.errorMessage = "You are registered as: "+this.user.handle
      return result
    }) as Promise<boolean>
  }

 async signUp(){
    console.log("signup called")
    const handle:string = this.profileForm.get("handle").value;
    let avatarLink = this.profileForm.get("avatar").value;
    if (handle.length == 0) {
      return;
    }
    if (avatarLink.length == 0) {
      avatarLink = "../assets/img/avatar_placeholder.jpg";
    }
    const isRegistered = await this.registered
    if (!isRegistered) {
      try{
        await this.setUser.mutate({username:handle}).toPromise()//.then(()=>{
        this.user.handle = handle
        console.log("user registered")
      }catch(error){
        this.errorMessage = error
      }
    } else if(handle != this.user.handle){
        this.errorMessage = "Incorrect Username"
        console.log("username is incorrect")
        return
    }
    sessionStorage.setItem("userhash",this.user.hash)
    sessionStorage.setItem("username",this.user.handle)
    sessionStorage.setItem("avatar",avatarLink)
    this.router.navigate(["profile"]);
  };

  private async isRegistered():Promise<boolean>{
    if(!this.user)
    this.user =  await this.getProfileData()
    if(this.user)
     return this.user.handle != (null || undefined) ? true : false       
  }

  private getProfileData():Promise<User>{
    return this.myprofile.fetch().pipe(map(result=>{
        return new User(result.data.me.id, result.data.me.agent.username)
    })).toPromise().then((result)=> { return result},
      (reason)=>{ 
          this.errorMessage = reason
          return null
    }) as Promise<User> | null
  }
}
