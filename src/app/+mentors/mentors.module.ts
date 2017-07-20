import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';

import { MentorsComponent } from './mentors.component';
import { MentorsNavbarComponent } from './shared/mentors-navbar/mentors-navbar.component';
import { MentorsHomeComponent } from './mentors-home/mentors-home.component';
import { MentorsProfileComponent } from './mentors-profile/mentors-profile.component';
import { MonthlyReportsComponent } from './monthly-reports/monthly-reports.component';
import { MonthlyReportsAddComponent } from './monthly-reports-add/monthly-reports-add.component';
import { MentorsRouting } from './mentors.routing';
import {AssignedStudentsComponent } from './assigned-students/assigned-students.component';

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
        MonthlyReportsAddComponent,
        AssignedStudentsComponent
        ],
})

export class MentorsModule { }
