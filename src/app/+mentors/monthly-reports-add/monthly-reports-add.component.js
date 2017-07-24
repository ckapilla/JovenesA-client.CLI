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
import { RptMentorReport } from '../../app_shared/models/mentor-report';
var MonthlyReportsAddComponent = (function () {
    function MonthlyReportsAddComponent(currRoute, router, sqlResource, _fb) {
        this.currRoute = currRoute;
        this.router = router;
        this.sqlResource = sqlResource;
        this._fb = _fb;
        console.log('Hi from MonthlyReportsAddComponent');
        this.contactYears = [
            { value: '0', label: 'Select Year' },
            { value: '2016', label: '2016' }, { value: '2017', label: '2017' } //,
            //    {value: '2018', label: '2018'}, {value: '2019', label: '2015'},
            //    {value: '2020', label: '2020'}
        ];
        this.contactMonths = [
            { value: '0', label: 'Select Month' },
            { value: '1', label: 'Jan/Enero' },
            { value: '2', label: 'Feb/Feb' },
            { value: '3', label: 'Mar/Marzo' },
            { value: '4', label: 'Apr/Abr' },
            { value: '5', label: 'May/Mayo' },
            { value: '6', label: 'Jun/Jun' },
            { value: '7', label: 'Jul/Jul' },
            { value: '8', label: 'Aug/Agosto' },
            { value: '9', label: 'Sep/Sept' },
            { value: '10', label: 'Oct/Oct' },
            { value: '11', label: 'Nov/Nov' },
            { value: '12', label: 'Dec/Dic' }
        ];
        this.myForm = _fb.group({
            lastContactYearSelector: ['', Validators.required],
            lastContactMonthSelector: ['', this.validateMonth],
            inputSnapshot: ['', Validators.required],
            inputFollowUp: ['', Validators.compose([Validators.maxLength(2000)])],
            inputSuccess: ['', Validators.compose([Validators.required, Validators.maxLength(2000)])],
            inputSetback: ['', Validators.compose([Validators.required, Validators.maxLength(2000)])],
        });
        this.lastYear = this.myForm.controls['lastContactYearSelector'];
        this.lastMonth = this.myForm.controls['lastContactMonthSelector'];
        this.snapshot = this.myForm.controls['inputSnapshot'];
        this.followUp = this.myForm.controls['inputFollowUp'];
        this.success = this.myForm.controls['inputSuccess'];
        this.challenge = this.myForm.controls['inputSetback'];
        this.mentorReport = new RptMentorReport();
        this.mentorReport.mentorId = 0;
        this.mentorReport.studentId = 0;
        // SQL Server will adjust the time to UTC by adding TimezoneOffset
        // we want to store local time so we adjust for that.
        var now = new Date();
        this.mentorReport.reportDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        console.log('reportDateTime = ' + this.mentorReport.reportDateTime);
        this.mentorReport.lastContactDate = null;
        this.mentorReport.followUpNeeded = '';
        this.mentorReport.recentSuccess = '';
        this.mentorReport.recentSetback = '';
        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
        this.needsFollowUp = false;
    }
    ;
    MonthlyReportsAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('monthlyReportsAdd ngOnInit');
        this.mentorReport.mentorId = this.currRoute.snapshot.params['mentorId'];
        this.mentorReport.studentId = this.currRoute.snapshot.params['studentId'];
        console.log('mentorId ' + this.mentorReport.mentorId);
        console.log('studentId ' + this.mentorReport.studentId);
        this.mentorReport.lastContactYear = (Number)(this.contactYears[this.contactYears.length - 1].value);
        this.mentorReport.lastContactMonth = 0;
        this.mentorReport.sponsorSummaryStatusId = 2086;
        console.log('zzz');
        this.myForm.valueChanges.subscribe(function (form) {
            _this.errorMessage = '';
            _this.successMessage = '';
            _this.submitted = false;
            console.log('form change event');
        });
    };
    MonthlyReportsAddComponent.prototype.onNeedsFollowUp = function () {
        console.log('setting needs followup');
        this.needsFollowUp = !this.needsFollowUp;
        this.mentorReport.followUpStatusId = 2091; // Needed
    };
    MonthlyReportsAddComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log('Hi from mentor Report Submit');
        // console.log(this.mentorReport);
        if (this.myForm.invalid) {
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
            if ((this.needsFollowUp && !this.followUp.valid) || !this.success.valid || !this.challenge.valid) {
                this.errorMessage = this.errorMessage + 'All text boxes must be filled in . ';
                ++i;
            }
            window.scrollTo(0, 0);
            return false;
        }
        this.sqlResource.postMentorReport(this.mentorReport, 'Add', this.mentorReport.mentorId, this.mentorReport.studentId)
            .subscribe(function (student) {
            console.log(_this.successMessage = student);
            _this.submitted = true;
            _this.isLoading = false;
            var target = '/mentors/monthly-reports/' + _this.mentorReport.mentorId; // + '/' + this.mentorReport.studentId;
            console.log('after call to postMentorReport; navigating to ' + target);
            _this.router.navigateByUrl(target);
        }, function (error) {
            console.log(_this.errorMessage = error);
            _this.isLoading = false;
        });
        return false;
    };
    MonthlyReportsAddComponent.prototype.onCancel = function () {
        var target = '/mentors/monthly-reports/' + this.mentorReport.mentorId; // + '/' + this.studentId;
        console.log('navigating to ' + target);
        this.router.navigateByUrl(target);
    };
    MonthlyReportsAddComponent.prototype.validateMonth = function (control) {
        console.log('month validator ' + control.value);
        var rtnVal = ('' + control.value === '0') ? {
            validateMonth: {
                valid: false
            }
        } : null;
        console.log(rtnVal);
        return rtnVal;
    };
    MonthlyReportsAddComponent.prototype.hasChanges = function () {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.myForm.dirty);
        console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
        return this.myForm.dirty && !this.submitted;
    };
    return MonthlyReportsAddComponent;
}());
MonthlyReportsAddComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: './monthly-reports-add.component.html'
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        SqlResource,
        FormBuilder])
], MonthlyReportsAddComponent);
export { MonthlyReportsAddComponent };
//# sourceMappingURL=monthly-reports-add.component.js.map