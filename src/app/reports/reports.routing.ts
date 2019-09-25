import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { MentorReportsSubmittedComponent } from './mentor-reports-submitted/mentor-reports-submitted.component';
import { MentorReportsComponent } from './mentor-reports/mentor-reports.component';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { ReportsComponent } from './reports.component';
import { SponsorSummariesSentComponent } from './sponsor-summaries-sent/sponsor-summaries-sent.component';
import { StudentLettersComponent } from './student-letters/student-letters.component';

const routes: Routes = [
  {
    // path: 'reports',  // non lazy loading
    path: '', // lazy loading
    component: ReportsComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ReportsHomeComponent
      },
      {
        path: 'mentor-reports',
        component: MentorReportsComponent
      },
      // {
      //   path: 'mentor-reports2',
      //   component: ReportsMentorReports2Component
      // },
      {
        path: 'mentor-reports-submitted',
        component: MentorReportsSubmittedComponent
      },
      {
        path: 'student-letters',
        component: StudentLettersComponent
      },
      // {
      //   path: 'student-letters2',
      //   component: StudentLetters2Component
      // },
      // {
      //   path: 'sponsor-summaries-status',
      //   component: SponsorSummariesStatusComponent
      // },
      {
        path: 'sponsor-summaries-sent',
        component: SponsorSummariesSentComponent
      },
    ]
  }
];

export const ReportsRouting = RouterModule.forChild(routes);
