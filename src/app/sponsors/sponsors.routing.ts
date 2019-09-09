import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { ConsolidatedReportsComponent } from './consolidated-reports/consolidated-reports.component';
import { SponsorsHomeComponent } from './sponsors-home/sponsors-home.component';
import { SponsorsComponent } from './sponsors.component';

const routes: Routes = [
  {
    path: '', // lazy loading
    component: SponsorsComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: SponsorsHomeComponent
      },
      // {
      //   path: 'home',
      //   component: SponsorsHomeComponent
      // },
      // {
      //   path: 'profile/:id',
      //   component: MentorsProfileComponent
      // },
      {
        path: 'quarterly-reports',
        component: ConsolidatedReportsComponent
      },

    ]
  }
];

export const SponsorsRouting = RouterModule.forChild(routes);
