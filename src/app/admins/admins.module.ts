import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { AdminsRouting } from './admins.routing';
import { AdminsCommunicationsComponent, AdminsComponent, AdminsHomeComponent, AdminsMemberComponent, AdminsMembersComponent, AdminsProfileComponent, AdminsStudentComponent, AdminsStudentMRsComponent, AdminsStudentsComponent, MentorReportFollowUpUpdatesComponent, MentorReportsFollowUpTrackingComponent, MentorReportsStatusCountsComponent, MentorReportsSummaryTrackingComponent, MentorReportSummaryUpdatesComponent } from './index';
import { AdminsNavbarComponent } from './shared/admins-navbar/admins-navbar.component';
import { FollowUpTrackingComponent } from './follow-up-tracking/follow-up-tracking.component';

// import { AdminsGradeHistoryComponent } from './index';

@NgModule({
    imports: [
        AppSharedModule,
        AdminsRouting,
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

        // AdminsGradeHistoryComponent,

        MentorReportsSummaryTrackingComponent,
        MentorReportsStatusCountsComponent,
        MentorReportSummaryUpdatesComponent,
        MentorReportsFollowUpTrackingComponent,
        MentorReportFollowUpUpdatesComponent,
        AdminsNavbarComponent,
        FollowUpTrackingComponent
    ],
    exports: [
        AdminsStudentMRsComponent
    ]

})
export class AdminsModule { }
