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
var ReportsStudentLettersComponent = (function () {
    function ReportsStudentLettersComponent(sqlReports, router, session) {
        this.sqlReports = sqlReports;
        this.router = router;
        this.session = session;
        this.smileys = ['/assets/images/frownSmiley.jpg',
            '/assets/images/neutralSmiley.jpg',
            '/assets/images/greenSmiley.jpg',
            '/assets/images/NA.jpg'
        ];
    }
    ReportsStudentLettersComponent.prototype.ngOnInit = function () {
        this.fetchData();
    };
    ReportsStudentLettersComponent.prototype.fetchData = function () {
        var _this = this;
        this.isLoading = true;
        console.log('in fetchData for LatestStudentLetters');
        this.sqlReports.getLatestStudentLetters()
            .subscribe(function (data) { _this.latestStudentLetters = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () { console.log('done'); console.log(_this.latestStudentLetters[0]); _this.isLoading = false; });
    };
    // gotoStudent(id: number, studentName: string) {
    //   console.log('setting studentName to ' + studentName);
    //   this.session.setAssignedStudentName(studentName);
    //   let link = ['/admins/students/student/' + id];
    //   //let link = ['/admins/students/StudentLetters/' + id];
    //   console.log('navigating to ' + link);
    //   this.router.navigate(link);
    // }
    ReportsStudentLettersComponent.prototype.gotoStudentletter = function (id) {
        var link = ['/admins/students/studentLetters/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    return ReportsStudentLettersComponent;
}());
ReportsStudentLettersComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'reports-student-letters.component.html'
    }),
    __metadata("design:paramtypes", [SqlReports,
        Router,
        SessionService])
], ReportsStudentLettersComponent);
export { ReportsStudentLettersComponent };
//# sourceMappingURL=reports-student-letters.component.js.map