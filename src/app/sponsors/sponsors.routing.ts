import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaSponsorAuthGuard } from '../app.routing-guards';
import { SponsorsHomeComponent } from './sponsors-home/sponsors-home.component';
import { SponsorsComponent } from './sponsors.component';

const routes: Routes = [
  {
    path: '', // lazy loading
    component: SponsorsComponent,
    canActivate: [CanActivateViaSponsorAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SponsorsHomeComponent
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

export const SponsorsRouting = RouterModule.forChild(routes);
