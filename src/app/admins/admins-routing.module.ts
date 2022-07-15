import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard, ConfirmDeactivateMRSummaryUpdatesGuard, ConfirmDeactivateStudentProfileUpdatesGuard } from '../app.routing-guards';
import { FollowUpEventsComponent } from '../_shared/components/follow-up-events/follow-up-events.component';
import { AdminsAddMemberComponent } from './admins-members/admins-add-member/admins-add-member.component';
import { AdminsMemberListComponent } from './admins-members/admins-member-list/admins-member-list.component';
import { AdminsMemberSearchComponent } from './admins-members/admins-member-search/admins-member-search.component';
import { AdminsMemberComponent } from './admins-members/admins-member/admins-member.component';
import { MentorReportsContainerComponent } from './admins-mr/mr-container/mr-container.component';
import { MentorReportsSummaryTrackingComponent } from './admins-mr/mr-summary-tracking/mr-summary-tracking.component';
import { StudentSelfReportsContainerComponent } from './admins-ssr/ssr-container/ssr-container.component';
import { StudentSelfReportsSummaryTrackingComponent } from './admins-ssr/ssr-summary-tracking/ssr-summary-tracking.component';
import { StudentSelfReportsSummaryUpdatesComponent } from './admins-ssr/ssr-summary-updates/ssr-summary-updates.component';
import { AdminsStudentMRsComponent } from './admins-student-mrs/admins-student-mrs.component';
import { AdminsStudentContainerComponent } from './admins-students/admins-student-container/admins-student-container.component';
import { AdminsStudentListComponent } from './admins-students/admins-student-list/admins-student-list.component';
import { AdminsStudentSearchComponent } from './admins-students/admins-student-search/admins-student-search.component';
import { AdminsComponent } from './admins.component';
import { FollowUpEventsAddComponent } from './follow-up-events-add/follow-up-events-add.component';
import { FollowUpRequestDetailsComponent } from './follow-up-request-details/follow-up-request-details.component';
import { FollowUpRequestsAddComponent } from './follow-up-requests-add/follow-up-requests-add.component';
import { FollowUpRequestsComponent } from './follow-up-requests/follow-up-requests.component';
import { SponsorGroupComponent } from './sponsor-group/sponsor-group.component';
import { SponsorGroupsComponent } from './sponsor-groups/sponsor-groups.component';
import { UtilitiesComponent } from './utilities/utilities.component';

const adminRoutes: Routes = [
  {
    path: '', // lazy loading
    component: AdminsComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminsStudentSearchComponent// AdminsHomeComponent
      },
      // {
      //   path: 'becas-home',
      //   component: AdminsHomeComponent
      // },
      {
        path: 'sponsor-groups',
        component: SponsorGroupsComponent
      },
      {
        path: 'sponsor-group/:id',
        component: SponsorGroupComponent
      },


      {
        path: 'members',
        component: AdminsMemberSearchComponent
      },
      {
        path: 'members/memberList',
        component: AdminsMemberListComponent
      },
      {
        path: 'members/createNewMember',
        component: AdminsAddMemberComponent,
      },

      {
        path: 'members/member', // using guid ; query param guid:guid',
        component: AdminsMemberComponent
      },

      {
        path: 'students',
        component: AdminsStudentSearchComponent
      },
      {
        path: 'students/studentList',
        component: AdminsStudentListComponent
      },
      {
        path: 'students/student-container', // :guid',
        component: AdminsStudentContainerComponent,
        canDeactivate: [ConfirmDeactivateStudentProfileUpdatesGuard]
      },


      {
        path: 'students/student/mentorReports', // using query params /:mentorId/:mentorGUId/:studentGUId/:studentName',
        component: AdminsStudentMRsComponent
      },
      // {
      //   path: 'students/grade-history/:id',
      //   component: AdminsGradeHistoryComponent
      // },
      {
        path: 'mentor-reports/summary-tracking', // using query param /:id/:year/:month/:summaryStatus/:highlight',
        component: MentorReportsSummaryTrackingComponent
      },

      {
        path: 'mentor-reports/mr-container',
        component: MentorReportsContainerComponent
      },

      {
        path: 'student-reports/summary-updates', // /:mentorReportId',
        component: StudentSelfReportsSummaryUpdatesComponent,
        canDeactivate: [ConfirmDeactivateMRSummaryUpdatesGuard]
      },

      {
        path: 'student-reports/summary-tracking', // using query param /:id/:year/:month/:summaryStatus/:highlight',
        component: StudentSelfReportsSummaryTrackingComponent
      },

      {
        path: 'student-reports/ssr-container',
        component: StudentSelfReportsContainerComponent
      },

      {
        path: 'student-reports/summary-updates', // /:mentorReportId',
        component: StudentSelfReportsSummaryUpdatesComponent,
        canDeactivate: [ConfirmDeactivateMRSummaryUpdatesGuard]
      },


      {
        path: 'follow-up-requests',
        component: FollowUpRequestsComponent
      },
      {
        path: 'follow-up-request-details/:requestId',
        component: FollowUpRequestDetailsComponent
      },
      // {
      //   path: 'self-reports/tracking/:id/:year/:period/:summaryStatus/:highlight',
      //   component: SelfReportTrackingComponent
      // },
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
      // {
      //   path: 'reports',
      //   component: ReportsComponent
      // },
      {
        path: 'utilities',
        component: UtilitiesComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
