import { Routes, RouterModule } from '@angular/router';
import { AdminsHomeComponent } from './index';
import { AdminsProfileComponent } from './index';
import { AdminsMembersComponent } from './index';
import { AdminsMemberComponent } from './index';
import { AdminsCommunicationsComponent } from './index';
import { AdminsStudentsComponent } from './index';
import { AdminsStudentComponent } from './index';
import { MentorReportsSummaryTrackingComponent } from './index';
import { MentorReportSummaryUpdatesComponent } from './index';
import { MentorReportsFollowUpTrackingComponent } from './index';
import { MentorReportFollowUpUpdatesComponent } from './index';
import { AdminsComponent } from './index';
import { CanActivateViaAdminAuthGuard } from '../app.routing-guards';

// import { AdminsGradeHistoryComponent } from './index';

const routes: Routes = [
  {
    path: 'admins',
    component: AdminsComponent,
    canActivate: [CanActivateViaAdminAuthGuard],
    children: [
        {
          path: '',
          pathMatch: 'full',
          component: AdminsHomeComponent
        },
        {
          path: 'profile/:id',
          component: AdminsProfileComponent
        },
        {
          path: 'members',
          component: AdminsMembersComponent
        },
        {
          path: 'members/communications/:id',
          component: AdminsCommunicationsComponent
        },
        {
          path: 'members/member/:id',
          component: AdminsMemberComponent
        },
        {
          path: 'students',
          component: AdminsStudentsComponent
        },
        {
          path: 'students/student/:id',
          component: AdminsStudentComponent
        },
        // {
        //   path: 'students/grade-history/:id',
        //   component: AdminsGradeHistoryComponent
        // },
        {
          path: 'mentor-reports/summary-tracking',
          component: MentorReportsSummaryTrackingComponent
        },
        {
          path: 'mentor-reports/summary-updates/:mentorReportId',
          component: MentorReportSummaryUpdatesComponent
        },
        {
          path: 'mentor-reports/follow-up-tracking',
          component: MentorReportsFollowUpTrackingComponent
        },
        {
          path: 'mentor-reports/follow-up-updates/:mentorReportId',
          component: MentorReportFollowUpUpdatesComponent
        }
      ]
  }
];
export const AdminsRouting = RouterModule.forChild(routes);
