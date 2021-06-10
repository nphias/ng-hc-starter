
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'mutualize-rsm';
  menuIsOpen = false;
  navIsOpen = false;

  constructor(
    private router: Router
  ) {}


  menutoggle(){
    (this.menuIsOpen === false) ? this.menuIsOpen = true : this.menuIsOpen = false
  }
  navtoggle(){
    (this.navIsOpen === false) ? this.navIsOpen = true : this.navIsOpen = false
  }

  closeMenu(){
    this.menuIsOpen = false
  }

  logout(){
    console.log("logging out")
    sessionStorage.clear()
    this.router.navigate(["signup"]);
    return false
  }

  navProfile(){
    this.router.navigate(["profile"]);
    return false
  }
}
