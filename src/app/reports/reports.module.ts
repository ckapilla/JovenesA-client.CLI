import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { ReportsMentorReportsSubmittedComponent } from './reports-mentor-reports-submitted/reports-mentor-reports-submitted.component';
import { ReportsMentorReportsComponent } from './reports-mentor-reports/reports-mentor-reports.component';
import { ReportsNavbarComponent } from './reports-navbar/reports-navbar.component';
import { ReportsSponsorSummariesSentComponent } from './reports-sponsor-summaries-sent/reports-sponsor-summaries-sent.component';
import { ReportsStudentLettersComponent } from './reports-student-letters/reports-student-letters.component';
import { ReportsStudentLetters2Component } from './reports-student-letters2/reports-student-letters2.component';
import { ReportsComponent } from './reports.component';
import { ReportsRouting } from './reports.routing';

// // import { ReportsMentorReports2Component } from './index';
// // import { ReportsSponsorSummariesStatusComponent } from './index';


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
    // ReportsMentorReports2Component,
    ReportsStudentLettersComponent,
    ReportsStudentLetters2Component,
    // ReportsSponsorSummariesStatusComponent,
    ReportsSponsorSummariesSentComponent,
    ReportsMentorReportsSubmittedComponent
  ]
})

export class ReportsModule {
  constructor() {
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%ReportsModule load');
  }

}
