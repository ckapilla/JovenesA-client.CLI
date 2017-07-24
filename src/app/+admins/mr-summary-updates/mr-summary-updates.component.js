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
var MentorReportSummaryUpdatesComponent = (function () {
    function MentorReportSummaryUpdatesComponent(currRoute, router, sqlResource, _fb) {
        this.currRoute = currRoute;
        this.router = router;
        this.sqlResource = sqlResource;
        this._fb = _fb;
        this.sponsorSummaryStatuses = [
            { value: '0', label: '[None]' },
            { value: '2086', label: 'NeedsSetup' },
            { value: '2087', label: 'NeedsReview' },
            { value: '2088', label: 'ReadyToSend' },
            { value: '2089', label: 'Sent' },
            { value: '2090', label: 'Skipped' }
        ];
        this.highlightStatuses = [
            { value: '0', label: '[None]' },
            { value: '2105', label: 'Internal' },
            { value: '2106', label: 'Internal/External' },
        ];
        this.frmUpdate = _fb.group({
            inputSummary: [''],
            summaryStatusSelector: [''],
            highlightStatusSelector: ['']
        });
        this.summary = this.frmUpdate.controls['inputSummary'];
        this.summaryStatus = this.frmUpdate.controls['summaryStatusSelector'];
        this.highlightStatus = this.frmUpdate.controls['highlightStatusSelector'];
        this.mentorReport = new RptMentorReport(); // MentorReportResource();
        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
    }
    ;
    MentorReportSummaryUpdatesComponent.prototype.ngOnInit = function () {
        var _this = this;
        var mentorReportId = this.currRoute.snapshot.params['mentorReportId'];
        console.log('sqlResource with MentorReportId: ' + mentorReportId);
        this.isLoading = true;
        this.sqlResource.getMentorReport(mentorReportId)
            .subscribe(function (data) { _this.mentorReport = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () {
            console.log('done with data MentorReport>>');
            console.log(_this.mentorReport);
            _this.savedHighlightStatusId = _this.mentorReport.followUpStatusId;
            _this.savedSponsorSummaryStatusId = _this.mentorReport.sponsorSummaryStatusId;
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
    MentorReportSummaryUpdatesComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log('Hi from mentor ReportReview Submit');
        //console.log(this.mentorReport);
        if (this.frmUpdate.invalid) {
            var i = 0;
            this.errorMessage = '';
            if (!this.lastYear.valid || !this.lastMonth.valid) {
                this.errorMessage = this.errorMessage + 'Year and month must be selected from drop-downs. ';
                ++i;
            }
            if (!this.snapshot.valid) {
                this.errorMessage = this.errorMessage + 'A green, yellow or red snapshot icon must be selected. ';
                ++i;
            }
            if (!this.followUp.valid || !this.success.valid || !this.challenge.valid) {
                this.errorMessage = this.errorMessage + 'All 3 text boxes must be filled in . ';
                ++i;
            }
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
    MentorReportSummaryUpdatesComponent.prototype.onCancel = function () {
        this.navigateBackInContext();
    };
    MentorReportSummaryUpdatesComponent.prototype.navigateBackInContext = function () {
        var target = '/admins/mentor-reports/summary-tracking';
        console.log('after Submit or Cancel navigating to ' + target);
        var reportDate = new Date(this.mentorReport.reportDateTime);
        var reportMonth = reportDate.getMonth() + 1; // JS Date months are zero based
        if (reportDate.getDate() <= 2) {
            reportMonth--;
        }
        var navigationExtras = {
            queryParams: { id: 'id' + this.mentorReport.mentorReportId,
                month: reportMonth,
                summary: this.savedSponsorSummaryStatusId,
                highlight: this.savedHighlightStatusId
            }
        };
        this.router.navigate([target], navigationExtras);
    };
    MentorReportSummaryUpdatesComponent.prototype.hasChanges = function () {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.frmUpdate.dirty);
        console.log('hasChanges net is ' + this.frmUpdate.dirty || this.submitted);
        return this.frmUpdate.dirty && !this.submitted;
    };
    return MentorReportSummaryUpdatesComponent;
}());
MentorReportSummaryUpdatesComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: './mr-summary-updates.component.html',
        styleUrls: ['../../../assets/css/forms.css'],
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        SqlResource,
        FormBuilder])
], MentorReportSummaryUpdatesComponent);
export { MentorReportSummaryUpdatesComponent };
//# sourceMappingURL=mr-summary-updates.component.js.map