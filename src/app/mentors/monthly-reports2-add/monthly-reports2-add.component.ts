import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorReport2DataService } from 'src/app/_shared/services/mentor-report2-data.service';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { MentorReport2RPT } from '../../_shared/models/mentor-report2';
import { SessionService } from '../../_shared/services/session.service';

@Component({

    templateUrl: './monthly-reports2-add.component.html'
})

export class MonthlyReports2AddComponent
    implements OnInit {
    myForm: FormGroup;
    mentorReport2: MentorReport2RPT = new MentorReport2RPT();
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
    mentorReportId: number;
    studentName: string;

    readonly contactYears: SELECTITEM[] = constants.years;
    readonly contactMonths: SELECTITEM[] = constants.months;

    constructor(
        public currRoute: ActivatedRoute,
        private router: Router,
        public mentorReportData: MentorReport2DataService,
        private _fb: FormBuilder,
        private session: SessionService
    ) {

        console.log('Hi from MonthlyReportsAddComponent');

        this.myForm = _fb.group({
            lastContactYearSelector: ['2020'], // Validators.required],
            lastContactMonthSelector: ['0', { validators: [this.validateMonth], updateOn: 'change' }],
            // use bogus integer value so change detection works:
            inputEmoji: [666, { validators: [Validators.required, this.validateEmojis], updateOn: 'change' }],
            inputNarrative_English: ['', Validators.required], // { validators: [Validators.required], updateOn: 'blur' }],
            inputNarrative_Spanish: [''],
            mentorReportId: [this.reportIdCtl]
        });

        this.lastYearCtl = this.myForm.controls.lastContactYearSelector;
        this.lastMonthCtl = this.myForm.controls.lastContactMonthSelector;
        this.emojiCtl = this.myForm.controls.inputEmoji;
        this.narrative_EnglishCtl = this.myForm.controls.inputNarrative_English;
        this.narrative_SpanishCtl = this.myForm.controls.inputNarrative_Spanish;
        this.reportIdCtl = this.myForm.controls.mentorReportId;
        this.mentorReport2.reviewedStatusId = 2086; // needs setup

        this.errorMessage = '';
        this.successMessage = '';
        this.isSubmitted = false;
        this.studentName = this.session.getStudentInContextName();
    }

    ngOnInit() {
        console.log('monthlyReportsAdd ngOnInit');

        this.mentorReport2.mentorId = this.currRoute.snapshot.params['mentorId'];
        this.mentorReport2.studentId = 0; // this.currRoute.snapshot.params['studentId'];
        this.mentorReport2.studentGUId = this.currRoute.snapshot.params['studentGUId'];
        console.log('mentorId ' + this.mentorReport2.mentorId);
        console.log('studentId ' + this.mentorReport2.studentId);
        console.log('studentGUId ' + this.mentorReport2.studentGUId);
        // SQL Server will adjust the time to UTC by adding TimezoneOffset
        // we want to store local time so we adjust for that.
        const now = new Date();
        this.mentorReport2.reportDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        console.log('reportDateTime = ' + this.mentorReport2.reportDateTime);
        // this.mentorReport.lastContactYear = (Number)(this.contactYears[this.contactYears.length - 1].value);
        this.mentorReport2.lastContactYear = 2020;
        this.mentorReport2.lastContactMonth = 0;

        this.myForm.valueChanges.subscribe(
            (form: any) => {
                console.log('valueChanges fired for blur');
                this.errorMessage = '';
                this.successMessage = '';
                this.isSubmitted = false;
                // console.log('form change event');
                this.checkFormControlsAreValid(false);
            }
        );
    }
    checkFormControlsAreValid(bSubmitting: boolean) {
        console.log('checking for valid form controls');
        if (this.myForm.invalid) {
            let i = 0;
            // this.errorMessage = 'Some information is incorrect or missing.';
            this.errorMessage = '';
            if (!this.lastMonthCtl.valid && (this.lastMonthCtl.touched || bSubmitting)) {
                this.errorMessage = this.errorMessage + 'Year and month must be selected from drop-downs. Año y mes deben ser seleccionados de listas desplegables';
                ++i;
            }
            if (!this.emojiCtl.valid && (this.emojiCtl.touched || bSubmitting)) {
                this.errorMessage = this.errorMessage + ' | An emoji must be selected. Se debe seleccionar un Emoji';
                ++i;
            }
            if (!this.narrative_EnglishCtl.valid && (this.narrative_EnglishCtl.touched || bSubmitting)) {
                this.errorMessage = this.errorMessage + ' | Description must be filled in. Descripcione debe rellenarse';
                ++i;
            }
            window.scrollTo(0, 0);
            return false;
        } else {
            return true;
        }
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
        this.mentorReport2.lastContactYear = this.lastYearCtl.value;
        this.mentorReport2.lastContactMonth = this.lastMonthCtl.value;
        this.mentorReport2.emoji = this.emojiCtl.value;
        this.mentorReport2.narrative_English = this.narrative_EnglishCtl.value;
        this.mentorReport2.narrative_Spanish = this.narrative_SpanishCtl.value;
        this.mentorReportData.addMentorReport2(this.mentorReport2)
            .subscribe(
                (student) => {
                    console.log(this.successMessage = <any>student);
                    // this.isSubmitted = true;
                    this.isLoading = false;
                    const target = '/mentors/monthly-reports/' + this.mentorReport2.mentorId; // + '/' + this.mentorReport.studentId;
                    console.log('after call to addMentorReport; navigating to ' + target);
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
        const target = '/mentors/monthly-reports/' + this.mentorReport2.mentorId; // + '/' + this.studentId;
        console.log('navigating to ' + target);
        this.router.navigateByUrl(target);
    }

    validateMonth(control: FormControl): { [error: string]: any } {
        console.log('validateMonth has input ' + control.value);
        // tslint:disable-next-line: triple-equals
        const rtnVal: any = ('' + control.value == '0')  // can be either string or number
            ? { validateMonth: { valid: false } }
            : null;
        console.log('validateMonth returning' + rtnVal);
        return rtnVal;
    }
    validateEmojis(control: FormControl): { [error: string]: any } {
        console.log('emoji validator ' + control.value);
        const rtnVal: any = (control.value === 666)
            ? { validateEmojis: { valid: false } }
            : null;
        console.log(rtnVal);
        return rtnVal;
    }
    public hasChanges() {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.isSubmitted);
        console.log('hasChanges has form dirty ' + this.myForm.dirty);
        return this.myForm.dirty && !this.isSubmitted;
    }

}
