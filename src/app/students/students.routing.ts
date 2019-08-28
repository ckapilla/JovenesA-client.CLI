import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaStudentAuthGuard } from '../app.routing-guards';
// tslint:disable-next-line: max-line-length
import { SelfReportsAddComponent, StudentsComponent, StudentsProfileComponent, StudentsSelfReportsComponent } from './index';

const routes: Routes = [
  {
    // path: 'students', // non lazy loading
    path: '', // lazy loading
    component: StudentsComponent,
    canActivate: [CanActivateViaStudentAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        // shortcut to SelfReport /////
        component: StudentsSelfReportsComponent
      },
      // {
      //   path: 'home',
      //   component: StudentsHomeComponent
      // },
      {
        path: 'profile/:id',
        component: StudentsProfileComponent
      },
      // {
      //   path: 'sponsor-letters/:id',
      //   component: StudentsSponsorLettersComponent
      // },
      // {
      //   path: 'sponsor-letters-add/:studentId/:sponsorId',
      //   component: SponsorLettersAddComponent
      // },
      {
        path: 'self-reports/:studentId',
        component: StudentsSelfReportsComponent
      },
      {
        path: 'self-reports',  // use session userId
        component: StudentsSelfReportsComponent
      },
      {
        path: 'self-reports-add/:studentId/:sponsorId',
        component: SelfReportsAddComponent
      },
    ]
  }
];

export const StudentsRouting = RouterModule.forChild(routes);
