import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { ProfilesStore } from 'src/app/stores/profiles.store';
import { ProfilesService } from 'src/app/services/profiles.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public errorMessage:string = ""
  public breadCrumbs: string[] = []
  public filteredCrumbs:string[] =[]


  constructor(
    public p_store:ProfilesStore,
    private profilesService: ProfilesService,
    private router: Router, 
    ) { 
    
  }

  ngOnInit() {
    if (!sessionStorage.getItem("userhash"))
        this.router.navigate(["signup"]);

    try{

    }catch(exception){
      this.errorMessage = exception
    }
  }

  logout(){
    console.log("logging out")
    sessionStorage.clear()
    this.p_store.reset()
    this.router.navigate(["signup"]);
  }

  randomIntFromInterval(min: number, max:number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
