import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { RptMentorReport } from '../../app_shared/models/mentor-report';
import { SqlResource } from '../../app_shared/services/sql-resource.service';



@Component({
  templateUrl: './monthly-reports-edit.component.html'
})

export class MonthlyReportsEditComponent
        implements OnInit {
    myForm: FormGroup;
    mentorReport: RptMentorReport;
    isLoading: boolean;
    submitted: boolean;

    lastYear: AbstractControl;
    lastMonth: AbstractControl;
    snapshot: AbstractControl;
    followUp: AbstractControl;
    success: AbstractControl;
    challenge: AbstractControl;
    reportId: AbstractControl;
    contactYears: SELECTITEM[];
    contactMonths: SELECTITEM[];
    errorMessage: string;
    successMessage: string;
    needsFollowUp: boolean;
    mentorReportId: number;


    constructor(
              public currRoute: ActivatedRoute,
              private router: Router,
              public sqlResource: SqlResource,
              private _fb: FormBuilder
    ) {

        console.log('Hi from MonthlyReportsAddComponent');
     this.contactYears = [
      // {value: '0', label: 'Select Year'},
      // {value: '2016', label: '2016'},
      // {value: '2017', label: '2017'},
      {value: '2018', label: '2018'} // , {value: '2019', label: '2015'},
      //    {value: '2020', label: '2020'}
    ];

     this.contactMonths = [
      {value: '0', label: 'Select Month'},
      {value: '1', label: 'Jan/Enero'},
      {value: '2', label: 'Feb/Feb'},
      {value: '3', label: 'Mar/Marzo'},
      {value: '4', label: 'Apr/Abr'},
      {value: '5', label: 'May/Mayo'},
      {value: '6', label: 'Jun/Jun'},
      {value: '7', label: 'Jul/Jul'},
      {value: '8', label: 'Aug/Agosto'},
      {value: '9', label: 'Sep/Sept'},
      {value: '10', label: 'Oct/Oct'},
      {value: '11', label: 'Nov/Nov'},
      {value: '12', label: 'Dec/Dic'}
          ];

        this.myForm = _fb.group({
            lastContactYearSelector: ['2018', Validators.required],
            // lastContactMonthSelector: ['', this.validateMonth],
            lastContactMonthSelector: [''],
            inputSnapshot: [this.snapshot, Validators.required],
            inputFollowUp: [this.followUp, Validators.compose(
                                [Validators.maxLength(2000)])],
            inputSuccess: [this.success, Validators.compose(
                                [Validators.required, Validators.maxLength(2000)])],
            inputSetback: [this.challenge, Validators.compose(
                [Validators.required, Validators.maxLength(2000)])],
            mentorReportId: [this.reportId]

        });

        this.lastYear = this.myForm.controls['lastContactYearSelector'];
        this.lastMonth = this.myForm.controls['lastContactMonthSelector'];
        this.snapshot = this.myForm.controls['inputSnapshot'];
        this.followUp = this.myForm.controls['inputFollowUp'];
        this.success = this.myForm.controls['inputSuccess'];
        this.challenge = this.myForm.controls['inputSetback'];
        this.reportId = this.myForm.controls['mentorReportId']

        this.mentorReport = new RptMentorReport();
        this.mentorReport.mentorId = 0;
        this.mentorReport.studentId = 0;
        // SQL Server will adjust the time to UTC by adding TimezoneOffset
        // we want to store local time so we adjust for that.
        const now = new Date();
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

    ngOnInit() {
        console.log('monthlyReportsEdit ngOnInit');

        // this.mentorReport.mentorId = this.currRoute.snapshot.params['mentorId'];
        // this.mentorReport.studentId = this.currRoute.snapshot.params['studentId'];
        // console.log('mentorId ' + this.mentorReport.mentorId);
        // console.log('studentId ' + this.mentorReport.studentId);

        this.mentorReportId = this.currRoute.snapshot.params['mentorReportId'];
        console.log('calling sqlResource with mentorReportId: ' + this.mentorReportId);
        this.isLoading = true;
        this.sqlResource.getMentorReport(this.mentorReportId)
          .subscribe(
            data => {this.mentorReport = data; },
            err => console.error('Subscribe error: ' + err),
            () => {console.log('done loading');
                this.isLoading = false;
                console.log('setting reportId to ' + this.mentorReportId);
                this.reportId.setValue(this.mentorReportId);
                this.lastYear.setValue(this.mentorReport.lastContactYear);
                this.lastMonth.setValue(this.mentorReport.lastContactMonth);
                this.snapshot.setValue(this.mentorReport.mentorReportSnapshot);
                this.followUp.setValue(this.mentorReport.followUpHistory);
                this.success.setValue(this.mentorReport.recentSuccess);
                this.challenge.setValue(this.mentorReport.recentSetback);
                }
          );
        // this.mentorReport.lastContactYear = (Number)(this.contactYears[this.contactYears.length - 1].value);
        // this.mentorReport.lastContactYear = (Number)(this.contactYears[0].value);
        // this.mentorReport.sponsorSummaryStatusId = 2086;
        console.log('after init form values');
      this.myForm.valueChanges.subscribe(
          (form: any) => {
                            this.errorMessage = '';
                            this.successMessage = '';
                            this.submitted = false;
                            // console.log('form change event');
          }
      );
    }

    onNeedsFollowUp() {
      console.log('setting needs followup');
      this.needsFollowUp = !this.needsFollowUp;
      this.mentorReport.followUpStatusId = 2091; // Needed
    }

    onSubmit()  {
        console.log('Hi from mentor Report Submit');
        // console.log(this.mentorReport);

        if (this.myForm.invalid) {
          let i = 0;
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
        //this.mentorReport.mentorId = this.reportId.value;
        this.mentorReport.recentSetback = this.challenge.value;
        this.mentorReport.recentSuccess = this.success.value;
        this.mentorReport.mentorReportSnapshot = this.snapshot.value;
        this.mentorReport.lastContactYear = this.lastYear.value;
        this.mentorReport.lastContactMonth = this.lastMonth.value;
        this.mentorReport.followUpHistory = this.followUp.value;

        this.sqlResource.editMentorReport(this.mentorReport)
          .subscribe(
              (student) => {
                  console.log(this.successMessage = <any>student);
                  this.submitted = true;
                  this.isLoading = false;
                  const target = '/mentors/monthly-reports/' + this.mentorReport.mentorId; // + '/' + this.mentorReport.studentId;
                  console.log('after call to editMentorReport; navigating to ' + target);
                  this.router.navigateByUrl(target);
              },
              (error) =>  {
                  console.log(this.errorMessage = <any>error);
                  this.isLoading = false;
              }
          );
      return false;
    }

    onCancel() {
        const target = '/mentors/monthly-reports/' + this.mentorReport.mentorId; // + '/' + this.studentId;
        console.log('navigating to ' + target);
        this.router.navigateByUrl(target);
    }

    validateMonth(control: FormControl): { [error: string]: any } {
        console.log('month validator ' + control.value);
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
        return this.myForm.dirty && !this.submitted;
    }

}
