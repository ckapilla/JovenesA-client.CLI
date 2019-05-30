import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { AdminsRouting } from './admins.routing';
// tslint:disable-next-line: max-line-length
import { AdminsCommunicationsComponent, AdminsComponent, AdminsHomeComponent, AdminsMemberComponent, AdminsMembersComponent, AdminsProfileComponent, AdminsStudentComponent, AdminsStudentMRsComponent, AdminsStudentsComponent, FollowUpEventsComponent, FollowUpRequestsComponent, MentorReportsStatusCountsComponent, MentorReportsSummaryTrackingComponent, MentorReportSummaryUpdatesComponent } from './index';
import { AdminsNavbarComponent } from './shared/admins-navbar/admins-navbar.component';


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
        MentorReportsSummaryTrackingComponent,
        MentorReportsStatusCountsComponent,
        MentorReportSummaryUpdatesComponent,
        AdminsNavbarComponent,
        FollowUpRequestsComponent,
        FollowUpEventsComponent
    ],
    exports: [
        AdminsStudentMRsComponent
    ]

})
export class AdminsModule { }
