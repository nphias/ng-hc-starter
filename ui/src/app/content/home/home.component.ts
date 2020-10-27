import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { MyProfileGQL } from 'src/app/graphql/queries/myprofile-gql';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  errorMessage:string
  
  constructor(private router: Router,private me:MyProfileGQL) { }

  ngOnInit() {
    if (!sessionStorage.getItem("userhash"))
      this.router.navigate(["signup"]);
      try{
        this.me.fetch().toPromise().then(result=>{
          console.log(result)
          if (!result.data.me.profile.username){ //session invalid,  user not registered
            this.logout() 
          }
        })
      }catch(exception){
        this.errorMessage = exception
      }
  }

  logout(){
    console.log("logging out")
    sessionStorage.clear()
    this.router.navigate(["signup"]);
  }

}
