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
import { Member } from '../../app_shared/models/member';
var AdminsMemberComponent = (function () {
    ////studentId: number;
    function AdminsMemberComponent(currRoute, router, sqlResource, formBuilder, location) {
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
            inputMemberFName: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
            inputMemberLName: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
            inputMemberSMAPhone: [''],
            inputMemberNonSMAPhone: [''],
            inputInitialInterview: ['', Validators.maxLength(2000)],
            inputMemberStory: ['', Validators.maxLength(2000)],
            EnglishLevelSelector: [''],
            SpanishLevelSelector: [''],
        });
        this.member = new Member();
        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
    }
    AdminsMemberComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('admins Member ngOnInit');
        var Id = this.currRoute.snapshot.params['id'];
        console.log('sqlResource with MemberId: ' + Id);
        this.isLoading = true;
        this.sqlResource.getMember(Id)
            .subscribe(function (data) { _this.member = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () {
            console.log('getMember is done');
            _this.isLoading = false;
        });
        this.profileForm.valueChanges.subscribe(function (form) {
            _this.errorMessage = '';
            _this.successMessage = '';
            _this.submitted = false;
        });
    };
    AdminsMemberComponent.prototype.saveProfile = function () {
        var _this = this;
        console.log('saving admin member ');
        this.isLoading = true;
        this.sqlResource.postMember(this.member)
            .subscribe(function (student) {
            console.log('subscribe result in postMember');
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
    AdminsMemberComponent.prototype.backToMembersList = function () {
        this.router.navigate(['/admins/students']);
    };
    AdminsMemberComponent.prototype.mentorReportsReview = function () {
        var Id = this.currRoute.snapshot.params['id'];
        this.router.navigate(['/admins/students/mentorReports/' + Id + '/']); //this.studentId ]);
    };
    ;
    AdminsMemberComponent.prototype.hasChanges = function () {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.profileForm.dirty);
        console.log('hasChanges net is ' + this.profileForm.dirty || this.submitted);
        return this.profileForm.dirty && !this.submitted;
    };
    return AdminsMemberComponent;
}());
AdminsMemberComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'student-profile',
        templateUrl: './admins-member.component.html',
        styleUrls: ['./admins-member.component.css'],
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        SqlResource,
        FormBuilder,
        Location])
], AdminsMemberComponent);
export { AdminsMemberComponent };
//# sourceMappingURL=admins-member.component.js.map