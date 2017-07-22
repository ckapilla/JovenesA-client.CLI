import { NgModule } from '@angular/core';

import { AppSharedModule } from '../app_shared/app_shared.module';
import { AdminsComponent } from './index';
import { AdminsHomeComponent } from './index';
import { AdminsProfileComponent } from './index';
import { AdminsMembersComponent } from './index';
import { AdminsCommunicationsComponent } from './index';
import { AdminsMemberComponent } from './index';
import { AdminsStudentsComponent } from './index';
import { AdminsStudentComponent } from './index';
import { MentorReportSummaryUpdatesComponent } from './index';
import { MentorReportsSummaryTrackingComponent } from './index';
import { MentorReportsFollowUpTrackingComponent } from './index';
import { MentorReportFollowUpUpdatesComponent } from './index';

import { AdminsNavbarComponent } from './shared/admins-navbar/admins-navbar.component';
import { AdminsRouting } from './admins.routing';

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

        // AdminsGradeHistoryComponent,

        MentorReportsSummaryTrackingComponent,
        MentorReportSummaryUpdatesComponent,
        MentorReportsFollowUpTrackingComponent,
        MentorReportFollowUpUpdatesComponent,
        AdminsNavbarComponent
        ],
})
export class AdminsModule { }
