import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { RptMentorReport } from '../../app_shared/models/mentor-report';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';



@Component({

  templateUrl: './monthly-reports-add.component.html'
})

export class MonthlyReportsAddComponent
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
    contactYears: SELECTITEM[];
    contactMonths: SELECTITEM[];
    errorMessage: string;
    successMessage: string;
    needsFollowUp: boolean;
    studentName: string;


    constructor(
              public currRoute: ActivatedRoute,
              private router: Router,
              public sqlResource: SqlResource,
              private _fb: FormBuilder,
              private session: SessionService
    ) {

        console.log('Hi from MonthlyReportsAddComponent');
     this.contactYears = [
      // {value: '0', label: 'Select Year'},
      // {value: '2016', label: '2016'},
      // {value: '2017', label: '2017'},
         { value: '2018', label: '2018' },
         { value: '2019', label: '2019' },
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
            lastContactYearSelector: ['', Validators.required],
            lastContactMonthSelector: ['', this.validateMonth],

            inputSnapshot: ['', Validators.required],
            inputFollowUp: ['', Validators.compose(
                                [Validators.maxLength(2000)])],
            inputSuccess: ['', Validators.compose(
                                [Validators.required, Validators.maxLength(2000)])],
            inputSetback: ['', Validators.compose(
                                [Validators.required, Validators.maxLength(2000)])],

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
        this.studentName = this.session.getStudentInContextName();
    }

    ngOnInit() {
        console.log('monthlyReportsAdd ngOnInit');

        this.mentorReport.mentorId = this.currRoute.snapshot.params['mentorId'];
        this.mentorReport.studentId = this.currRoute.snapshot.params['studentId'];
        console.log('mentorId ' + this.mentorReport.mentorId);
        console.log('studentId ' + this.mentorReport.studentId);
        // this.mentorReport.lastContactYear = (Number)(this.contactYears[this.contactYears.length - 1].value);
        this.mentorReport.lastContactYear = 2019;
        this.mentorReport.lastContactMonth = 0;
        this.mentorReport.sponsorSummaryStatusId = 2086;
        console.log('zzz');
      this.myForm.valueChanges.subscribe(
          (form: any) => {
                            this.errorMessage = '';
                            this.successMessage = '';
                            this.submitted = false;
                            console.log('form change event');
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


    this.sqlResource.addMentorReport(this.mentorReport,
                                      this.mentorReport.mentorId,
                                      this.mentorReport.studentId)
          .subscribe(
              (student) => {
                  console.log(this.successMessage = <any>student);
                  this.submitted = true;
                  this.isLoading = false;
                  const target = '/mentors/monthly-reports/' + this.mentorReport.mentorId; // + '/' + this.mentorReport.studentId;
                  console.log('after call to addMentorReport; navigating to ' + target);
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
