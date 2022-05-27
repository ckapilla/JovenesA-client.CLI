import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaMentorAuthGuard, ConfirmDeactivateMonthlyReportAddGuard } from '../app.routing-guards';
import { FollowUpRequestsAddComponent } from './follow-up-requests-add/follow-up-requests-add.component';
import { FollowUpRequestsComponent } from './follow-up-requests/follow-up-requests.component';
import { ForumComponent } from './forum/forum.component';
import { MentorsContainerComponent } from './mentors-container/mentors-container.component';
import { MentorsProfileComponent } from './mentors-profile/mentors-profile.component';
import { MentorsComponent } from './mentors.component';
import { MonthlyReports2EditComponent } from './monthly-reports2-edit/monthly-reports2-edit.component';
import { MonthlyReports2ENAddComponent } from './monthly-reports2-EN-add/monthly-reports2-EN-add.component';
import { MonthlyReports2ESAddComponent } from './monthly-reports2-ES-add/monthly-reports2-ES-add.component';
import { MonthlyReports2Component } from './monthly-reports2/monthly-reports2.component';

const mentorRoutes: Routes = [
  {
    path: '', // lazy loading
    component: MentorsComponent,
    canActivate: [CanActivateViaMentorAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: MentorsContainerComponent
      },
      {
        path: 'becas-home',
        component: MentorsContainerComponent
      },
      {
        path: 'profile/:id',
        component: MentorsProfileComponent
      },
      {
        path: 'monthly-reports/:mentorId',
        component: MonthlyReports2Component
      },
      {
        path: 'monthly-reports', // use session userId
        component: MonthlyReports2Component
      },
      {
        path: 'monthly-reports-EN-add', // using query params /:mentorId/:studentGUId',
        component: MonthlyReports2ENAddComponent,
        canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
      },
      {
        path: 'monthly-reports-ES-add', // using query params /:mentorId/:studentGUId',
        component: MonthlyReports2ESAddComponent,
        canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
      },
      {
        path: 'monthly-reports-edit/:mentorReportId',
        component: MonthlyReports2EditComponent,
        canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
      },
      {
        path: 'follow-up-requests-add',
        component: FollowUpRequestsAddComponent,
        canDeactivate: [ConfirmDeactivateMonthlyReportAddGuard]
      },
      {
        path: 'follow-up-requests',
        component: FollowUpRequestsComponent
      },
      {
        path: 'forum',
        component: ForumComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(mentorRoutes)],
  exports: [RouterModule]
})

export class MentorsRoutingModule { }
