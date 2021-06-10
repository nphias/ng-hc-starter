
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ContentRoutingModule} from './content-routing.module'
import { MobxAngularModule } from 'mobx-angular';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './home/userlist/userlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
 
@NgModule({
  imports: [
    CommonModule,
    ContentRoutingModule,
    MobxAngularModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
     UserListComponent,
     HomeComponent,
     SignupComponent,
     ProfileComponent
     ],
})
export class ContentModule {}
