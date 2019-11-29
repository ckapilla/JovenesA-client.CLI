import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaMentorAuthGuard, ConfirmDeactivateMonthlyReportAddGuard } from '../app.routing-guards';
import { FollowUpRequestsAddComponent } from './follow-up-requests-add/follow-up-requests-add.component';
import { FollowUpRequestsComponent } from './follow-up-requests/follow-up-requests.component';
import { ForumComponent } from './forum/forum.component';
import { MentorsHomeComponent } from './mentors-container/mentors-home.component';
import { MentorsProfileComponent } from './mentors-profile/mentors-profile.component';
import { MentorsComponent } from './mentors.component';
import { MonthlyReports2AddComponent } from './monthly-reports2-add/monthly-reports2-add.component';
import { MonthlyReports2EditComponent } from './monthly-reports2-edit/monthly-reports2-edit.component';
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
        component: MentorsHomeComponent
      },
      {
        path: 'home',
        component: MentorsHomeComponent
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
        path: 'monthly-reports-add', // using query params /:mentorId/:studentGUId',
        component: MonthlyReports2AddComponent,
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

export class MentorsRouting { }
