import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GraphQLModule } from './graphql/graphql.module';
import { ContentModule } from './content/content.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    AppRoutingModule,
    ContentModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
