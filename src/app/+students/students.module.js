var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var StudentsModule = (function () {
    function StudentsModule() {
    }
    return StudentsModule;
}());
StudentsModule = __decorate([
    NgModule({
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
], StudentsModule);
export { StudentsModule };
//# sourceMappingURL=students.module.js.map