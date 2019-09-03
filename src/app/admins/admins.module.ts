import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { AdminsHomeComponent } from './admins-home/admins-home.component';
import { AdminsMemberComponent } from './admins-member/admins-member.component';
import { AdminsMembersComponent } from './admins-members/admins-members.component';
import { AdminsNavbarComponent } from './admins-navbar/admins-navbar.component';
import { AdminsStudentMRsComponent } from './admins-student-mrs/admins-student-mrs.component';
import { AdminsStudentComponent } from './admins-student/admins-student.component';
import { AdminsStudentsComponent } from './admins-students/admins-students.component';
import { AdminsComponent } from './admins.component';
import { AdminsRouting } from './admins.routing';
import { FollowUpEventsAddComponent } from './follow-up-events-add/follow-up-events-add.component';
import { FollowUpRequestsAddComponent } from './follow-up-requests-add/follow-up-requests-add.component';
import { FollowUpRequestsComponent } from './follow-up-requests/follow-up-requests.component';
import { MentorReportFollowUpUpdatesComponent } from './mr-follow-up-updates/mr-follow-up-updates.component';
import { MentorReportsStatusCountsComponent } from './mr-status-counts/mr-status-counts.component';
import { MentorReportsSummaryTrackingComponent } from './mr-summary-tracking/mr-summary-tracking.component';
import { MentorReportSummaryUpdatesComponent } from './mr-summary-updates/mr-summary-updates.component';
import { SelfReportsTrackingComponent } from './self-report-tracking/self-report-tracking.component';
import { SponsorGroupComponent } from './sponsor-group/sponsor-group.component';
import { SponsorGroupsComponent } from './sponsor-groups/sponsor-groups.component';
import { StudentReportsStatusCountsComponent } from './ssr-status-counts/ssr-status-counts.component';
// tslint:disable-next-line: max-line-length

@NgModule({
    imports: [
        AppSharedModule,
        AdminsRouting,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        AdminsComponent,
        AdminsHomeComponent,
        AdminsMembersComponent,
        AdminsMemberComponent,
        AdminsStudentsComponent,
        AdminsStudentComponent,
        AdminsStudentMRsComponent,
        MentorReportsSummaryTrackingComponent,
        MentorReportsStatusCountsComponent,
        MentorReportSummaryUpdatesComponent,
        MentorReportFollowUpUpdatesComponent,
        StudentReportsStatusCountsComponent,
        AdminsNavbarComponent,
        FollowUpRequestsComponent,
        FollowUpRequestsAddComponent,
        FollowUpEventsAddComponent,
        SelfReportsTrackingComponent,
        SponsorGroupsComponent,
        SponsorGroupComponent
        // FollowUpEventsComponent

    ],
    exports: [
        AdminsStudentMRsComponent,
        SponsorGroupsComponent
    ]

})
export class AdminsModule { }
