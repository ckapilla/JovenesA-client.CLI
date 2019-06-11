import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { AdminsRouting } from './admins.routing';
// tslint:disable-next-line: max-line-length
import { AdminsCommunicationsComponent, AdminsComponent, AdminsHomeComponent, AdminsMemberComponent, AdminsMembersComponent, AdminsProfileComponent } from './index';
import { AdminsStudentComponent,  AdminsStudentsComponent, FollowUpEventsComponent, FollowUpRequestsComponent, FollowUpEventsAddComponent, FollowUpRequestsAddComponent } from './index';
import { AdminsStudentMRsComponent, MentorReportsStatusCountsComponent, MentorReportsSummaryTrackingComponent, MentorReportSummaryUpdatesComponent } from './index';
import { MentorReportFollowUpUpdatesComponent } from './index';

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
        MentorReportFollowUpUpdatesComponent,
        AdminsNavbarComponent,
        FollowUpRequestsComponent,
        FollowUpRequestsAddComponent,
        FollowUpEventsComponent,
        FollowUpEventsAddComponent

    ],
    exports: [
        AdminsStudentMRsComponent
    ]

})
export class AdminsModule { }
