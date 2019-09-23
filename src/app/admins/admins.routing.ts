import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard, ConfirmDeactivateMRSummaryUpdatesGuard } from '../app.routing-guards';
import { FollowUpEventsComponent } from '../app_shared/components/follow-up-events/follow-up-events.component';
// import { SelfReportsUpdatesComponent } from '../students/self-reports-updates/self-reports-updates.component';
import { AdminsHomeComponent } from './admins-home/admins-home.component';
import { AdminsMemberComponent } from './admins-member/admins-member.component';
import { AdminsMembersComponent } from './admins-members/admins-members.component';
import { AdminsStudentMRsComponent } from './admins-student-mrs/admins-student-mrs.component';
import { AdminsStudentComponent } from './admins-student/admins-student.component';
import { AdminsStudentsComponent } from './admins-students/admins-students.component';
import { AdminsComponent } from './admins.component';
import { FollowUpEventsAddComponent } from './follow-up-events-add/follow-up-events-add.component';
import { FollowUpRequestsAddComponent } from './follow-up-requests-add/follow-up-requests-add.component';
import { FollowUpRequestsComponent } from './follow-up-requests/follow-up-requests.component';
import { MentorReportsSummaryTrackingComponent } from './mr-summary-tracking/mr-summary-tracking.component';
import { MentorReportSummaryUpdatesComponent } from './mr-summary-updates/mr-summary-updates.component';
import { SelfReportsTrackingComponent } from './self-report-tracking/self-report-tracking.component';
import { SponsorGroupComponent } from './sponsor-group/sponsor-group.component';
import { SponsorGroupsComponent } from './sponsor-groups/sponsor-groups.component';

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
        path: 'members',
        component: AdminsMembersComponent
      },
      {
        path: 'sponsor-groups',
        component: SponsorGroupsComponent
      },
      {
        path: 'sponsor-group/:id',
        component: SponsorGroupComponent
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
        path: 'students/student', // :guid',
        component: AdminsStudentComponent
      },
      {
        path: 'students/student/mentorReports/:guid/:studentName',
        component: AdminsStudentMRsComponent
      },
      // {
      //   path: 'students/grade-history/:id',
      //   component: AdminsGradeHistoryComponent
      // },
      {
        path: 'mentor-reports/summary-tracking/:id/:year/:month/:summaryStatus/:highlight',
        component: MentorReportsSummaryTrackingComponent
      },

      {
        path: 'mentor-reports/summary-tracking',
        component: MentorReportsSummaryTrackingComponent
      },

      {
        path: 'mentor-reports/summary-updates', // /:mentorReportId',
        component: MentorReportSummaryUpdatesComponent,
        canDeactivate: [ConfirmDeactivateMRSummaryUpdatesGuard]
      },
      {
        path: 'follow-up-requests',
        component: FollowUpRequestsComponent
      },
      {
        path: 'self-reports/tracking',
        component: SelfReportsTrackingComponent
      },
      {
        path: 'self-reports/tracking/:id/:year/:period/:summaryStatus/:highlight',
        component: SelfReportsTrackingComponent
      },
      // {
      //   path: 'self-reports/updates',
      //   component: SelfReportsUpdatesComponent
      // },
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
