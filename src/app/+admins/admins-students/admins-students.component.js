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
import { Router } from '@angular/router';
import { SqlResource } from '../../app_shared/services/sql-resource';
import { SessionService } from '../../app_shared/services/session.service';
var AdminsStudentsComponent = (function () {
    function AdminsStudentsComponent(sqlResource, router, session) {
        this.sqlResource = sqlResource;
        this.router = router;
        this.session = session;
        console.log('Hi from student List Ctrl controller function');
        this.statuses = [
            { value: '0', label: '[All]' },
            { value: '1003', label: 'Dropped' },
            { value: '1004', label: 'Grad' },
            { value: '1005', label: 'Current' }
        ];
        this.joinedYears = [
            { value: '0', label: '[All]' },
            { value: '2002', label: '2002' }, { value: '2003', label: '2003' },
            { value: '2004', label: '2004' }, { value: '2005', label: '2005' },
            { value: '2006', label: '2006' }, { value: '2007', label: '2007' },
            { value: '2008', label: '2008' }, { value: '2009', label: '2009' },
            { value: '2010', label: '2010' }, { value: '2011', label: '2011' },
            { value: '2012', label: '2012' }, { value: '2013', label: '2013' },
            { value: '2014', label: '2014' }, { value: '2015', label: '2015' },
            { value: '2016', label: '2016' }, { value: '2017', label: '2017' },
        ];
        this.gradYears = [
            { value: '0', label: '[All]' },
            { value: '2004', label: '2004' }, { value: '2005', label: '2005' },
            { value: '2006', label: '2006' }, { value: '2007', label: '2007' },
            { value: '2008', label: '2008' }, { value: '2009', label: '2009' },
            { value: '2010', label: '2010' }, { value: '2011', label: '2011' },
            { value: '2012', label: '2012' }, { value: '2013', label: '2013' },
            { value: '2014', label: '2014' }, { value: '2015', label: '2015' },
            { value: '2016', label: '2016' }, { value: '2017', label: '2017' },
            { value: '2018', label: '2018' }, { value: '2019', label: '2019' },
            { value: '2020', label: '2020' }, { value: '2021', label: '2021' }
        ];
        this.selectedStatus = this.statuses[3].value; // Current
        this.selectedYearJoined = this.joinedYears[0].value; // All[this.joinedYears.length - 1]; // 2015 at time of writing
        this.selectedGradYear = this.gradYears[0].value; // All
        // this.gradeRptsStatus = 'yellowWarning.jpg'
        // this.gpaStatus = 'greenCheck.jpg'
        this.smileys = ['/assets/images/frownSmiley.jpg',
            '/assets/images/neutralSmiley.jpg',
            '/assets/images/greenSmiley.jpg',
            '/assets/images/NA.jpg'
        ];
        this.isLoading = false;
    }
    AdminsStudentsComponent.prototype.ngOnInit = function () {
        console.log('ngOnInit');
        this.fetchFilteredData();
    };
    // can't rely on two way binding to have updated the selected values
    // in time so we do it manually below
    AdminsStudentsComponent.prototype.setSelectedStatus = function (status) {
        // console.log('selected status: ' + status);
        this.selectedStatus = status;
        this.fetchFilteredData();
    };
    AdminsStudentsComponent.prototype.setSelectedGradYear = function (year) {
        // console.log('selected year: ' + year);
        this.selectedGradYear = year;
        this.fetchFilteredData();
    };
    AdminsStudentsComponent.prototype.setSelectedYearJoined = function (year) {
        // console.log('selected year: ' + year);
        this.selectedYearJoined = year;
        this.fetchFilteredData();
    };
    AdminsStudentsComponent.prototype.fetchFilteredData = function () {
        var _this = this;
        // console.log('sqlResource for getStudents: ' +
        //        'status: ' + this.selectedStatus + ' ' +
        //        'yearjoined: ' + this.selectedYearJoined +  + ' ' +
        //        'gradyear: ' + this.selectedGradYear
        //        );
        this.isLoading = true;
        this.sqlResource.getStudentDTOs(this.selectedStatus, this.selectedGradYear, this.selectedYearJoined)
            .subscribe(function (data) { _this.studentDTOs = data; _this.successMessage = 'Students retrieved successfully.'; }, function (err) { _this.errorMessage = err; }, function () { console.log('done'); _this.isLoading = false; });
    };
    AdminsStudentsComponent.prototype.gotoStudent = function (id, studentName) {
        console.log('setting studentName to ' + studentName);
        this.session.setAssignedStudentName(studentName);
        var link = ['/admins/students/student/' + id];
        // const link = ['/admins/students/mentorReports/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    AdminsStudentsComponent.prototype.gotoReport = function (id) {
        var link = ['/admins/students/mentorReports/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    return AdminsStudentsComponent;
}());
AdminsStudentsComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: './admins-students.component.html'
    }),
    __metadata("design:paramtypes", [SqlResource,
        Router,
        SessionService])
], AdminsStudentsComponent);
export { AdminsStudentsComponent };
//# sourceMappingURL=admins-students.component.js.map