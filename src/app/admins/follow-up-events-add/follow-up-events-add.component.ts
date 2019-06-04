import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';


@Component({
  selector: 'app-follow-up-events-add',
  templateUrl: './follow-up-events-add.component.html',
  styleUrls: ['./follow-up-events-add.component.css']
})
export class FollowUpEventsAddComponent implements OnInit {

    frmUpdate: FormGroup;
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
    studentName: string;


    constructor(
        public currRoute: ActivatedRoute,
        private router: Router,
        public sqlResource: SqlResource,
        private _fb: FormBuilder,
        private session: SessionService
    ) {


      this.followUpStatuses = [
        { value: '0', label: '[None]' },
        { value: '2091', label: 'Requested' },
        { value: '2092', label: 'Assigned' },
        { value: '2104', label: 'Closed' },
      ];


        this.frmUpdate = _fb.group({
            description  : [''],
            followUpStatusSelector: [''],

        });

        this.frmUpdate = _fb.group({
            followUpStatusSelector: [''],
            inputDescription: ['']
        });

        this.followUpStatusSelector = this.frmUpdate.controls['followUpStatusSelector'];

        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
        this.studentName = this.session.getStudentInContextName();
    }

    ngOnInit() {

    this.isLoading = true;

      this.frmUpdate.valueChanges.subscribe(
          (form: any) => {
                            this.errorMessage = '';
                            this.successMessage = '';
                            this.submitted = false;
                            // console.log('form change event');
          }
      );

    }

    onSubmit()  {
        console.log('Hi from mentor ReportReview Submit');

        if (this.frmUpdate.invalid) {
          this.errorMessage = '';
          window.scrollTo(0, 0);
          return false;
        }

        // this.sqlResource.updateMentorReport(this.mentorReport)
        //     .subscribe(
        //         (student) => {
        //             console.log(this.successMessage = <any>student);
        //             this.submitted = true;
        //             this.isLoading = false;
        //             this.navigateBackInContext();
        //         },
        //         (error) =>  {
        //             console.log(this.errorMessage = <any>error);
        //             this.isLoading = false;
        //         }
        //     );
        return false;
    }

    onCancel() {
      this.navigateBackInContext();
    }

    navigateBackInContext() {
      const target = '/admins/follow-up-events';
      console.log('after Submit or Cancel navigating to ' + target);

      const navigationExtras: NavigationExtras = {
        // queryParams: { id: 'id' + this.mentorReport.mentorReportId,
        //                 summary: this.savedFollowUpStatusId
        //               }
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
