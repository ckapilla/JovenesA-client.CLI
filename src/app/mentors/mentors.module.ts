import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { FollowUpRequestsAddComponent } from './follow-up-requests-add/follow-up-requests-add.component';
import { FollowUpRequestsComponent } from './follow-up-requests/follow-up-requests.component';
import { ForumComponent } from './forum/forum.component';
import { MentorsHomeComponent } from './mentors-home/mentors-home.component';
import { MentorsProfileComponent } from './mentors-profile/mentors-profile.component';
import { MentorsComponent } from './mentors.component';
import { MentorsRouting } from './mentors.routing';
import { MonthlyReportsAddComponent } from './monthly-reports-add/monthly-reports-add.component';
import { MonthlyReportsEditComponent } from './monthly-reports-edit/monthly-reports-edit.component';
import { MonthlyReportsComponent } from './monthly-reports/monthly-reports.component';
import { MonthlyReports2AddComponent } from './monthly-reports2-add/monthly-reports2-add.component';
import { MonthlyReports2EditComponent } from './monthly-reports2-edit/monthly-reports2-edit.component';
import { MonthlyReports2Component } from './monthly-reports2/monthly-reports2.component';
import { MentorsNavbarComponent } from './shared/mentors-navbar/mentors-navbar.component';



@NgModule({
    imports: [
        AppSharedModule,
        MentorsRouting
        ],
    declarations: [
        MentorsComponent,
        MentorsNavbarComponent,
        MentorsHomeComponent,
        MentorsProfileComponent,
        MonthlyReportsComponent,
        MonthlyReports2Component,
        MonthlyReportsAddComponent,
        MonthlyReports2AddComponent,
        MonthlyReportsEditComponent,
        MonthlyReports2EditComponent,
        FollowUpRequestsAddComponent,
        FollowUpRequestsComponent,
        ForumComponent
        ],
})

export class MentorsModule { }
