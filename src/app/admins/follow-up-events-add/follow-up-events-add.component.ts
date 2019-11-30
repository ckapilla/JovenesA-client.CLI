import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { constants } from 'src/app/_shared/constants/constants';
import { FollowUpEvent } from 'src/app/_shared/models/follow-up-event';
import { FollowUpDataService } from 'src/app/_shared/services/follow-up-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { SessionService } from '../../_shared/services/session.service';


@Component({
  templateUrl: './follow-up-events-add.component.html',
  styleUrls: ['./follow-up-events-add.component.css']
})
export class FollowUpEventsAddComponent implements OnInit {

  myForm: FormGroup;
  followUpEvent: FollowUpEvent;
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
    public followUpData: FollowUpDataService,
    private _fb: FormBuilder,
    private session: SessionService
  ) {

    this.followUpEvent = new FollowUpEvent();
    // SQL Server will adjust the time to UTC by adding TimezoneOffset
    // we want to store local time so we adjust for that.
    const now = new Date();
    this.followUpEvent.eventDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    this.followUpStatuses = constants.followUpStatuses;
    this.followUpEvent.followUpRequestId = this.currRoute.snapshot.params['requestId'];
    this.followUpEvent.enteredById = this.session.userId;
    this.followUpEvent.assignedToId = 2433; // everything starts with Antonio
    this.followUpEvent.assignedToRoleId = 2068; // everything starts with Admin
    this.followUpEvent.comments_English = '';
    this.followUpEvent.comments_Spanish = '';


    this.isLoading = true;

  }

  ngOnInit() {

    this.myForm = this._fb.group({
      statusSelector: [this.followUpStatusSelector],
      assignedToSelector: [this.followUpEvent.assignedToRoleId],
      assignedToRoleSelector: [this.followUpEvent.assignedToId],
      comments_English: [this.followUpEvent.comments_English],
      comments_Spanish: [this.followUpEvent.comments_Spanish],
    });

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
    console.log('entetered by' + this.followUpEvent.enteredById);

    console.log('Hi followUpEvents constructor with event object ');
    console.log(this.followUpEvent);
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
    console.log('Hi followUpEvents Submit with event object ');
    console.log(this.followUpEvent);
    if (this.myForm.invalid) {
      this.errorMessage = '';
      window.scrollTo(0, 0);
      return false;
    }
    this.followUpData.postFollowUpEvent(this.followUpEvent)
      .subscribe(
        (response) => {
          console.log('followUp Event completed -- sending Initial Event with response');
          console.log(response);
        },
        (error) => {
          this.errorMessage = error.message;
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

  onCancel() {
    this.navigateBackInContext();
  }

  navigateBackInContext() {
    const target = '/admins/follow-up-requests';
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
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }

  public onSelectedRoleId(roleId: number) {
    this.followUpEvent.assignedToRoleId = roleId;
    console.log('container form has assignedToRoleId ' + roleId);
  }

  public onSelectedMemberId(memberId: number) {
    this.followUpEvent.assignedToId = memberId;
    console.log('container form has AssignedToId ' + memberId);
  }


}
