import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaMentorAuthGuard, ConfirmDeactivateMonthlyReportAddGuard } from '../app.routing-guards';
// tslint:disable-next-line: max-line-length
import { FollowUpRequestsAddComponent, FollowUpRequestsComponent, ForumComponent, MentorsComponent, MentorsProfileComponent, MonthlyReports2AddComponent, MonthlyReports2Component, MonthlyReports2EditComponent } from './index';

const routes: Routes = [
  {
    path: '', // lazy loading
    component: MentorsComponent,
    canActivate: [CanActivateViaMentorAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MonthlyReports2Component
      },
      // {
      //   path: 'home',
      //   component: MentorsHomeComponent
      // },
      {
        path: 'profile/:id',
        component: MentorsProfileComponent
      },
      {
        path: 'monthly-reports/:mentorId',
        component: MonthlyReports2Component
      },
      {
        path: 'monthly-reports', // use session userId
        component: MonthlyReports2Component
      },
      {
        path: 'monthly-reports-add/:mentorId/:studentId',
        component: MonthlyReports2AddComponent,
        canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
      },
      {
        path: 'monthly-reports-edit/:mentorReportId',
        component: MonthlyReports2EditComponent,
        canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
      },
      {
        path: 'follow-up-requests-add',
        component: FollowUpRequestsAddComponent,
        canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
      },
      {
        path: 'follow-up-requests',
        component: FollowUpRequestsComponent
      },
      {
        path: 'forum',
        component: ForumComponent
      }
    ]
  }
];

export const MentorsRouting = RouterModule.forChild(routes);

