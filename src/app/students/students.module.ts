import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { GradeTrackingComponent } from './grade-tracking/grade-tracking.component';
// tslint:disable-next-line: max-line-length
import { SelfReportsAddComponent, SponsorLettersAddComponent, StudentsComponent, StudentsHomeComponent, StudentsProfileComponent, StudentsSelfReportsComponent, StudentsSponsorLettersComponent } from './index';
import { StudentsNavbarComponent } from './shared/students-navbar/students-navbar.component';
import { StudentsStudentStatusComponent } from './students-student-status/students-student-status.component';
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
    SelfReportsAddComponent,
    GradeTrackingComponent,
    StudentsStudentStatusComponent
  ]
})

export class StudentsModule { }
