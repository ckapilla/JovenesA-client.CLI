import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { ReportsMentorReportsSubmittedComponent } from './reports-mentor-reports-submitted/reports-mentor-reports-submitted.component';
import { ReportsMentorReportsComponent } from './reports-mentor-reports/reports-mentor-reports.component';
import { ReportsSponsorSummariesSentComponent } from './reports-sponsor-summaries-sent/reports-sponsor-summaries-sent.component';
import { ReportsStudentLettersComponent } from './reports-student-letters/reports-student-letters.component';
import { ReportsComponent } from './reports.component';

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
        component: ReportsMentorReportsComponent
      },
      // {
      //   path: 'mentor-reports2',
      //   component: ReportsMentorReports2Component
      // },
      {
        path: 'mentor-reports-submitted',
        component: ReportsMentorReportsSubmittedComponent
      },
      {
        path: 'student-letters',
        component: ReportsStudentLettersComponent
      },
      // {
      //   path: 'student-letters2',
      //   component: ReportsStudentLetters2Component
      // },
      // {
      //   path: 'sponsor-summaries-status',
      //   component: ReportsSponsorSummariesStatusComponent
      // },
      {
        path: 'sponsor-summaries-sent',
        component: ReportsSponsorSummariesSentComponent
      },
    ]
  }
];

export const ReportsRouting = RouterModule.forChild(routes);
