import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { StudentsComponent } from './students.component';
import { StudentsNavbarComponent } from './shared/students-navbar/students-navbar.component';
import { StudentsRouting } from './students.routing';
import { StudentsHomeComponent } from './students-home/students-home.component';
import { StudentsProfileComponent } from './students-profile/students-profile.component';
import { StudentsSponsorLettersComponent } from './students-sponsor-letters/students-sponsor-letters.component';
import { SponsorLettersAddComponent } from './sponsor-letters-add/sponsor-letters-add.component';
import { AssignedSponsorsComponent } from './assigned-sponsors/assigned-sponsors.component';
import { GradeTrackingComponent } from './grade-tracking/grade-tracking.component';
import { StudentsStudentStatusComponent } from './students-student-status/students-student-status.component';

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
      AssignedSponsorsComponent,
      GradeTrackingComponent,
      StudentsStudentStatusComponent
    ]
})

export class StudentsModule { }
