import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { AdminsRouting } from './admins.routing';
// tslint:disable-next-line: max-line-length
import { AdminsCommunicationsComponent, AdminsComponent, AdminsHomeComponent, AdminsMemberComponent, AdminsMembersComponent, AdminsProfileComponent, AdminsStudentComponent, AdminsStudentMRsComponent, AdminsStudentsComponent, FollowUpEventsAddComponent, FollowUpRequestsAddComponent, FollowUpRequestsComponent, MentorReportFollowUpUpdatesComponent, MentorReportsStatusCountsComponent, MentorReportsSummaryTrackingComponent, MentorReportSummaryUpdatesComponent } from './index';
import { AdminsNavbarComponent } from './shared/admins-navbar/admins-navbar.component';
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
        AdminsProfileComponent,
        AdminsMembersComponent,
        AdminsCommunicationsComponent,
        AdminsMemberComponent,
        AdminsStudentsComponent,
        AdminsStudentComponent,
        AdminsStudentMRsComponent,
        MentorReportsSummaryTrackingComponent,
        MentorReportsStatusCountsComponent,
        MentorReportSummaryUpdatesComponent,
        MentorReportFollowUpUpdatesComponent,
        AdminsNavbarComponent,
        FollowUpRequestsComponent,
        FollowUpRequestsAddComponent,
        FollowUpEventsAddComponent,
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
