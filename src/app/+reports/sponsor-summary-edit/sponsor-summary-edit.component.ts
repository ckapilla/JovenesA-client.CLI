import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { SqlResource } from '../../app_shared/services/sql-resource';
import { LatestMentorReports2 } from '../shared/report-models/latest-mentor-reports2';

interface SELECTITEM {
   value: string; label: string;
}

@Component({
  moduleId: module.id,
  templateUrl: './sponsor-summary-edit.component.html',
  styleUrls: ['./sponsor-summary-edit.component.css'],
})

export class SponsorSummaryEditComponent
        implements OnInit {
    editSummaryForm: FormGroup;
    summaryReport: LatestMentorReports2 ;
    summary: AbstractControl;
    isLoading: boolean;
    submitted: boolean;
    errorMessage: string;
    successMessage: string;

    constructor(
              public currRoute: ActivatedRoute,
              private router: Router,
              public sqlResource: SqlResource,
              private _fb: FormBuilder
    ) {

        console.log('Hi from MonthlyReportsAddComponent');


        this.editSummaryForm = _fb.group({
            lastContactYearSelector: ['', Validators.required],

            inputSummary: ['',Validators.compose(
                                [Validators.required, Validators.maxLength(2000)])],

        });


        // this.summary = this.editSummaryForm.controls['inputSummary'];

        // this.summaryReport = new LatestMentorReports2();
        // this.summaryReport.mentorId = 0;//$stateParams.mentorId;
        // this.summaryReport.studentId = 0;//$stateParams.studentId;
        // // SQL Server will adjust the time to UTC by adding TimezoneOffset
        // // we want to store local time so we adjust for that.
        // var now = new Date();
        // this.summaryReport.reportDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        // console.log(this.summaryReport.reportDateTime);

        // this.errorMessage = '';
        // this.successMessage = '';
        // this.submitted = false;
    };

    ngOnInit() {
        console.log('monthlyReportsAdd ngOnInit');
        //this.myLogger.log('param as Number: ' + Number(this.routeParams.get('mentorId')));
        this.summaryReport.mentorId = this.currRoute.snapshot.params['mentorId'];
        this.summaryReport.studentId = this.currRoute.snapshot.params['studentId'];
        console.log('mentorId ' + this.summaryReport.mentorId);
        console.log('studentId ' + this.summaryReport.studentId);


      this.editSummaryForm.valueChanges.subscribe(
          (form: any) => {
                            this.errorMessage = '';
                            this.successMessage = '';
                            this.submitted = false;
                            console.log('form change event');
          }
      );
    }

    // onSubmit()  {
    //     console.log('Hi from mentor Report Submit');
    //     //console.log(this.summaryReport);

    //     if (this.editSummaryForm.invalid) {
    //       // let i = 0;
    //       // this.errorMessage = '';

    //       // if (!this.lastYear.valid || !this.lastMonth.valid) {
    //       //  this.errorMessage = this.errorMessage + 'Year and month must be selected from drop-downs. ';
    //       //  ++i;
    //       // }

    //       // if (!this.snapshot.valid) {
    //       //   this.errorMessage = this.errorMessage + 'A green, yellow or red snapshot icon must be selected. ';
    //       //   ++i;
    //       // }

    //       // if (!this.followUp.valid || !this.success.valid || !this.challenge.valid) {
    //       //   this.errorMessage = this.errorMessage + 'All 3 text boxes must be filled in . ';
    //       //   ++i;
    //       // }

    //       window.scrollTo(0,0);
    //       return false;
    //     }


    //     this.sqlResource.postMentorReport(this.summaryReport,
    //                                     this.summaryReport.mentorId,
    //                                     this.summaryReport.studentId)
    //         .subscribe(
    //             (student) => {
    //                 console.log(this.successMessage = <any>student);
    //                 this.submitted = true;
    //                 this.isLoading = false;
    //                 let target = '/mentors/monthly-reports/' + this.summaryReport.mentorId;// + '/' + this.summaryReport.studentId;
    //                 console.log('after call to postMentorReport; navigating to ' + target);
    //                 this.router.navigateByUrl(target);
    //             },
    //             (error) =>  {
    //                 console.log(this.errorMessage = <any>error);
    //                 this.isLoading = false;
    //             }
    //         );
    //     return false;
    // }

    // onCancel() {
    //     // let target = '/mentors/monthly-reports/' + this.summaryReport.mentorId;// + '/' + this.studentId;
    //     // console.log('navigating to ' + target);
    //     // this.router.navigateByUrl(target);
    // }

    public hasChanges() {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.editSummaryForm.dirty);
        console.log('hasChanges net is ' + this.editSummaryForm.dirty  || this.submitted);
        return this.editSummaryForm.dirty && !this.submitted;
    }

}
