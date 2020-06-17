import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  registered: Promise<boolean>|null = null;
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

 async signUp(){
   console.log(this.user)
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
        console.log(error)
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
     await this.getProfileData()
    if(this.user)
     return this.user.handle != (null || undefined) ? true : false       
  }

  private getProfileData():Promise<User>{
     return this.myprofile.fetch().pipe(map(result=>{
         return new User(result.data.me.id, result.data.me.agent.username)
       })).toPromise().then(result=> {
         if ( result ) {
           this.user = result 
             return result
         } else{
           console.log("no agent found")
         }
     }) as Promise<User>
  }

  ngOnInit() {
    this.registered = this.isRegistered()
  }
}
