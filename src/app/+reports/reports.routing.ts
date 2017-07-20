import { Routes, RouterModule } from '@angular/router';
import { ReportsHomeComponent } from './index';
import { ReportsComponent } from './index';
import { ReportsMentorReportsComponent } from './index';
import { ReportsMentorReports2Component } from './index';
import { ReportsStudentLettersComponent } from './index';
import { ReportsStudentLetters2Component } from './index';
import { SponsorSummaryEditComponent } from './index';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';

const routes: Routes = [
  {
    path: 'reports',
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
        {
          path: 'mentor-reports2',
          component: ReportsMentorReports2Component
        },
        {
          path: 'sponsor-summary-edit/:mentorReportId',
          component: SponsorSummaryEditComponent
        },
        {
          path: 'student-letters',
          component: ReportsStudentLettersComponent
        },
        {
          path: 'student-letters2',
          component: ReportsStudentLetters2Component
        },
    ]
  }
];

export const ReportsRouting = RouterModule.forChild(routes);
