import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { SqlResource } from '../../app_shared/services/sql-resource';
import { RptMentorReport } from '../../app_shared/models/mentor-report';

interface SELECTITEM {
   value: string; label: string;
}

@Component({
  moduleId: module.id,
  templateUrl: './mr-summary-updates.component.html',
  styleUrls: ['../../../assets/css/forms.css'],
})

export class MentorReportSummaryUpdatesComponent
        implements OnInit {
    frmUpdate: FormGroup;
    mentorReport: RptMentorReport;
    isLoading: boolean;
    submitted: boolean;
    errorMessage: string;
    successMessage: string;

    lastYear: AbstractControl;
    lastMonth: AbstractControl;
    snapshot: AbstractControl;
    followUp: AbstractControl;
    success: AbstractControl;
    challenge: AbstractControl;
    summary: AbstractControl;
    summaryStatus: AbstractControl;
    highlightStatus: AbstractControl;

    // contactYears: SELECTITEM[];
    // contactMonths: SELECTITEM[];

    sponsorSummaryStatuses: SELECTITEM[];
    highlightStatuses: SELECTITEM[];
    followUpStatuses: SELECTITEM[];
    selectedYear: string;
    selectedMonth: string;
    selectedSponsorSummaryStatus: string;
    selectedFollowUpStatus: string;
    savedSponsorSummaryStatusId: number;
    savedHighlightStatusId: number;

    constructor(
              public currRoute: ActivatedRoute,
              private router: Router,
              public sqlResource: SqlResource,
              private _fb: FormBuilder
    ) {



    this.sponsorSummaryStatuses = [
      { value: '0', label: '[None]' },
      { value: '2086', label: 'NeedsSetup' },
      { value: '2087', label: 'NeedsReview' },
      { value: '2088', label: 'ReadyToSend' },
      { value: '2089', label: 'Sent'},
      { value: '2090', label: 'Skipped'}
    ];

      this.highlightStatuses = [
        { value: '0', label: '[None]' },
        { value: '2105', label: 'Internal' },
        { value: '2106', label: 'Internal/External' },
      ];


        this.frmUpdate = _fb.group({

            inputSummary: [''],//,Validators.compose([Validators.required, Validators.maxLength(2000)])],

            summaryStatusSelector: [''],

            highlightStatusSelector: ['']
        });

        this.summary = this.frmUpdate.controls['inputSummary'];
        this.summaryStatus = this.frmUpdate.controls['summaryStatusSelector'];
        this.highlightStatus = this.frmUpdate.controls['highlightStatusSelector'];


        this.mentorReport = new RptMentorReport();// MentorReportResource();

        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
    };

    ngOnInit() {


    const mentorReportId = this.currRoute.snapshot.params['mentorReportId'];
    console.log('sqlResource with MentorReportId: ' + mentorReportId);
    this.isLoading = true;
    this.sqlResource.getMentorReport(mentorReportId)
      .subscribe(
        data => {this.mentorReport = data;},
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done with data MentorReport>>');
                console.log(this.mentorReport);
                this.savedHighlightStatusId = this.mentorReport.highlightStatusId;
                this.savedSponsorSummaryStatusId = this.mentorReport.sponsorSummaryStatusId;
                console.log('<<');
              this.isLoading = false;
            }
      );

      this.frmUpdate.valueChanges.subscribe(
          (form: any) => {
                            this.errorMessage = '';
                            this.successMessage = '';
                            this.submitted = false;
                            //console.log('form change event');
          }
      );
    }

    onSubmit()  {
        console.log('Hi from mentor ReportReview Submit');
        //console.log(this.mentorReport);

        if (this.frmUpdate.invalid) {
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

          if (!this.followUp.valid || !this.success.valid || !this.challenge.valid) {
            this.errorMessage = this.errorMessage + 'All 3 text boxes must be filled in . ';
            ++i;
          }

          window.scrollTo(0,0);
          return false;
        }


        this.sqlResource.updateMentorReport(this.mentorReport,
                                        this.mentorReport.mentorId,
                                        this.mentorReport.studentId)
            .subscribe(
                (student) => {
                    console.log(this.successMessage = <any>student);
                    this.submitted = true;
                    this.isLoading = false;
                    this.navigateBackInContext();
                },
                (error) =>  {
                    console.log(this.errorMessage = <any>error);
                    this.isLoading = false;
                }
            );
        return false;
    }

    onCancel() {
      this.navigateBackInContext();
    }

    navigateBackInContext() {
      const target = '/admins/mentor-reports/summary-tracking';
      console.log('after Submit or Cancel navigating to ' + target);
      const reportDate = new Date(this.mentorReport.reportDateTime);

      let reportMonth = reportDate.getMonth() + 1;  // JS Date months are zero based
      if (reportDate.getDate() <= 2) {
        reportMonth--;
      }
      const navigationExtras: NavigationExtras = {
        queryParams: { id: 'id' + this.mentorReport.mentorReportId,
                        month:  reportMonth,
                        summary: this.savedSponsorSummaryStatusId,
                        highlight: this.savedHighlightStatusId
                      }
      };

      this.router.navigate([target], navigationExtras);
    }


    public hasChanges() {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.frmUpdate.dirty);
        console.log('hasChanges net is ' + this.frmUpdate.dirty  || this.submitted);
        return this.frmUpdate.dirty && !this.submitted;
    }

}
