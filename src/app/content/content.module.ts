
import { NgModule } from '@angular/core';
import { ContentRoutingModule } from './content-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { TimelineComponent } from './timeline/timeline.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    HomeComponent,
    TimelineComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ContentRoutingModule
  ],
  providers: []
})
export class ContentModule {}
