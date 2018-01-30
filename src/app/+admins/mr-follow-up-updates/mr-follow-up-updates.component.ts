import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

import { SqlResource } from '../../app_shared/services/sql-resource';
import { RptMentorReport } from '../../app_shared/models/mentor-report';

import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';

@Component({
  moduleId: module.id,
  templateUrl: './mr-follow-up-updates.component.html',
  styleUrls: ['../../../assets/css/forms.css'],
})

export class MentorReportFollowUpUpdatesComponent
        implements OnInit {
    frmUpdate: FormGroup;
    mentorReport: RptMentorReport;
    isLoading: boolean;
    submitted: boolean;

    followUpNeeded: AbstractControl;
    followUpStatusSelector: AbstractControl;
    followUpHistory: AbstractControl;

    errorMessage: string;
    successMessage: string;
    followUpStatuses: SELECTITEM[];

    selectedFollowUpStatus: string;
    savedFollowUpStatusId: number;


    constructor(
              public currRoute: ActivatedRoute,
              private router: Router,
              public sqlResource: SqlResource,
              private _fb: FormBuilder
    ) {


      this.followUpStatuses = [
        { value: '0', label: '[None]' },
        { value: '2091', label: 'Requested' },
        { value: '2092', label: 'Assigned' },
        { value: '2104', label: 'Closed' },
      ];


        this.frmUpdate = _fb.group({

            followUpNeeded  : [''],
            followUpHistory  : [''],
            followUpStatusSelector: [''],

        });

        this.frmUpdate = _fb.group({

            inputFollowUpHistory: [''], //,Validators.compose([Validators.required, Validators.maxLength(2000)])],

            followUpStatusSelector: [''],

            inputFollowUpNeeded: ['']
        });


        this.followUpHistory = this.frmUpdate.controls['inputFollowUpHistory'];
        this.followUpStatusSelector = this.frmUpdate.controls['followUpStatusSelector'];
        this.followUpNeeded = this.frmUpdate.controls['inputFollowUpNeeded'];

        this.mentorReport = new RptMentorReport(); // MentorReportResource();

        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
    }

    ngOnInit() {


    const mentorReportId = this.currRoute.snapshot.params['mentorReportId'];
    console.log('sqlResource with MentorReportId: ' + mentorReportId);
    this.isLoading = true;
    this.sqlResource.getMentorReport(mentorReportId)
      .subscribe(
        data => {this.mentorReport = data; },
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done with data MentorReport>>');
                console.log(this.mentorReport);
                this.savedFollowUpStatusId = this.mentorReport.followUpStatusId;
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
        // console.log(this.mentorReport);

        if (this.frmUpdate.invalid) {
          this.errorMessage = '';
          window.scrollTo(0, 0);
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
      const target = '/admins/mentor-reports/follow-up-tracking';
      console.log('after Submit or Cancel navigating to ' + target);

      const navigationExtras: NavigationExtras = {
        queryParams: { id: 'id' + this.mentorReport.mentorReportId,
                        summary: this.savedFollowUpStatusId
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
