var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { AppSharedModule } from '../app_shared/app_shared.module';
import { ReportsComponent } from './reports.component';
import { ReportsNavbarComponent } from './shared/reports-navbar/reports-navbar.component';
import { ReportsRouting } from './reports.routing';
import { SqlReports } from './shared/services/sql-reports';
import { ReportsHomeComponent } from './reports-home/reports-home.component';
import { ReportsMentorReportsComponent } from './index';
import { ReportsMentorReports2Component } from './index';
import { ReportsStudentLettersComponent } from './index';
import { ReportsStudentLetters2Component } from './index';
var ReportsModule = (function () {
    function ReportsModule() {
    }
    return ReportsModule;
}());
ReportsModule = __decorate([
    NgModule({
        imports: [
            AppSharedModule,
            ReportsRouting
        ],
        declarations: [
            ReportsComponent,
            ReportsNavbarComponent,
            ReportsHomeComponent,
            ReportsMentorReportsComponent,
            ReportsMentorReports2Component,
            ReportsStudentLettersComponent,
            ReportsStudentLetters2Component
        ],
        providers: [
            SqlReports,
        ]
    })
], ReportsModule);
export { ReportsModule };
//# sourceMappingURL=reports.module.js.map