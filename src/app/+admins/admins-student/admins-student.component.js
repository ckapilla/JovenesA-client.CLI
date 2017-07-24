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
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SqlResource } from '../../app_shared/services/sql-resource';
import { Student } from '../../app_shared/models/student';
var AdminsStudentComponent = (function () {
    ////studentId: number;
    function AdminsStudentComponent(currRoute, router, sqlResource, formBuilder, location) {
        this.currRoute = currRoute;
        this.router = router;
        this.sqlResource = sqlResource;
        this.formBuilder = formBuilder;
        this.location = location;
        console.log('hi from profile.component constructor');
        this.statuses = [
            { statusId: '1024', label: 'None' },
            { statusId: '1025', label: 'Basic' },
            { statusId: '1026', label: 'Intermediate' },
            { statusId: '1027', label: 'Advanced' },
            { statusId: '1028', label: 'Native' },
        ];
        this.profileForm = formBuilder.group({
            inputStudentFName: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
            inputStudentLName: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
            inputStudentPhone: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(12)])],
            inputInitialInterview: ['', Validators.maxLength(2000)],
            inputStudentStory: ['', Validators.maxLength(2000)],
            EnglishLevelSelector: [''],
        });
        this.student = new Student();
        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
    }
    AdminsStudentComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('admins Student ngOnInit');
        var Id = this.currRoute.snapshot.params['id'];
        console.log('sqlResource with StudentId: ' + Id);
        this.isLoading = true;
        this.sqlResource.getStudent(Id)
            .subscribe(function (data) { _this.student = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () {
            console.log('getStudent is done');
            _this.isLoading = false;
        });
        this.profileForm.valueChanges.subscribe(function (form) {
            _this.errorMessage = '';
            _this.successMessage = '';
            _this.submitted = false;
        });
    };
    AdminsStudentComponent.prototype.saveProfile = function () {
        var _this = this;
        console.log('saving admin student ');
        this.isLoading = true;
        this.sqlResource.postStudent(this.student)
            .subscribe(function (student) {
            //console.log('subscribe result in postStudent');
            _this.successMessage = 'Changes were saved successfully.';
            _this.submitted = true;
            _this.isLoading = false;
            window.scrollTo(0, 0);
            window.setTimeout(function () {
                _this.successMessage = '';
            }, 3000);
        }, function (error) {
            console.log(_this.errorMessage = error);
            _this.isLoading = false;
        });
        // prevent default action of reload
        return false;
    };
    AdminsStudentComponent.prototype.backToStudentsList = function () {
        this.router.navigate(['/admins/students']);
    };
    AdminsStudentComponent.prototype.mentorReportsReview = function () {
        var Id = this.currRoute.snapshot.params['id'];
        this.router.navigate(['/admins/students/mentorReports/' + Id + '/']); //this.studentId ]);
    };
    ;
    AdminsStudentComponent.prototype.hasChanges = function () {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.profileForm.dirty);
        console.log('hasChanges net is ' + this.profileForm.dirty || this.submitted);
        return this.profileForm.dirty && !this.submitted;
    };
    AdminsStudentComponent.prototype.gotoGradeHistory = function () {
        var id = this.currRoute.snapshot.params['id'];
        var link = ['/admins/students/grade-history/' + id + '/'];
        this.router.navigate(link);
    };
    return AdminsStudentComponent;
}());
AdminsStudentComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'student-profile',
        templateUrl: './admins-student.component.html',
        styleUrls: ['./admins-student.component.css'],
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        SqlResource,
        FormBuilder,
        Location])
], AdminsStudentComponent);
export { AdminsStudentComponent };
//# sourceMappingURL=admins-student.component.js.map