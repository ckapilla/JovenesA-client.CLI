var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { SqlReports } from '../shared/services/sql-reports';
import { Router } from '@angular/router';
import { SessionService } from '../../app_shared/services/session.service';
var ReportsMentorReportsComponent = (function () {
    function ReportsMentorReportsComponent(sqlReports, router, session) {
        this.sqlReports = sqlReports;
        this.router = router;
        this.session = session;
        this.smileys = ['/assets/images/frownSmiley.jpg',
            '/assets/images/neutralSmiley.jpg',
            '/assets/images/greenSmiley.jpg',
            '/assets/images/NA.jpg'
        ];
    }
    ReportsMentorReportsComponent.prototype.ngOnInit = function () {
        this.fetchData();
    };
    ReportsMentorReportsComponent.prototype.fetchData = function () {
        var _this = this;
        this.isLoading = true;
        console.log('in fetchData for LatestMentorReports');
        this.sqlReports.getLatestMentorReports()
            .subscribe(function (data) { _this.latestMentorReports = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () { console.log('done'); console.log(_this.latestMentorReports[0]); _this.isLoading = false; });
    };
    ReportsMentorReportsComponent.prototype.gotoStudent = function (id, studentName) {
        console.log('setting studentName to ' + studentName);
        this.session.setAssignedStudentName(studentName);
        var link = ['/admins/students/student/' + id];
        //let link = ['/admins/students/mentorReports/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    ReportsMentorReportsComponent.prototype.gotoMentorReport = function (id) {
        var link = ['/admins/students/mentorReports/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    return ReportsMentorReportsComponent;
}());
ReportsMentorReportsComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'reports-mentor-reports.component.html'
    }),
    __metadata("design:paramtypes", [SqlReports,
        Router,
        SessionService])
], ReportsMentorReportsComponent);
export { ReportsMentorReportsComponent };
//# sourceMappingURL=reports-mentor-reports.component.js.map