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
// import {NgSwitch, NgSwitchCase } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SqlResource } from '../../app_shared/services/sql-resource';
import { Mentor } from '../../app_shared/models/mentor';
//import {DisplayErrorsComponent } from '../../app_shared/components/display-errors.component';
var MentorsProfileComponent = (function () {
    //
    //private curSegment: RouteSegment;
    //
    function MentorsProfileComponent(currRoute, router, sqlResource, formBuilder) {
        this.currRoute = currRoute;
        this.router = router;
        this.sqlResource = sqlResource;
        this.formBuilder = formBuilder;
        console.log('hi from profile.component constructor');
        this.statuses = [
            { statusId: '1024', label: 'None' },
            { statusId: '1025', label: 'Basic' },
            { statusId: '1026', label: 'Intermediate' },
            { statusId: '1027', label: 'Advanced' },
            { statusId: '1028', label: 'Native' },
        ];
        this.profileForm = formBuilder.group({
            inputMentorFName: ['', Validators.required],
            inputMentorLName: ['', Validators.required],
            inputMentorPhone: ['', Validators.required],
            inputMonthsinSma: ['', Validators.required],
            SpanishLevelSelector: ['', Validators.required],
            EnglishLevelSelector: ['', Validators.required],
        });
        this.mentor = new Mentor();
        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
    }
    MentorsProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ngOnInit');
        // this.currRoute.params
        //   .map(params => params['id'])
        //   .subscribe((id) => {
        var id = this.currRoute.snapshot.params['id'];
        console.log('calling sqlResource with mentorId: ' + id);
        this.isLoading = true;
        this.sqlResource.getMentor(id)
            .subscribe(function (data) { _this.mentor = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () {
            console.log('done loading');
            _this.isLoading = false;
        });
        this.profileForm.valueChanges.subscribe(function (form) {
            // this.errorMessage = '';
            // this.successMessage = '';
            _this.submitted = false;
        });
    };
    MentorsProfileComponent.prototype.saveProfile = function () {
        var _this = this;
        console.log('saving ');
        this.sqlResource.postMentor(this.mentor)
            .subscribe(function (student) {
            _this.successMessage = 'Changes were saved successfully.';
            _this.submitted = true;
            _this.isLoading = false;
            window.scrollTo(0, 0);
            window.setTimeout(function () { _this.successMessage = ''; }, 3000);
        }, function (error) {
            console.log(_this.errorMessage = error);
            _this.isLoading = false;
        });
        // prevent default action of reload
        return false;
    };
    MentorsProfileComponent.prototype.hasChanges = function () {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.profileForm.dirty);
        console.log('hasChanges net is ' + this.profileForm.dirty || this.submitted);
        return this.profileForm.dirty && !this.submitted;
    };
    return MentorsProfileComponent;
}());
MentorsProfileComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'mentor-profile',
        templateUrl: './mentors-profile.component.html'
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        SqlResource,
        FormBuilder])
], MentorsProfileComponent);
export { MentorsProfileComponent };
//# sourceMappingURL=mentors-profile.component.js.map