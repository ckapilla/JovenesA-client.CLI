import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppSharedModule } from '../app_shared/app_shared.module';
// import { SelfReportsUpdatesComponent } from '../students/self-reports-updates/self-reports-updates.component';
import { AdminsHomeComponent } from './admins-home/admins-home.component';
import { AdminsMemberComponent } from './admins-members/admins-member/admins-member.component';
import { AdminsMemberListComponent } from './admins-members/admins-member-list/admins-member-list.component';
import { AdminsNavbarComponent } from './admins-navbar/admins-navbar.component';
import { AdminsStudentMRsComponent } from './admins-student-mrs/admins-student-mrs.component';
import { AdminsStudentListComponent } from './admins-students/admins-student-list/admins-student-list.component';
import { AdminsStudentSearchComponent } from './admins-students/admins-student-search/admins-student-search.component';
import { AdminsStudentComponent } from './admins-students/admins-student/admins-student.component';
import { AdminsComponent } from './admins.component';
import { AdminsRouting } from './admins.routing';
import { FollowUpEventsAddComponent } from './follow-up-events-add/follow-up-events-add.component';
import { FollowUpRequestsAddComponent } from './follow-up-requests-add/follow-up-requests-add.component';
import { FollowUpRequestsComponent } from './follow-up-requests/follow-up-requests.component';
// import { MentorReportFollowUpUpdatesComponent } from './mr-follow-up-updates/mr-follow-up-updates.component';
import { MentorReportsStatusCountsComponent } from './mr-status-counts/mr-status-counts.component';
import { MentorReportsSummaryTrackingComponent } from './mr-summary-tracking/mr-summary-tracking.component';
import { MentorReportSummaryUpdatesComponent } from './mr-summary-updates/mr-summary-updates.component';
import { MentorReportsSubmittedComponent } from './reports/mentor-reports-submitted/mentor-reports-submitted.component';
import { MentorReportsComponent } from './reports/mentor-reports/mentor-reports.component';
import { ReportsComponent } from './reports/reports.component';
import { SponsorSummariesSentComponent } from './reports/sponsor-summaries-sent/sponsor-summaries-sent.component';
import { StudentLettersComponent } from './reports/student-letters/student-letters.component';
import { StudentLetters2Component } from './reports/student-letters2/student-letters2.component';
import { SelfReportsTrackingComponent } from './self-report-tracking/self-report-tracking.component';
import { SponsorGroupComponent } from './sponsor-group/sponsor-group.component';
import { SponsorGroupsComponent } from './sponsor-groups/sponsor-groups.component';
import { StudentReportsStatusCountsComponent } from './ssr-status-counts/ssr-status-counts.component';
import { AdminsMemberSearchComponent } from './admins-members/admins-member-search/admins-member-search.component';





@NgModule({
    imports: [
        AppSharedModule,
        AdminsRouting,
        ReactiveFormsModule,
        FormsModule,
        NgbModule
    ],
    declarations: [
        AdminsComponent,
        AdminsHomeComponent,
        AdminsMemberListComponent,
        AdminsMemberComponent,
        AdminsStudentListComponent,
        AdminsStudentComponent,
        AdminsStudentMRsComponent,
        MentorReportsSummaryTrackingComponent,
        MentorReportsStatusCountsComponent,
        MentorReportSummaryUpdatesComponent,
        // MentorReportFollowUpUpdatesComponent,
        StudentReportsStatusCountsComponent,
        AdminsNavbarComponent,
        FollowUpRequestsComponent,
        FollowUpRequestsAddComponent,
        FollowUpEventsAddComponent,
        SelfReportsTrackingComponent,
        // SelfReportsUpdatesComponent,
        SponsorGroupsComponent,
        SponsorGroupComponent,
        // FollowUpEventsComponent


        ReportsComponent,
        MentorReportsComponent,
        // ReportsMentorReports2Component,
        StudentLettersComponent,
        StudentLetters2Component,
        // ReportsSponsorSummariesStatusComponent,
        SponsorSummariesSentComponent,
        MentorReportsSubmittedComponent,
        AdminsStudentSearchComponent,
        AdminsMemberSearchComponent


    ],
    exports: [
        AdminsStudentMRsComponent,
        SponsorGroupsComponent
    ],
    entryComponents: [MentorReportsComponent,
        // Mentor2Component,
        StudentLettersComponent,
        StudentLetters2Component,
        // SponsorSummariesStatusComponent,
        SponsorSummariesSentComponent,
        MentorReportsSubmittedComponent]
})
export class AdminsModule { }
