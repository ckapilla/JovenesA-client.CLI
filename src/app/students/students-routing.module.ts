import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaStudentAuthGuard } from '../app.routing-guards';
import { SelfReportsAddComponent } from './self-reports-add/self-reports-add.component';
import { SelfReportsEditComponent } from './self-reports-edit/self-reports-edit.component';
import { StudentsSelfReportsComponent } from './students-self-reports/students-self-reports.component';
import { StudentsComponent } from './students.component';

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
      //   path: 'becas-home',
      //   component: StudentsHomeComponent
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
        path: 'self-reports-add/:studentId/:sponsorId/:studentGUId',
        component: SelfReportsAddComponent
      },
      {
        path: 'self-reports-edit/:selfReportId',
        component: SelfReportsEditComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
