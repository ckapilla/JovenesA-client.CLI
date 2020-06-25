import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfidentialDataService } from 'src/app/_shared/services/confidential-data.service';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { ConfidentialReportRPT } from '../../_shared/models/confidential-report';
import { SessionService } from '../../_shared/services/session.service';

interface IValidationType { [error: string]: boolean | null; }

@Component({

    templateUrl: './confidential-reports-add.component.html'
})

export class ConfidentialReportsAddComponent
    implements OnInit {
    myForm: FormGroup;
    confidentialReport: ConfidentialReportRPT = new ConfidentialReportRPT();
    isLoading: boolean;
    isSubmitted = false;

    lastYearCtl: AbstractControl;
    lastMonthCtl: AbstractControl;
    emojiCtl: AbstractControl;

    narrative_EnglishCtl: AbstractControl;
    narrative_SpanishCtl: AbstractControl;
    reportIdCtl: AbstractControl;
    errorMessage: string;
    successMessage: string;
    confidentialReportId: number;
    studentName: string;
    monthValidationMessage = '';
    emojiValidationMessage = '';
    narrativeValidationMessage = '';

    readonly contactYears: SELECTITEM[] = constants.years;
    readonly contactMonths: SELECTITEM[] = constants.months;

    // private validationMessages = {
    //     required: 'All required fields must be given a value',
    //     monthValidator: 'Please select a month'
    // };


    constructor(
        public currRoute: ActivatedRoute,
        private router: Router,
        public confidentialReportData: ConfidentialDataService,
        public _fb: FormBuilder,
        private session: SessionService
    ) {

        console.log('Hi from MonthlyReportsAddComponent');

        this.myForm = _fb.group({
            lastContactYearSelector: ['2020'], // Validators.required],
            lastContactMonthSelector: ['0', { validators: [this.validateMonth] }],
            // use bogus integer value so change detection works:
            inputEmoji: [666, { validators: [Validators.required, this.validateEmojis] }],
            narrative_English: ['', Validators.required],
            narrative_Spanish: [''],
            confidentialReportId: [this.reportIdCtl]
        });

        this.lastYearCtl = this.myForm.controls.lastContactYearSelector;
        this.lastMonthCtl = this.myForm.controls.lastContactMonthSelector;
        this.emojiCtl = this.myForm.controls.inputEmoji;
        this.narrative_EnglishCtl = this.myForm.controls.narrative_English;
        this.narrative_SpanishCtl = this.myForm.controls.narrative_Spanish;
        this.reportIdCtl = this.myForm.controls.confidentialReportId;
        this.confidentialReport.reviewedStatusId = 2087; // needs review

        this.errorMessage = '';
        this.successMessage = '';
        this.isSubmitted = false;
    }

    ngOnInit() {
        console.log('monthlyReportsAdd ngOnInit');

        this.confidentialReport.adminId = this.currRoute.snapshot.params['mentorId'];
        this.confidentialReport.studentId = 0; // this.currRoute.snapshot.params['studentId'];
        this.confidentialReport.studentGUId = this.currRoute.snapshot.params['studentGUId'];
        console.log('mentorId ' + this.confidentialReport.adminId);
        console.log('studentId ' + this.confidentialReport.studentId);
        console.log('studentGUId ' + this.confidentialReport.studentGUId);
        // SQL Server will adjust the time to UTC by adding TimezoneOffset
        // we want to store local time so we adjust for that.
        const now = new Date();
        this.confidentialReport.reportDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        console.log('reportDateTime = ' + this.confidentialReport.reportDateTime);
        // this. confidentialReport.lastContactYear = (Number)(this.contactYears[this.contactYears.length - 1].value);
        this.confidentialReport.lastContactYear = 2020;
        this.confidentialReport.lastContactMonth = 0;

        this.myForm.valueChanges.subscribe(
            (value: any) => {
                console.log('valueChanges fired for form with values');
                console.log(JSON.stringify(value));
                this.errorMessage = '';
                this.successMessage = '';
                this.isSubmitted = false;
                // console.log('form change event');
                this.checkFormControlsAreValid(false);
            }
        );
    }
    checkFormControlsAreValid(bSubmitting: boolean): boolean {
        console.log('checking for valid form controls');
        let allCorrect = true;
        this.errorMessage = '';
        this.monthValidationMessage = '';
        this.emojiValidationMessage = '';
        this.narrativeValidationMessage = '';
        if (this.lastMonthCtl.invalid && (this.lastMonthCtl.dirty || bSubmitting)) {
            this.monthValidationMessage = 'Please select the correct month. Por favor selecciona el mes corecto';
            allCorrect = false;
        }
        if (this.emojiCtl.invalid && (this.emojiCtl.dirty || bSubmitting)) {
            this.emojiValidationMessage = 'An emoji must be selected. Se debe seleccionar un Emoji';
            allCorrect = false;
        }
        if (this.narrative_EnglishCtl.invalid && (this.narrative_EnglishCtl.dirty || bSubmitting)) {
            this.narrativeValidationMessage = 'Description must be filled in. Descripcione debe rellenarse';
            allCorrect = false;
        }
        window.scrollTo(0, 0);
        return allCorrect;
    }

    onSubmit(): void {
        console.log('Hi from mentor Report2 Submit');
        if (this.isSubmitted) {
            return; // prevent dups
        }

        if (!this.checkFormControlsAreValid(true)) {
            return;
        }
        this.isSubmitted = true; // need to set guard immediately to prevent dups
        console.log('###before submitting update model with form control values');
        // mentorId and studentId and studentGUId do not have corresponding controls
        this.confidentialReport.lastContactYear = this.lastYearCtl.value;
        this.confidentialReport.lastContactMonth = this.lastMonthCtl.value;
        this.confidentialReport.emoji = this.emojiCtl.value;
        this.confidentialReport.narrative_English = this.narrative_EnglishCtl.value;
        this.confidentialReport.narrative_Spanish = this.narrative_SpanishCtl.value;
        this.confidentialReportData.addConfidentialReport(this.confidentialReport)
            .subscribe(
                (student) => {
                    console.log(this.successMessage = <any>student);
                    // this.isSubmitted = true;
                    this.isLoading = false;
                    // don't need to provide params, StudentGuid service will do the job
                    const target = '/confidential';
                    console.log('after call to addConfidentialReport; navigating to ' + target);
                    this.router.navigateByUrl(target);
                },
                (error) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                }
            );
        this.isSubmitted = true;
        return;
    }

    onCancel() {
        // don't need to provide params, StudentGuid service will do the job
        const target = '/confidential';
        console.log('navigating to ' + target);
        this.router.navigateByUrl(target);
    }

    validateMonth(control: FormControl): IValidationType {
        console.log('validateMonth has input ' + control.value);
        // tslint:disable-next-line: triple-equals
        if ('' + control.value == '0') {// can be either string or number
            console.log('validateMonth failed');
            return { validateMonth: true };
        } else {
            return null;
        }
    }

    validateEmojis(control: FormControl): IValidationType {
        // console.log('emoji validator ' + control.value);
        if (control.value === 666) {
            console.log('validate emoji failed');
            return { validateEmojis: true };
        } else {
            return null;
        }
    }
    public hasChanges() {
        // if have changes then routing guard will ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.isSubmitted);
        console.log('hasChanges has form dirty ' + this.myForm.dirty);
        return this.myForm.dirty && !this.isSubmitted;
    }

}
