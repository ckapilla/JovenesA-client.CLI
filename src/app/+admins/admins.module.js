var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { AdminsComponent } from './index';
import { AdminsHomeComponent } from './index';
import { AdminsProfileComponent } from './index';
import { AdminsMembersComponent } from './index';
import { AdminsCommunicationsComponent } from './index';
import { AdminsMemberComponent } from './index';
import { AdminsStudentsComponent } from './index';
import { AdminsStudentComponent } from './index';
import { MentorReportSummaryUpdatesComponent } from './index';
import { MentorReportsSummaryTrackingComponent } from './index';
import { MentorReportsFollowUpTrackingComponent } from './index';
import { MentorReportFollowUpUpdatesComponent } from './index';
import { AdminsNavbarComponent } from './shared/admins-navbar/admins-navbar.component';
import { AdminsRouting } from './admins.routing';
// import { AdminsGradeHistoryComponent } from './index';
var AdminsModule = (function () {
    function AdminsModule() {
    }
    return AdminsModule;
}());
AdminsModule = __decorate([
    NgModule({
        imports: [
            AppSharedModule,
            AdminsRouting,
        ],
        declarations: [
            AdminsComponent,
            AdminsHomeComponent,
            AdminsProfileComponent,
            AdminsMembersComponent,
            AdminsCommunicationsComponent,
            AdminsMemberComponent,
            AdminsStudentsComponent,
            AdminsStudentComponent,
            // AdminsGradeHistoryComponent,
            MentorReportsSummaryTrackingComponent,
            MentorReportSummaryUpdatesComponent,
            MentorReportsFollowUpTrackingComponent,
            MentorReportFollowUpUpdatesComponent,
            AdminsNavbarComponent
        ],
    })
], AdminsModule);
export { AdminsModule };
//# sourceMappingURL=admins.module.js.map