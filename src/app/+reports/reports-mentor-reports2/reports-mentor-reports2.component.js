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
var ReportsMentorReports2Component = (function () {
    function ReportsMentorReports2Component(sqlReports, router, session) {
        this.sqlReports = sqlReports;
        this.router = router;
        this.session = session;
        // this.sponsorSummaryStatuses = [
        //   { value: '0', label: '[All]' },
        //   { value: '2086', label: 'NeedsReview' },
        //   { value: '2087', label: 'NeedsApproval' },
        //   { value: '2088', label: 'ReadyToSend' },
        //   { value: '2091', label: 'DoNotSent'},
        //   { value: '2089', label: 'Sent'},
        //   { value: '2090', label: 'Skipped'}
        // ];
        // this.selectedSponsorSummaryStatus = this.sponsorSummaryStatuses[1].value;
        this.smileys = ['/assets/images/frownSmiley.jpg',
            '/assets/images/neutralSmiley.jpg',
            '/assets/images/greenSmiley.jpg',
            '/assets/images/NA.jpg'
        ];
    }
    ReportsMentorReports2Component.prototype.ngOnInit = function () {
        this.fetchFilteredData();
    };
    ReportsMentorReports2Component.prototype.fetchFilteredData = function () {
        var _this = this;
        this.isLoading = true;
        console.log('in fetchData for LatestMentorReports');
        this.sqlReports.getLatestMentorReports2() //this.selectedSponsorSummaryStatus)
            .subscribe(function (data) { _this.latestMentorReports2 = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () { console.log('done'); console.log(_this.latestMentorReports2[0]); _this.isLoading = false; });
    };
    ReportsMentorReports2Component.prototype.setSelectedSponsorSummaryStatus = function (status) {
        // console.log('selected status: ' + status);
        this.selectedSponsorSummaryStatus = status;
        this.fetchFilteredData();
    };
    ReportsMentorReports2Component.prototype.gotoStudent = function (id, studentName) {
        console.log('setting studentName to ' + studentName);
        this.session.setAssignedStudentName(studentName);
        var link = ['/admins/students/student/' + id];
        //let link = ['/admins/students/mentorReports/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    ReportsMentorReports2Component.prototype.gotoMentorReport = function (id) {
        var link = ['/admins/students/mentorReports/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    ReportsMentorReports2Component.prototype.editSponsorSummary = function () {
        console.log('in mentor-reports2: sponsorSummaryEdit, ready to navigate');
        //this.studentId = this.session.getAssignedStudentId();
        var target = '/reports/sponsor-summary-edit/' + this.latestMentorReports2[0].mentorReportId;
        this.router.navigateByUrl(target); //, //{mentorId: this.mentorId, studentId: this.studentId}]);
    };
    ReportsMentorReports2Component.prototype.translationNeeded = function (lang1, lang2) {
        console.log(lang1, lang2);
        return (lang1 === lang2) ? '' : 'Translation Needed';
    };
    return ReportsMentorReports2Component;
}());
ReportsMentorReports2Component = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'reports-mentor-reports2.component.html',
    }),
    __metadata("design:paramtypes", [SqlReports,
        Router,
        SessionService])
], ReportsMentorReports2Component);
export { ReportsMentorReports2Component };
//# sourceMappingURL=reports-mentor-reports2.component.js.map