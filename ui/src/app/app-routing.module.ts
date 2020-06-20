import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentRoutingModule } from './content/content-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'content',
    pathMatch: 'full'
  },
  {
    path: '**', // If no matching route found, go back to home route
    redirectTo: 'content',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), ContentRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
