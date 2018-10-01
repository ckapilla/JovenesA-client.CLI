import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaMentorAuthGuard, ConfirmDeactivateMonthlyReportAddGuard } from '../app.routing-guards';
import {
  MentorsComponent, MentorsHomeComponent, MentorsProfileComponent,
    MonthlyReportsAddComponent, MonthlyReportsEditComponent, MonthlyReportsComponent
} from './index';


const routes: Routes = [
  {
    path: '', // lazy loading
    component: MentorsComponent,
    canActivate: [CanActivateViaMentorAuthGuard],
    children: [
        {
          path: '',
          pathMatch: 'full',
          component: MonthlyReportsComponent
        },
        {
          path: 'home',
          component: MentorsHomeComponent
        },
        {
          path: 'profile/:id',
          component: MentorsProfileComponent
        },
        {
          path: 'monthly-reports/:mentorId',
          component: MonthlyReportsComponent
        },
        {
          path: 'monthly-reports', // use session userId
          component: MonthlyReportsComponent
        },
        {
          path: 'monthly-reports-add/:mentorId/:studentId',
          component: MonthlyReportsAddComponent,
          canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
        },
        {
          path: 'monthly-reports-edit/:mentorReportId',
          component: MonthlyReportsEditComponent,
          canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
        }
      ]
  }
];

export const MentorsRouting = RouterModule.forChild(routes);

