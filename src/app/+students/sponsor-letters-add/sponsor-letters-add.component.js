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
import { RptSponsorLetter } from '../../app_shared/models/sponsor-letter';
var SponsorLettersAddComponent = (function () {
    function SponsorLettersAddComponent(currRoute, router, sqlResource, _fb) {
        this.currRoute = currRoute;
        this.router = router;
        this.sqlResource = sqlResource;
        this._fb = _fb;
        console.log('Hi from SponsorLettersAddComponent');
        this.periodYears = [
            // {value: '2016', label: '2016'},
            { value: '2017', label: '2017' } //,
            //    {value: '2018', label: '2018'}, {value: '2019', label: '2015'},
            //    {value: '2020', label: '2020'}
        ];
        this.periodMonths = [
            // {value: '0', label: 'Seleccionar Mes'},
            { value: '1', label: 'Ene' },
            { value: '2', label: 'Feb' },
            { value: '3', label: 'Mar' },
            { value: '4', label: 'Abr' },
            { value: '5', label: 'Mayo' },
            { value: '6', label: 'Jun' },
            { value: '7', label: 'Jul' },
            { value: '8', label: 'Ago' },
            { value: '9', label: 'Sept' },
            { value: '10', label: 'Oct' },
            { value: '11', label: 'Nov' },
            { value: '12', label: 'Dic' }
        ];
        this.addNewForm = _fb.group({
            letterYearSelector: ['', Validators.required],
            letterMonthSelector: ['', this.validateMonth],
            inputLetterText: ['', Validators.compose([Validators.required, Validators.maxLength(2000)])]
        });
        this.letterYear = this.addNewForm.controls['letterYearSelector'];
        this.letterMonth = this.addNewForm.controls['letterMonthSelector'];
        this.letterText = this.addNewForm.controls['inputFollowUp'];
        this.sponsorLetter = new RptSponsorLetter();
        this.sponsorLetter.sponsorId = 0;
        this.sponsorLetter.studentId = 0;
        // SQL Server will adjust the time to UTC by adding TimezoneOffset
        // we want to store local time so we adjust for that.
        var now = new Date();
        this.sponsorLetter.letterDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        console.log(this.sponsorLetter.letterDateTime);
        this.sponsorLetter.letterYear = null; // moment(new Date).format('YYYY-MM-DD');
        this.sponsorLetter.letterMonth = null;
        this.sponsorLetter.letterText = '';
        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
    }
    ;
    SponsorLettersAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('sponsorLettersAdd ngOnInit');
        this.sponsorLetter.sponsorId = this.currRoute.snapshot.params['sponsorId'];
        this.sponsorLetter.studentId = this.currRoute.snapshot.params['studentId'];
        console.log('sponsorId ' + this.sponsorLetter.sponsorId);
        console.log('studentId ' + this.sponsorLetter.studentId);
        this.sponsorLetter.letterYear = 2017;
        this.sponsorLetter.letterMonth = 1;
        this.addNewForm.valueChanges.subscribe(function (form) {
            _this.errorMessage = '';
            _this.successMessage = '';
            _this.submitted = false;
            console.log('form change event');
        });
    };
    SponsorLettersAddComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log('Hi from sponsor letter Submit');
        // console.log(this.sponsorLetter);
        if (this.addNewForm.invalid) {
            var i = 0;
            this.errorMessage = '';
            if (!this.letterYear.valid || !this.letterMonth.valid) {
                this.errorMessage = this.errorMessage + 'Year and month must be selected from drop-downs. ';
                ++i;
            }
            if (!this.letterText.valid) {
                this.errorMessage = this.errorMessage + 'Letter text box must be filled in . ';
                ++i;
            }
            window.scrollTo(0, 0);
            return false;
        }
        this.sqlResource.postSponsorLetter(this.sponsorLetter, this.sponsorLetter.studentId, this.sponsorLetter.sponsorId)
            .subscribe(function (student) {
            console.log(_this.successMessage = student);
            _this.submitted = true;
            _this.isLoading = false;
            var target = '/students/sponsor-letters/' + _this.sponsorLetter.studentId; // + '/' + this.sponsorLetter.studentId;
            console.log('after call to postSponsorLetter; navigating to ' + target);
            _this.router.navigateByUrl(target);
        }, function (error) {
            console.log(_this.errorMessage = error);
            _this.isLoading = false;
        });
        return false;
    };
    SponsorLettersAddComponent.prototype.onCancel = function () {
        var target = '/students/sponsor-letters/' + this.sponsorLetter.studentId; // + '/' + this.studentId;
        console.log('navigating to ' + target);
        this.router.navigateByUrl(target);
    };
    SponsorLettersAddComponent.prototype.validateMonth = function (control) {
        console.log('month validator ' + control.value);
        var rtnVal = ('' + control.value === '0') ? {
            validateMonth: {
                valid: false
            }
        } : null;
        console.log(rtnVal);
        return rtnVal;
    };
    SponsorLettersAddComponent.prototype.hasChanges = function () {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.addNewForm.dirty);
        console.log('hasChanges net is ' + this.addNewForm.dirty || this.submitted);
        return this.addNewForm.dirty && !this.submitted;
    };
    return SponsorLettersAddComponent;
}());
SponsorLettersAddComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: './sponsor-letters-add.component.html',
        styleUrls: ['./sponsor-letters-add.component.css'],
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        SqlResource,
        FormBuilder])
], SponsorLettersAddComponent);
export { SponsorLettersAddComponent };
//# sourceMappingURL=sponsor-letters-add.component.js.map