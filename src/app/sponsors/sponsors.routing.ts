import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaSponsorAuthGuard } from '../app.routing-guards';
import { SponsorsHomeComponent } from './sponsors-home/sponsors-home.component';
import { SponsorsComponent } from './sponsors.component';

const sponsorRoutes: Routes = [
  {
    path: '', // lazy loading
    component: SponsorsComponent,
    canActivate: [CanActivateViaSponsorAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SponsorsHomeComponent,
        // redirectTo: 'sponsors-home.component'
      },
      {
        path: 'home',
        component: SponsorsHomeComponent
      },
      // {
      //   path: 'profile/:id',
      //   component: MentorsProfileComponent
      // },
      // {
      //   path: 'quarterly-reports',
      //   component: ConsolidatedReportsComponent
      // },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(sponsorRoutes)],
  exports: [RouterModule]
})
export class SponsorsRoutingModule { }
