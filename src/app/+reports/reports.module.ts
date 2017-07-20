import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { ReportsComponent } from './reports.component';
import { ReportsNavbarComponent } from './shared/reports-navbar/reports-navbar.component';
import { ReportsRouting } from './reports.routing';
import { SqlReports } from './shared/services/sql-reports';


import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { ReportsMentorReportsComponent } from './index';
import { ReportsMentorReports2Component } from './index';
import { ReportsStudentLettersComponent } from './index';
import { ReportsStudentLetters2Component } from './index';
import { SponsorSummaryEditComponent } from './index';

@NgModule({
    imports: [
        AppSharedModule,
        ReportsRouting
        ],
    declarations: [
      ReportsComponent,
      ReportsNavbarComponent,
      ReportsHomeComponent,
      ReportsMentorReportsComponent,
      ReportsMentorReports2Component,
      ReportsStudentLettersComponent,
      ReportsStudentLetters2Component,
      SponsorSummaryEditComponent
    ],
    providers: [
      SqlReports,
    ]
})

export class ReportsModule { }
