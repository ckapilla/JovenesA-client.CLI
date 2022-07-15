import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSharedModule } from '../_shared/_shared.module';
// import { SelfReportsUpdatesComponent } from '../students/self-reports-updates/self-reports-updates.component';
import { AdminsHomeComponent } from './admins-home/admins-home.component';
import { AdminsAddMemberComponent } from './admins-members/admins-add-member/admins-add-member.component';
import { AdminsMemberListComponent } from './admins-members/admins-member-list/admins-member-list.component';
import { AdminsMemberSearchComponent } from './admins-members/admins-member-search/admins-member-search.component';
import { AdminsMemberComponent } from './admins-members/admins-member/admins-member.component';
import { MentorReportsSubmittedComponent } from './admins-mr/mentor-reports-submitted/mentor-reports-submitted.component';
import { MentorReportsContainerComponent } from './admins-mr/mr-container/mr-container.component';
import { MentorReportsStatusCountsComponent } from './admins-mr/mr-status-counts/mr-status-counts.component';
import { MentorReportsSummaryTrackingComponent } from './admins-mr/mr-summary-tracking/mr-summary-tracking.component';
import { MentorReportSummaryUpdatesComponent } from './admins-mr/mr-summary-updates/mr-summary-updates.component';
import { AdminsNavbarComponent } from './admins-navbar/admins-navbar.component';
import { AdminsRoutingModule } from './admins-routing.module';
import { StudentSelfReportsContainerComponent } from './admins-ssr/ssr-container/ssr-container.component';
import { StudentSelfReportsStatusCountsComponent } from './admins-ssr/ssr-status-counts/ssr-status-counts.component';
import { StudentSelfReportsSummaryTrackingComponent } from './admins-ssr/ssr-summary-tracking/ssr-summary-tracking.component';
import { StudentSelfReportsSummaryUpdatesComponent } from './admins-ssr/ssr-summary-updates/ssr-summary-updates.component';

import { AdminsStudentMRsComponent } from './admins-student-mrs/admins-student-mrs.component';
import { AdminsStudentQRsComponent } from './admins-student-qrs/admins-student-qrs.component';
import { AdminsStudentContainerComponent } from './admins-students/admins-student-container/admins-student-container.component';
import { AdminsStudentListComponent } from './admins-students/admins-student-list/admins-student-list.component';
import { AdminsStudentMemberDataComponent } from './admins-students/admins-student-member-profile/admins-student-member-profile.component';
import { AdminsStudentComponent } from './admins-students/admins-student-profile/admins-student-student-profile.component';
import { AdminsStudentSearchComponent } from './admins-students/admins-student-search/admins-student-search.component';
import { AdminsComponent } from './admins.component';
import { FollowUpEventsAddComponent } from './follow-up-events-add/follow-up-events-add.component';
import { FollowUpRequestDetailsComponent } from './follow-up-request-details/follow-up-request-details.component';
import { FollowUpRequestsAddComponent } from './follow-up-requests-add/follow-up-requests-add.component';
import { FollowUpRequestsComponent } from './follow-up-requests/follow-up-requests.component';
import { SponsorGroupComponent } from './sponsor-group/sponsor-group.component';
import { SponsorGroupsComponent } from './sponsor-groups/sponsor-groups.component';
import { StudentReportsStatusCountsComponent } from './ssr-status-counts/ssr-status-counts.component';
import { ServerEnvironmentComponent } from './utilities/server-environment/server-environment.component';
import { TestNamesVisibilityComponent } from './utilities/test-names-visibility/test-names-visibility.component';
import { UtilitiesComponent } from './utilities/utilities.component';
// import { MentorReportsComponent } from './reports/mentor-reports/mentor-reports.component';

@NgModule({
  imports: [AppSharedModule, AdminsRoutingModule, ReactiveFormsModule, FormsModule, NgbModule],
  declarations: [
    AdminsComponent,
    AdminsHomeComponent,
    AdminsMemberListComponent,
    AdminsMemberComponent,
    AdminsAddMemberComponent,
    AdminsStudentListComponent,
    AdminsStudentComponent,
    AdminsStudentMRsComponent,
    MentorReportsContainerComponent,
    MentorReportsSummaryTrackingComponent,
    MentorReportsStatusCountsComponent,
    MentorReportSummaryUpdatesComponent,
    ServerEnvironmentComponent,
    // MentorReportFollowUpUpdatesComponent,
    StudentReportsStatusCountsComponent,
    StudentSelfReportsContainerComponent,
    StudentSelfReportsSummaryTrackingComponent,
    StudentSelfReportsStatusCountsComponent,
    StudentSelfReportsSummaryUpdatesComponent,
    AdminsNavbarComponent,
    FollowUpRequestsComponent,
    FollowUpRequestDetailsComponent,
    FollowUpRequestsAddComponent,
    FollowUpEventsAddComponent,
    // SelfReportsUpdatesComponent,
    SponsorGroupsComponent,
    SponsorGroupComponent,
    // FollowUpEventsComponent
    UtilitiesComponent,
    MentorReportsSubmittedComponent,
    AdminsStudentSearchComponent,
    AdminsMemberSearchComponent,
    TestNamesVisibilityComponent,
    AdminsStudentContainerComponent,
    AdminsStudentMemberDataComponent,
    AdminsStudentQRsComponent
  ],
  exports: [AdminsStudentMRsComponent, AdminsStudentQRsComponent, SponsorGroupsComponent],
  entryComponents: [ServerEnvironmentComponent, MentorReportsSubmittedComponent]
})
export class AdminsModule {}
