import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard, ConfirmDeactivateSummaryTrackingGuard } from '../app.routing-guards';
// tslint:disable-next-line: max-line-length
import { AdminsCommunicationsComponent, AdminsComponent, AdminsHomeComponent, AdminsMemberComponent, AdminsMembersComponent, AdminsProfileComponent, AdminsStudentComponent, AdminsStudentMRsComponent, AdminsStudentsComponent, FollowUpEventsAddComponent, FollowUpRequestsAddComponent, FollowUpRequestsComponent, MentorReportsSummaryTrackingComponent, MentorReportSummaryUpdatesComponent } from './index';
import { FollowUpEventsComponent } from '../app_shared/components/follow-up-events/follow-up-events.component';

const routes: Routes = [
  {
    path: '', // lazy loading
    component: AdminsComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
        {
          path: '',
          pathMatch: 'full',
          component: AdminsHomeComponent
        },
        {
          path: 'home',
          component: AdminsHomeComponent
        },
        {
          path: 'profile/:id',
          component: AdminsProfileComponent
        },
        {
          path: 'members',
          component: AdminsMembersComponent
        },
        {
          path: 'members/communications/:id',
          component: AdminsCommunicationsComponent
        },
        {
          path: 'members/member/:id',
          component: AdminsMemberComponent
        },
        {
          path: 'students',
          component: AdminsStudentsComponent
        },
        {
          path: 'students/student', // /:id',
          component: AdminsStudentComponent
      },
      {
        path: 'students/student/mentorReports/:id/:studentName',
        component: AdminsStudentMRsComponent
     },
        // {
        //   path: 'students/grade-history/:id',
        //   component: AdminsGradeHistoryComponent
        // },
        {
          path: 'mentor-reports/summary-tracking/:id/:year/:month/:summaryStatus/:highlight',
          component: MentorReportsSummaryTrackingComponent,
          canDeactivate: [ConfirmDeactivateSummaryTrackingGuard]
        },

        {
          path: 'mentor-reports/summary-tracking',
          component: MentorReportsSummaryTrackingComponent
        },

        {
          path: 'mentor-reports/summary-updates', // /:mentorReportId',
          component: MentorReportSummaryUpdatesComponent
        },
        {
          path: 'follow-up-requests',
          component: FollowUpRequestsComponent
        },
        {
          path: 'follow-up-events',
          component: FollowUpEventsComponent
        },
        {
          path: 'follow-up-requests-add',
          component: FollowUpRequestsAddComponent
        },
        {
          path: 'follow-up-events-add/:requestId',
          component: FollowUpEventsAddComponent
        },
      ]
  }
];
export const AdminsRouting = RouterModule.forChild(routes);
