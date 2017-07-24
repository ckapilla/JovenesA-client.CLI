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
import { FormBuilder, Validators } from '@angular/forms';
import { SqlResource } from '../../app_shared/services/sql-resource';
import { Admin } from '../shared/admin';
var AdminsProfileComponent = (function () {
    //
    // private curSegment: RouteSegment;
    //
    function AdminsProfileComponent(currRoute, router, sqlResource, formBuilder) {
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
            inputAdminFName: ['', Validators.required],
            inputAdminLName: ['', Validators.required],
            inputAdminPhone: ['', Validators.required],
            inputMonthsinSma: ['', Validators.required],
            SpanishLevelSelector: ['', Validators.required],
            EnglishLevelSelector: ['', Validators.required],
        });
        this.admin = new Admin();
        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
    }
    AdminsProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ngOnInit');
        var id = this.currRoute.snapshot.params['id'];
        console.log('sqlResource with adminId: ' + id);
        this.isLoading = true;
        this.sqlResource.getAdmin(id)
            .subscribe(function (data) { _this.admin = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () {
            console.log('done');
            _this.isLoading = false;
        });
        this.profileForm.valueChanges.subscribe(function (form) {
            _this.errorMessage = '';
            _this.successMessage = '';
            _this.submitted = false;
        });
    };
    AdminsProfileComponent.prototype.saveProfile = function () {
        var _this = this;
        console.log('saving ');
        this.sqlResource.postAdmin(this.admin)
            .subscribe(function (student) {
            // console.log('subscribe result from postAdmin');
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
    AdminsProfileComponent.prototype.hasChanges = function () {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.profileForm.dirty);
        console.log('hasChanges net is ' + this.profileForm.dirty || this.submitted);
        return this.profileForm.dirty && !this.submitted;
    };
    return AdminsProfileComponent;
}());
AdminsProfileComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'app-admin-profile',
        templateUrl: './admins-profile.component.html',
        styleUrls: ['../../../assets/css/forms.css'],
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        SqlResource,
        FormBuilder])
], AdminsProfileComponent);
export { AdminsProfileComponent };
//# sourceMappingURL=admins-profile.component.js.map