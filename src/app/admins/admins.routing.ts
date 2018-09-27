import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard, ConfirmDeactivateSummaryTrackingGuard } from '../app.routing-guards';
import { AdminsCommunicationsComponent, AdminsComponent, AdminsHomeComponent, AdminsMemberComponent, AdminsMembersComponent, AdminsProfileComponent, AdminsStudentComponent, AdminsStudentsComponent, MentorReportFollowUpUpdatesComponent, MentorReportsFollowUpTrackingComponent, MentorReportsSummaryTrackingComponent, MentorReportSummaryUpdatesComponent } from './index';

// import { AdminsGradeHistoryComponent } from './index';

const routes: Routes = [
  {
    path: '', // lazy loading
    component: AdminsComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
        {
          path: '',
          pathMatch: 'full',
          component: MentorReportsSummaryTrackingComponent
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
          path: 'mentor-reports/follow-up-tracking',
          component: MentorReportsFollowUpTrackingComponent
        },
        {
          path: 'mentor-reports/follow-up-updates/:mentorReportId',
          component: MentorReportFollowUpUpdatesComponent
        }
      ]
  }
];
export const AdminsRouting = RouterModule.forChild(routes);
