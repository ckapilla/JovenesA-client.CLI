import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { MentorReportsSubmittedComponent } from './mentor-reports-submitted/mentor-reports-submitted.component';
import { MentorReportsComponent } from './mentor-reports/mentor-reports.component';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { ReportsComponent } from './reports.component';
import { ReportsRouting } from './reports.routing';
import { SponsorSummariesSentComponent } from './sponsor-summaries-sent/sponsor-summaries-sent.component';
import { StudentLettersComponent } from './student-letters/student-letters.component';
import { StudentLetters2Component } from './student-letters2/student-letters2.component';

// // import { ReportsMentorReports2Component } from './index';
// // import { ReportsSponsorSummariesStatusComponent } from './index';


@NgModule({
  imports: [
    AppSharedModule,
    ReportsRouting
  ],
  declarations: [
    ReportsComponent,
    ReportsHomeComponent,
    MentorReportsComponent,
    // ReportsMentorReports2Component,
    StudentLettersComponent,
    StudentLetters2Component,
    // ReportsSponsorSummariesStatusComponent,
    SponsorSummariesSentComponent,
    MentorReportsSubmittedComponent
  ],
  entryComponents: [MentorReportsComponent,
    // Mentor2Component,
    StudentLettersComponent,
    StudentLetters2Component,
    // SponsorSummariesStatusComponent,
    SponsorSummariesSentComponent,
    MentorReportsSubmittedComponent]
})

export class ReportsModule {
  constructor() {
  }

}
