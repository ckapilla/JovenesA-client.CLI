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
import { FormBuilder } from '@angular/forms';
import { SqlResource } from '../../app_shared/services/sql-resource';
import { RptMentorReport } from '../../app_shared/models/mentor-report';
var MentorReportFollowUpUpdatesComponent = (function () {
    function MentorReportFollowUpUpdatesComponent(currRoute, router, sqlResource, _fb) {
        this.currRoute = currRoute;
        this.router = router;
        this.sqlResource = sqlResource;
        this._fb = _fb;
        this.followUpStatuses = [
            { value: '0', label: '[None]' },
            { value: '2091', label: 'Requested' },
            { value: '2092', label: 'Assigned' },
            { value: '2104', label: 'Closed' },
        ];
        this.frmUpdate = _fb.group({
            followUpNeeded: [''],
            followUpHistory: [''],
            followUpStatusSelector: [''],
        });
        this.frmUpdate = _fb.group({
            inputFollowUpHistory: [''],
            followUpStatusSelector: [''],
            inputFollowUpNeeded: ['']
        });
        this.followUpHistory = this.frmUpdate.controls['inputFollowUpHistory'];
        this.followUpStatusSelector = this.frmUpdate.controls['followUpStatusSelector'];
        this.followUpNeeded = this.frmUpdate.controls['inputFollowUpNeeded'];
        this.mentorReport = new RptMentorReport(); // MentorReportResource();
        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
    }
    ;
    MentorReportFollowUpUpdatesComponent.prototype.ngOnInit = function () {
        var _this = this;
        var mentorReportId = this.currRoute.snapshot.params['mentorReportId'];
        console.log('sqlResource with MentorReportId: ' + mentorReportId);
        this.isLoading = true;
        this.sqlResource.getMentorReport(mentorReportId)
            .subscribe(function (data) { _this.mentorReport = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () {
            console.log('done with data MentorReport>>');
            console.log(_this.mentorReport);
            _this.savedFollowUpStatusId = _this.mentorReport.followUpStatusId;
            console.log('<<');
            _this.isLoading = false;
        });
        this.frmUpdate.valueChanges.subscribe(function (form) {
            _this.errorMessage = '';
            _this.successMessage = '';
            _this.submitted = false;
            //console.log('form change event');
        });
    };
    MentorReportFollowUpUpdatesComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log('Hi from mentor ReportReview Submit');
        //console.log(this.mentorReport);
        if (this.frmUpdate.invalid) {
            this.errorMessage = '';
            window.scrollTo(0, 0);
            return false;
        }
        this.sqlResource.postMentorReport(this.mentorReport, 'Update', this.mentorReport.mentorId, this.mentorReport.studentId)
            .subscribe(function (student) {
            console.log(_this.successMessage = student);
            _this.submitted = true;
            _this.isLoading = false;
            _this.navigateBackInContext();
        }, function (error) {
            console.log(_this.errorMessage = error);
            _this.isLoading = false;
        });
        return false;
    };
    MentorReportFollowUpUpdatesComponent.prototype.onCancel = function () {
        this.navigateBackInContext();
    };
    MentorReportFollowUpUpdatesComponent.prototype.navigateBackInContext = function () {
        var target = '/admins/mentor-reports/follow-up-tracking';
        console.log('after Submit or Cancel navigating to ' + target);
        var reportDate = new Date(this.mentorReport.reportDateTime);
        var reportMonth = reportDate.getMonth() + 1; // JS Date months are zero based
        var navigationExtras = {
            queryParams: { id: 'id' + this.mentorReport.mentorReportId,
                month: reportMonth,
                summary: this.savedFollowUpStatusId
            }
        };
        this.router.navigate([target], navigationExtras);
    };
    MentorReportFollowUpUpdatesComponent.prototype.hasChanges = function () {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.frmUpdate.dirty);
        console.log('hasChanges net is ' + this.frmUpdate.dirty || this.submitted);
        return this.frmUpdate.dirty && !this.submitted;
    };
    return MentorReportFollowUpUpdatesComponent;
}());
MentorReportFollowUpUpdatesComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: './mr-follow-up-updates.component.html',
        styleUrls: ['../../../assets/css/forms.css'],
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        SqlResource,
        FormBuilder])
], MentorReportFollowUpUpdatesComponent);
export { MentorReportFollowUpUpdatesComponent };
//# sourceMappingURL=mr-follow-up-updates.component.js.map