import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { GraphQLModule } from './graphql/graphql.module';
import { ContentModule } from './content/content.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HolochainService } from './core/holochain.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function initializeConnection(holochainService: HolochainService) {
  return (): Promise<any> => { 
    return holochainService.init();
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    AppRoutingModule,
    ContentModule,
    NgbModule    
  ],
  providers: [ 
    HolochainService,
    { provide: APP_INITIALIZER, useFactory: initializeConnection, deps: [HolochainService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
