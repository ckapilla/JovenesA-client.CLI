import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaStudentAuthGuard } from '../app.routing-guards';
import { GradeEntryComponent } from './grade-entry/grade-entry.component';
import { InscriptionsEntryComponent } from './inscriptions-entry/inscriptions-entry.component';
import { SelfReportsAddComponent } from './self-reports-add/self-reports-add.component';
import { SelfReportsEditComponent } from './self-reports-edit/self-reports-edit.component';
import { StudentProfileComponent } from './students-profile/students-profile.component';
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
      {
        path: 'self-reports',
        component: StudentsSelfReportsComponent
      },
      {
        path: 'self-reports-add', // use params not path // /:sponsorGroupId/:studentGUId',
        component: SelfReportsAddComponent
      },
      {
        path: 'self-reports-edit/:selfReportId',
        component: SelfReportsEditComponent
      },
      {
        path: 'grade-entry',
        component: GradeEntryComponent
      },
      {
        path: 'inscriptions-entry',
        component: InscriptionsEntryComponent
      },
      {
        path: 'students-profile',
        component: StudentProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule {}
