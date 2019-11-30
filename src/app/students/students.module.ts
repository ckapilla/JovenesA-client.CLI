import { NgModule } from '@angular/core';
import { AppSharedModule } from '../_shared/_shared.module';
import { GradeTrackingComponent } from './grade-tracking/grade-tracking.component';
import { SelfReportsAddComponent } from './self-reports-add/self-reports-add.component';
import { SelfReportsEditComponent } from './self-reports-edit/self-reports-edit.component';
import { SponsorLettersAddComponent } from './sponsor-letters-add/sponsor-letters-add.component';
import { StudentsHomeComponent } from './students-home/students-home.component';
import { StudentsNavbarComponent } from './students-navbar/students-navbar.component';
import { StudentsProfileComponent } from './students-profile/students-profile.component';
import { StudentsSelfReportsComponent } from './students-self-reports/students-self-reports.component';
import { StudentsSponsorLettersComponent } from './students-sponsor-letters/students-sponsor-letters.component';
import { StudentsStudentStatusComponent } from './students-student-status/students-student-status.component';
import { StudentsComponent } from './students.component';
import { StudentsRouting } from './students.routing';


@NgModule({
  imports: [
    AppSharedModule,
    StudentsRouting
  ],
  declarations: [
    StudentsComponent,
    StudentsNavbarComponent,
    StudentsHomeComponent,
    StudentsProfileComponent,
    StudentsSponsorLettersComponent,
    SponsorLettersAddComponent,
    StudentsSelfReportsComponent,
    SelfReportsEditComponent,
    SelfReportsAddComponent,
    GradeTrackingComponent,
    StudentsStudentStatusComponent
  ]
})

export class StudentsModule { }
