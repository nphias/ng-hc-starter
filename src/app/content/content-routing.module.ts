import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { TimelineComponent } from './timeline/timeline.component';

// Import all the components for which navigation service has to be activated
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },

  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'timeline',
    component: TimelineComponent
  },
  {
    path: '**', // If no matching route found, go back to home route
    component: SignupComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
