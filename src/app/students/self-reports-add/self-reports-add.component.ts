import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentSelfReport } from 'src/app/app_shared/models/student-self-report';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { SqlResource } from '../../app_shared/services/sql-resource.service';



@Component({

    templateUrl: './self-reports-add.component.html',
    styleUrls: ['./self-reports-add.component.css'],
})

export class SelfReportsAddComponent
    implements OnInit {
    myForm: FormGroup;
    selfReport: StudentSelfReport;
    isLoading: boolean;
    submitted: boolean;

    reportYear: AbstractControl;
    reportPeriod: AbstractControl;
    reportText_English: AbstractControl;
    periodYears: SELECTITEM[];
    periodMonths: SELECTITEM[];
    errorMessage: string;
    successMessage: string;


    constructor(
        public currRoute: ActivatedRoute,
        private router: Router,
        public sqlResource: SqlResource,
        private _fb: FormBuilder
    ) {

        console.log('Hi from SelfReportsAddComponent');
        this.periodYears = [
            // {value: '2016', label: '2016'},
            // {value: '2017', label: '2017'} // ,
            { value: '2019', label: '2019' },
            { value: '2020', label: '2020' }
        ];

        this.periodMonths = [
            // {value: '0', label: 'Seleccionar Mes'},
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' }
        ];

        this.myForm = _fb.group({
            reportYearSelector: ['', Validators.required],
            reportPeriodSelector: ['', this.validateMonth],

            inputReportText: ['', Validators.compose(
                [Validators.required, Validators.maxLength(2000)])]
        });

        this.reportYear = this.myForm.controls['reportYearSelector'];
        this.reportPeriod = this.myForm.controls['reportPeriodSelector'];
        this.reportText_English = this.myForm.controls['inputFollowUp'];


        this.selfReport = new StudentSelfReport();
        this.selfReport.sponsorGroupId = 0;
        this.selfReport.studentId = 0;
        // SQL Server will adjust the time to UTC by adding TimezoneOffset
        // we want to store local time so we adjust for that.
        const now = new Date();
        this.selfReport.reportDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        console.log(this.selfReport.reportDateTime);

        this.selfReport.reportYear = null; // moment(new Date).format('YYYY-MM-DD');
        this.selfReport.reportPeriod = null;
        this.selfReport.reportText_English = '';

        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
    }

    ngOnInit() {
        console.log('selfReportsAdd ngOnInit');
        this.selfReport.sponsorGroupId = this.currRoute.snapshot.params['sponsorId'];
        this.selfReport.studentId = this.currRoute.snapshot.params['studentId'];
        console.log('sponsorGroupId ' + this.selfReport.sponsorGroupId);
        console.log('studentId ' + this.selfReport.studentId);
        this.selfReport.reportYear = 2018;
        this.selfReport.reportPeriod = 1;

        this.myForm.valueChanges.subscribe(
            (form: any) => {
                this.errorMessage = '';
                this.successMessage = '';
                this.submitted = false;
                // console.log('form change event');
            }
        );
    }

    onSubmit() {
        console.log('Hi from self report Submit');


        if (this.myForm.invalid) {
            let i = 0;
            this.errorMessage = '';

            if (!this.reportYear.valid || !this.reportPeriod.valid) {
                this.errorMessage = this.errorMessage + 'Year and month must be selected from drop-downs. ';
                ++i;
            }

            if (!this.reportText_English.valid) {
                this.errorMessage = this.errorMessage + 'Report text box must be filled in . ';
                ++i;
            }

            return false;
        }


        this.sqlResource.postStudentSelfReport(this.selfReport,
            this.selfReport.studentId,
            this.selfReport.sponsorGroupId)
            .subscribe(
                (student) => {
                    console.log(this.successMessage = <any>student);
                    this.submitted = true;
                    this.isLoading = false;
                    const target = '/student-self-reports/' + this.selfReport.studentId;
                    console.log('after call to postStudentSelfReports; navigating to ' + target);
                    this.router.navigateByUrl(target);
                },
                (error) => {
                    console.log(this.errorMessage = <any>error);
                    this.isLoading = false;
                }
            );
        return false;
    }

    onCancel() {
        const target = '/student_self_reports/' + this.selfReport.studentId; // + '/' + this.studentId;
        console.log('navigating to ' + target);
        this.router.navigateByUrl(target);
    }

    validateMonth(control: FormControl): { [error: string]: any } {
        // console.log('month validator ' + control.value);
        const rtnVal: any = ('' + control.value === '0') ? { // can be either string or number
            validateMonth: {
                valid: false
            }
        } : null;
        console.log(rtnVal);
        return rtnVal;
    }

    public hasChanges() {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.myForm.dirty);
        console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
        return this.myForm.dirty && !this.submitted;
    }

}
