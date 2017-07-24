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
import { Router, ActivatedRoute } from '@angular/router';
import { SqlResource } from '../../app_shared/services/sql-resource';
import { SessionService } from '../../app_shared/services/session.service';
var MonthlyReportsComponent = (function () {
    function MonthlyReportsComponent(currRoute, router, sqlResource, session) {
        this.currRoute = currRoute;
        this.router = router;
        this.sqlResource = sqlResource;
        this.session = session;
        console.log('monthlyReports constructor');
        this.smileys = ['/assets/images/frownSmiley.jpg',
            '/assets/images/neutralSmiley.jpg',
            '/assets/images/greenSmiley.jpg',
            '/assets/images/NA.jpg'
        ];
    }
    MonthlyReportsComponent.prototype.ngOnInit = function () {
        console.log('monthlyReports ngOnInit');
        this.mentorId = this.currRoute.snapshot.params['mentorId'];
        this.mentorId = this.session.getUserId();
        console.log('mentorId ' + this.mentorId);
        // may be undefined at this point:
        console.log('studentId ' + this.studentId);
        this.isLoading = true;
        ;
    };
    MonthlyReportsComponent.prototype.onSelectedStudentName = function (studentName) {
        // console.log('$$$$$$$ got selected NAME event');
        this.studentName = '' + studentName;
    };
    MonthlyReportsComponent.prototype.onSelectedStudentId = function (studentId) {
        var _this = this;
        console.log('$$$$$$$ got selectedId event');
        this.studentId = studentId;
        this.sqlResource.getMentorReports(this.mentorId, studentId)
            .subscribe(function (data) { _this.mentorReports = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () {
            console.log('done: ');
            _this.isLoading = false;
        });
    };
    MonthlyReportsComponent.prototype.monthlyReportAdd = function () {
        console.log('in monthly-reports: monthlyReportAdd, ready to navigate');
        if (this.studentId !== null) {
            var target = '/mentors/monthly-reports-add/' + this.mentorId + '/' + this.studentId;
            this.router.navigateByUrl(target); //, //{mentorId: this.mentorId, studentId: this.studentId}]);
        }
    };
    return MonthlyReportsComponent;
}());
MonthlyReportsComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: './monthly-reports.component.html',
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        SqlResource,
        SessionService])
], MonthlyReportsComponent);
export { MonthlyReportsComponent };
//# sourceMappingURL=monthly-reports.component.js.map