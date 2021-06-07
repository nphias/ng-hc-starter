import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ContentModule } from './content/content.module'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HolochainService } from './services/holochain.service';
import { ClickOutsideDirective } from './helpers/clickout';

export function initializeConnection(holochainService: HolochainService) {
  return (): Promise<any> => { 
    return holochainService.init();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    ContentModule,
    AppRoutingModule
  ],
  providers: [
    HolochainService,
    { provide: APP_INITIALIZER, useFactory: initializeConnection, deps: [HolochainService], multi: true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
