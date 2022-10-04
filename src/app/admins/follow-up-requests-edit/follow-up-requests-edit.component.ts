import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowUpDataService } from 'src/app/_shared/data/follow-up-data.service';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { FollowUpRequest } from '../../_shared/models/follow-up-request';
import { SessionService } from '../../_shared/services/session.service';
import { TranslationService } from '../../_shared/services/translation.service';

@Component({
  selector: 'app-follow-up-requests-edit',
  templateUrl: './follow-up-requests-edit.component.html',
  styleUrls: ['./follow-up-requests-edit.component.css']
})
export class FollowUpRequestsEditComponent implements OnInit {
  myForm: FormGroup;
  followUpRequest: FollowUpRequest;
  isLoading: boolean;
  submitted: boolean;

  requestId: number;
  childRequesterId: number;
  childRequestStatusId: number;


  errorMessage: string;
  successMessage: string;
  requestStatuses: SELECTITEM[];
  currentStudentGUId: string;

  // selectedFollowUpStatus: string;
  // savedFollowUpStatusId: number;
  // studentName: string;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public followUpData: FollowUpDataService,
    private _fb: FormBuilder,
    private session: SessionService,
    private xlator: TranslationService
  ) {
    console.log('followUpRequestsEditComponent constructor');
    this.requestStatuses = constants.followUpStatuses;
    console.log(this.requestStatuses);

    this.myForm = _fb.group({
      studentSelector: [''],
      requesterSelector: [''],
      reviewedStatusSelector: [''],
      subject_English: [''],
      subject_Spanish: [''],
      updateHistory_English: [''],
      updateHistory_Spanish: ['']
    });

    //                      [(ngModel)]="followUpRequest.description_English"
//


    this.followUpRequest = new FollowUpRequest();

    // SQL Server will adjust the time to UTC by adding TimezoneOffset
    // we want to store local time so we adjust for that.
    const now = new Date();
    this.followUpRequest.createDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    console.log('reportDateTime = ' + this.followUpRequest.createDateTime);

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
      const followUpRequestId = this.currRoute.snapshot.params['requestId'];

      this.isLoading = true;
      console.log('in fetchFilteredData for FollowUpRequests with ' + followUpRequestId);
      this.followUpData.getFollowUpRequestByRequest(followUpRequestId).subscribe(
        (data) => {
          this.followUpRequest = data;
        },
        (err) => console.error('FollowUpReqs: data error: ' + err),
      () => {
        console.log('done with data followUpRequest, have data: ');
        console.log(this.followUpRequest);
        this.requestId = this.followUpRequest.followUpRequestId;
        this.currentStudentGUId = this.followUpRequest.studentGUId ;
        this.myForm.controls.studentSelector.setValue(this.followUpRequest.studentGUId);
        this.myForm.controls.requesterSelector.setValue(this.followUpRequest.requesterId);
        this.myForm.controls.reviewedStatusSelector.setValue(this.followUpRequest.requestStatusId);
        this.myForm.controls.subject_English.setValue(this.followUpRequest.subject_English);
        this.myForm.controls.subject_Spanish.setValue(this.followUpRequest.subject_Spanish);
        this.myForm.controls.updateHistory_English.setValue(this.followUpRequest.updateHistory_English);
        this.myForm.controls.updateHistory_Spanish.setValue(this.followUpRequest.updateHistory_Spanish);


        this.isLoading = false;
      }
    );

    this.myForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.submitted = false;
      // console.log('form change event');
    });
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    // this.followUpRequest = { ...this.followUpRequest, ...this.myForm.value };

    this.followUpRequest.requesterId = this.childRequesterId;
    this.followUpRequest.requestStatusId = this.childRequestStatusId;
    this.followUpRequest.latestUpdaterId = 1451;
    this.followUpRequest.subject_English = this.myForm.controls.subject_English.value;
    this.followUpRequest.subject_Spanish = this.myForm.controls.subject_Spanish.value;
    this.followUpRequest.updateHistory_English = this.myForm.controls.updateHistory_English.value;
    this.followUpRequest.updateHistory_Spanish = this.myForm.controls.updateHistory_Spanish.value;
    this.followUpRequest.lastUpdateDateTime = new Date();
    this.followUpRequest.createDateTime = new Date();

    this.followUpRequest.studentGUId =  this.currentStudentGUId;// set by store message
  }

  onSubmit() {
    console.log('Hi from FollowUpRequests Submit');

    if (this.myForm.invalid) {
      this.errorMessage = '';
      window.scrollTo(0, 0);
      return false;
    }
    this.retrieveFormValues();
    this.followUpData.updateFollowUpRequest(this.followUpRequest).subscribe(
      (response) => {
        console.log('followUp Edit Request completed');
        console.log(response.followUpRequest);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      },
      () => {}
    );
    return false;
  }

  onCancel() {
    this.navigateBackInContext();
  }

  navigateBackInContext() {
    const link = ['/admins/follow-up/requests'];
    console.log('after Submit or Cancel navigating to ' + link);

    // const navigationExtras: NavigationExtras = {
    //   // queryParams: { id: 'id' + this.followUpRequest.followUpRequestId,
    //   //                 summary: this.savedFollowUpStatusId
    //   //               }
    // };

    this.router.navigate(link);
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }

  public onSelectedStudentGUId(studentGUId: string) {
    this.followUpRequest.studentGUId = studentGUId;
    console.log('container form has studentGUId ' + studentGUId);
  }

  public onSelectedMemberId(memberId: number) {
    this.childRequesterId = memberId;
    // this.followUpRequest.requesterId = memberId;
    console.log('container form has reqeustorMemberId ' + memberId);
  }
  public onSelectedRequestStatus(statusId: number) {
    this.childRequestStatusId = statusId;
    console.log('requestStatus set to  ' + statusId);
  }

  public translateFromSpanish(spanishText: string) {
    this.xlator.translateFromSpanish(spanishText);
  }
}
