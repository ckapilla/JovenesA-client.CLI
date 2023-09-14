import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppSharedModule } from '../_shared/_shared.module';
import { GradeEntryComponent } from './grade-entry/grade-entry.component';
import { SelfReportsAddComponent } from './self-reports-add/self-reports-add.component';
import { SelfReportsEditComponent } from './self-reports-edit/self-reports-edit.component';
import { StudentsHomeComponent } from './students-home/students-home.component';
import { StudentsNavbarComponent } from './students-navbar/students-navbar.component';
import { StudentProfileComponent } from './students-profile/students-profile.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsSelfReportsComponent } from './students-self-reports/students-self-reports.component';
import { StudentsComponent } from './students.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [AppSharedModule, CommonModule, StudentsRoutingModule, ReactiveFormsModule],
  declarations: [
    StudentsComponent,
    StudentsNavbarComponent,
    StudentsHomeComponent,
    StudentProfileComponent,
    StudentsSelfReportsComponent,
    SelfReportsEditComponent,
    SelfReportsAddComponent,
    GradeEntryComponent
  ]
})
export class StudentsModule {}
