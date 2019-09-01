import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { AdminsNavbarComponent } from './admins-navbar/admins-navbar.component';
import { AdminsRouting } from './admins.routing';
// tslint:disable-next-line: max-line-length
import { AdminsComponent, AdminsHomeComponent, AdminsMemberComponent, AdminsMembersComponent, AdminsStudentComponent, AdminsStudentMRsComponent, AdminsStudentsComponent, FollowUpEventsAddComponent, FollowUpRequestsAddComponent, FollowUpRequestsComponent, MentorReportFollowUpUpdatesComponent, MentorReportsStatusCountsComponent, MentorReportsSummaryTrackingComponent, MentorReportSummaryUpdatesComponent, SelfReportsTrackingComponent, StudentReportsStatusCountsComponent } from './index';
import { SponsorGroupComponent } from './sponsor-group/sponsor-group.component';
import { SponsorGroupsComponent } from './sponsor-groups/sponsor-groups.component';



// import { AdminsGradeHistoryComponent } from './index';

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
