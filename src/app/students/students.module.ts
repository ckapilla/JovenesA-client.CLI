import { NgModule } from '@angular/core';
import { AppSharedModule } from '../_shared/_shared.module';
import { GradeEntryComponent } from './grade-entry/grade-entry.component';
import { GradeTrackingComponent } from './grade-tracking/grade-tracking.component';
import { SelfReportsAddComponent } from './self-reports-add/self-reports-add.component';
import { SelfReportsEditComponent } from './self-reports-edit/self-reports-edit.component';
import { StudentsHomeComponent } from './students-home/students-home.component';
import { StudentsNavbarComponent } from './students-navbar/students-navbar.component';
import { StudentProfileComponent } from './students-profile/students-profile.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsSelfReportsComponent } from './students-self-reports/students-self-reports.component';
import { StudentsComponent } from './students.component';

@NgModule({
  imports: [AppSharedModule, StudentsRoutingModule],
  declarations: [
    StudentsComponent,
    StudentsNavbarComponent,
    StudentsHomeComponent,
    StudentProfileComponent,
    StudentsSelfReportsComponent,
    SelfReportsEditComponent,
    SelfReportsAddComponent,
    GradeTrackingComponent,
    GradeEntryComponent
  ]
})
export class StudentsModule {}
