import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard, ConfirmDeactivateMRSummaryUpdatesGuard } from '../app.routing-guards';
import { FollowUpEventsComponent } from '../app_shared/components/follow-up-events/follow-up-events.component';
import { AdminsMemberComponent } from './admins-member/admins-member.component';
import { AdminsMembersComponent } from './admins-members/admins-members.component';
import { AdminsStudentMRsComponent } from './admins-student-mrs/admins-student-mrs.component';
import { AdminsStudentListComponent } from './admins-students/admins-student-list/admins-student-list.component';
import { AdminsStudentSearchComponent } from './admins-students/admins-student-search/admins-student-search.component';
import { AdminsStudentComponent } from './admins-students/admins-student/admins-student.component';
import { AdminsComponent } from './admins.component';
import { FollowUpEventsAddComponent } from './follow-up-events-add/follow-up-events-add.component';
import { FollowUpRequestsAddComponent } from './follow-up-requests-add/follow-up-requests-add.component';
import { FollowUpRequestsComponent } from './follow-up-requests/follow-up-requests.component';
import { MentorReportsSummaryTrackingComponent } from './mr-summary-tracking/mr-summary-tracking.component';
import { MentorReportSummaryUpdatesComponent } from './mr-summary-updates/mr-summary-updates.component';
import { ReportsComponent } from './reports/reports.component';
import { SelfReportsTrackingComponent } from './self-report-tracking/self-report-tracking.component';
import { SponsorGroupComponent } from './sponsor-group/sponsor-group.component';
import { SponsorGroupsComponent } from './sponsor-groups/sponsor-groups.component';

const adminRoutes: Routes = [
  {
    path: '', // lazy loading
    component: AdminsComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminsMembersComponent // AdminsHomeComponent
      },
      // {
      //   path: 'home',
      //   component: AdminsHomeComponent
      // },
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
        path: 'members/member/:guid',
        component: AdminsMemberComponent
      },
      {
        path: 'students',
        component: AdminsStudentSearchComponent
      },
      // children: [
      //   {
      //     path: 'studentSearch',
      //     component: AdminsStudentSearchComponent
      //   },
      {
        path: 'students/studentList',
        component: AdminsStudentListComponent
        //  }
        // ]
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
      {
        path: 'reports',
        component: ReportsComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminsRouting { }
