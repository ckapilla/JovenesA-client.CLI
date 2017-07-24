var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { MentorsComponent } from './mentors.component';
import { MentorsNavbarComponent } from './shared/mentors-navbar/mentors-navbar.component';
import { MentorsHomeComponent } from './mentors-home/mentors-home.component';
import { MentorsProfileComponent } from './mentors-profile/mentors-profile.component';
import { MonthlyReportsComponent } from './monthly-reports/monthly-reports.component';
import { MonthlyReportsAddComponent } from './monthly-reports-add/monthly-reports-add.component';
import { MentorsRouting } from './mentors.routing';
import { AssignedStudentsComponent } from './assigned-students/assigned-students.component';
var MentorsModule = (function () {
    function MentorsModule() {
    }
    return MentorsModule;
}());
MentorsModule = __decorate([
    NgModule({
        imports: [
            AppSharedModule,
            MentorsRouting
        ],
        declarations: [
            MentorsComponent,
            MentorsNavbarComponent,
            MentorsHomeComponent,
            MentorsProfileComponent,
            MonthlyReportsComponent,
            MonthlyReportsAddComponent,
            AssignedStudentsComponent
        ],
    })
], MentorsModule);
export { MentorsModule };
//# sourceMappingURL=mentors.module.js.map