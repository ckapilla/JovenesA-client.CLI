import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FollowUpDataService } from 'src/app/_shared/data/follow-up-data.service';
import { FollowUpEvent } from 'src/app/_shared/models/follow-up-event';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { FollowUpRequest } from '../../_shared/models/follow-up-request';
import { SessionService } from '../../_shared/services/session.service';
import { TranslationService } from '../../_shared/services/translation.service';

@Component({
  selector: 'app-follow-up-requests-add',
  templateUrl: './follow-up-requests-add.component.html',
  styleUrls: [ './follow-up-requests-add.component.css' ]
})
export class FollowUpRequestsAddComponent implements OnInit {
  myForm: FormGroup;
  followUpRequest: FollowUpRequest;
  isLoading: boolean;
  submitted: boolean;

  // followUpStatusSelector: AbstractControl;

  errorMessage: string;
  successMessage: string;
  requestStatuses: SELECTITEM[];
  requestorRoles: SELECTITEM[];

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
    this.requestStatuses = [
      { value: '0', label: '[None]' },
      { value: '2091', label: 'Requested' },
      { value: '2092', label: 'Assigned' },
      { value: '2104', label: 'Closed' }
    ];

    this.requestorRoles = [
      { value: '0', label: '[None]' },
      { value: '1008', label: 'Volunteer' },
      { value: '1009', label: 'Sponsor' },
      { value: '1010', label: 'Mentor' },
      { value: '1013', label: 'Donor' },
      { value: '1007', label: 'Board Member' },
      { value: '2068', label: 'Admin' }
      // { value: '2069', label: 'Student' }
    ];

    this.myForm = _fb.group({
      studentSelector: [ '' ],
      requestorRoleSelector: [ '' ],
      requestorSelector: [ '' ],
      targetDate: [ '' ],
      description_English: [ '' ],
      description_Spanish: [ '' ]
    });

    //                      [(ngModel)]="followUpRequest.description_English"

    this.followUpRequest = new FollowUpRequest();
    this.followUpRequest.studentId = 0;

    // SQL Server will adjust the time to UTC by adding TimezoneOffset
    // we want to store local time so we adjust for that.
    const now = new Date();
    this.followUpRequest.requestDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    console.log('reportDateTime = ' + this.followUpRequest.requestDateTime);

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
    this.followUpRequest = { ...this.followUpRequest, ...this.myForm.value };
  }

  onSubmit() {
    console.log('Hi from FollowUpRequests Submit');

    if (this.myForm.invalid) {
      this.errorMessage = '';
      window.scrollTo(0, 0);
      return false;
    }
    this.followUpData.postFollowUpRequest(this.followUpRequest).subscribe(
      (response) => {
        console.log('followUp Request completed -- sending Initial Event with response');
        console.log(response.followUpRequest);
        this.submitInitialEvent(response.followUpRequest);
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

  submitInitialEvent(request: FollowUpRequest) {
    console.log('in submitInitialEvent with FollowUpRequest');
    console.log(request);
    const initialEvent: FollowUpEvent = new FollowUpEvent();
    initialEvent.followUpRequestId = request.followUpRequestId;
    initialEvent.eventDateTime = request.requestDateTime;
    initialEvent.enteredById = this.session.getUserId();
    initialEvent.requestStatusId = 2092; // assigned
    initialEvent.assignedToId = 2433; // everything starts with Antonio
    initialEvent.assignedToRoleId = 2068; // everything starts with Admin
    initialEvent.comments_English = 'Initial request received';
    initialEvent.comments_Spanish = 'Solicitud inicial recibida';
    console.log('ready to submit intitial event with');
    console.log(initialEvent);

    this.followUpData.postFollowUpEvent(initialEvent).subscribe(
      (response) => {
        console.log('have response to followUpRequest post with response ');
        console.log(response);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      },
      () => {
        this.submitted = true;
        this.isLoading = false;
        const target = '/admins/follow-up-requests';
        console.log('after call to addFollowUpEvent; navigating to ' + target);
        this.router.navigateByUrl(target);
      }
    );
  }

  navigateBackInContext() {
    const target = '/admins/follow-up-requests';
    console.log('after Submit or Cancel navigating to ' + target);

    const navigationExtras: NavigationExtras = {
      // queryParams: { id: 'id' + this.followUpRequest.followUpRequestId,
      //                 summary: this.savedFollowUpStatusId
      //               }
    };

    this.router.navigate([ target ], navigationExtras);
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }

  public onSelectedStudentId(studentId: number) {
    this.followUpRequest.studentId = studentId;
    console.log('container form has studentId ' + studentId);
  }

  public onSelectedRoleId(roleId: number) {
    this.followUpRequest.requestorRoleId = roleId;
    console.log('container form has reqeustorRoleId ' + roleId);
  }

  public onSelectedMemberId(memberId: number) {
    this.followUpRequest.requestorId = memberId;
    console.log('container form has reqeustorMemberId ' + memberId);
  }

  public onTargetDateSet(target_date: Date) {
    this.followUpRequest.targetDate = target_date;
    console.log('new TargetDate ' + target_date);
  }

  public translateFromSpanish(spanishText: string) {
    this.xlator.translateFromSpanish(spanishText);
  }
}
