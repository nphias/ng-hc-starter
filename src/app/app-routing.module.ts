import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentRoutingModule } from './content/content-routing.module';
import { HomeComponent } from './content/home/home.component'
import { ProfileComponent } from './content/profile/profile.component';
import { SignupComponent } from './content/signup/signup.component';

const routes: Routes = [ 
  {
    path: '', redirectTo: 'content', pathMatch: 'full'
  },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { // If no matching route found, go back to home route
    path: '**', redirectTo: 'content', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ContentRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
