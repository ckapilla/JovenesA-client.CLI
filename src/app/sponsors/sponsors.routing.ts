import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaSponsorAuthGuard } from '../app.routing-guards';
import { SponsorsContainerComponent } from './sponsors-container/sponsors-container.component';
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
        component: SponsorsContainerComponent,
        // redirectTo: 'sponsors-container.component'
      },
      {
        path: 'home',
        component: SponsorsContainerComponent
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
