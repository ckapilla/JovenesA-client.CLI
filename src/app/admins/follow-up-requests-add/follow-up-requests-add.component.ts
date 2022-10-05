import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FollowUpDataService } from 'src/app/_shared/data/follow-up-data.service';
import { MiscDataService } from 'src/app/_shared/data/misc-data.service';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { FollowUpRequest } from '../../_shared/models/follow-up-request';
import { SessionService } from '../../_shared/services/session.service';
import { TranslationService } from '../../_shared/services/translation.service';

@Component({
  selector: 'app-follow-up-requests-add',
  templateUrl: './follow-up-requests-add.component.html'
})
export class FollowUpRequestsAddComponent implements OnInit {
  myForm: FormGroup;
  followUpRequest: FollowUpRequest;
  isLoading: boolean;
  submitted: boolean;

  // updUpdateHistory_English: string;
  // updSubject_English: string;
  // updUpdateHistory_Spanish: string;
  // updSubject_Spanish: string;
  // updStudentGUId: string;

  errorMessage: string;
  successMessage: string;
  requestStatuses: SELECTITEM[];

  // selectedFollowUpStatus: string;
  // savedFollowUpStatusId: number;
  // studentName: string;
  admins$: Observable<SELECTITEM[]> = this.miscData.getAdmins$().pipe(
    catchError((err) => {
    this.errorMessage = err;
    console.log('CAUGHT ERROR IN Component ' + err);
    return EMPTY;
  })
);
adminsubject: BehaviorSubject<[SELECTITEM]>;


  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public followUpData: FollowUpDataService,
    public miscData: MiscDataService,
    private _fb: FormBuilder,
    private session: SessionService,
    private xlator: TranslationService
  ) {

    this.requestStatuses = constants.followUpStatuses;

    this.myForm = _fb.group({
      requestStatusId: [''],
      assignedToId: [''],
      subject_English: [''],
      subject_Spanish: [''],
      updateHistory_English: [''],
      updateHistory_Spanish: ['']
    });

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
    this.isLoading = true;

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

    // set defaults where needed
    this.followUpRequest.requesterId = this.session.getUserId();
    this.followUpRequest.assignedToId =  this.myForm.controls.assignedToId.value;
    this.followUpRequest.requestStatusId = 2092; // Open is only status when creating
    this.followUpRequest.latestUpdaterId = this.session.getUserId();
    this.followUpRequest.subject_English =  this.myForm.controls.subject_English.value;
    // this.followUpRequest.subject_Spanish = this.myForm.controls.subject_Spanish.value;
    this.followUpRequest.updateHistory_English = this.myForm.controls.updateHistory_English.value;
    this.followUpRequest.updateHistory_Spanish = this.myForm.controls.updateHistory_Spanish.value;
    this.followUpRequest.lastUpdateDateTime = new Date();
    this.followUpRequest.createDateTime = new Date();

    // this.followUpRequest.studentGUId =  this.myForm.controls.studentGUId;// set by store message
  }

  onSubmit() {
    console.log('Hi from FollowUpRequests Submit');

    if (this.myForm.invalid) {
      this.errorMessage = '';
      window.scrollTo(0, 0);
      return false;
    }
    this.retrieveFormValues();
    this.followUpData.postFollowUpRequest(this.followUpRequest).subscribe(
      (response) => {
        console.log('followUp add Request submit completed');
        console.log(response.followUpRequest);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      },
      () => {
        this.navigateBackInContext();
      }
    );
    return false;
  }

  onCancel() {
    this.navigateBackInContext();
  }


  navigateBackInContext() {
    const link = ['/admins/follow-up/requests'];
    console.log('after Submit or Cancel navigating to ' + link);

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
    console.log('studentGUId set to ' + studentGUId);
  }

  public onSelectedAssignedToId(memberId: number) {
    this.followUpRequest.assignedToId = memberId;
    console.log('AssignedTo MemberId set to ' + memberId);
  }
  public onSelectedRequestStatus(statusId: number) {
    this.followUpRequest.requestStatusId = statusId;
    console.log('requestStatus set to  ' + statusId);
  }


  public translateFromSpanish(spanishText: string) {
    this.xlator.translateFromSpanish(spanishText);
  }
}
