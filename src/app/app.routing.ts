import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //...HomeRoutes,
//  ...AboutRoutes,
  //...AdminRoutes,
  //...MentorRoutes,
  //...ReportsRoutes,
  //...StudentRoutes
  {
    path: 'Home/Mentors',
    redirectTo: '/mentors'
  },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [

];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes,{enableTracing: false});

