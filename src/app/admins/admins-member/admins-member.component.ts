import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from '../../app_shared/constants/constants';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { Member } from '../../app_shared/models/member';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({

  templateUrl: './admins-member.component.html',
  styleUrls: ['./admins-member.component.css'],
})
export class AdminsMemberComponent implements OnInit {
  myForm: FormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;
  languageStatuses: SELECTITEM[];
  roleStatuses: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  firstNames: string;
  lastNames: string;
  member: Member;
  //// studentId: number;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public sqlResource: SqlResource,
    public formBuilder: FormBuilder,
    public location: Location
  ) {
    console.log('hi from MyForm.component constructor');
    this.languageStatuses = constants.languageStatuses;
    this.roleStatuses = constants.roleStatuses;

    this.myForm = formBuilder.group({
      inputMemberFName: ['', Validators.compose(
        [Validators.required, Validators.maxLength(30)])],
      inputMemberLName: ['', Validators.compose(
        [Validators.required, Validators.maxLength(30)])],
      inputMemberEmail: ['', Validators.compose(
        [Validators.required, Validators.maxLength(50)])],
      inputMemberSMAPhone: [''],
      inputMemberNonSMAPhone: [''],
      inputInitialInterview: ['', Validators.maxLength(2000)],
      inputComments: ['', Validators.maxLength(2000)],
      EnglishLevelSelector: [''],
      SpanishLevelSelector: [''],
      SponsorStatusSelector: [''],
      MentorStatusSelector: ['']
    });
    this.member = new Member();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('admins Member ngOnInit');
    const id = this.currRoute.snapshot.params['id'];
    console.log('sqlResource with MemberId: ' + id);
    this.isLoading = true;
    this.sqlResource.getMember(id)
      .subscribe(
        data => {
          this.member = data;
        },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('getMember is done');
          this.isLoading = false;
          window.scrollTo(0, 0);
        }
      );

    this.myForm.valueChanges.subscribe(
      (form: any) => {
        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
      }
    );
  }

  saveMyForm(): boolean {
    console.log('saving admin member ');
    this.isLoading = true;
    this.sqlResource.updateMember(this.member)
      .subscribe(
        (student) => {
          console.log('subscribe result in updateMember');
          // need timeout to avoid "Expression has changed error"
          window.setTimeout(() => {
            this.successMessage = 'Changes were saved successfully.';
          }, 0);
          // this.successMessage = 'Changes were saved successfully.';
          this.submitted = true;
          this.isLoading = false;
          window.scrollTo(0, 0);
          window.setTimeout(() => {// console.log('clearing success message');
            this.successMessage = '';
          }, 3000);
        },
        (error) => {
          console.log(this.errorMessage = <any>error);
          this.isLoading = false;
        }
      );
    // prevent default action of reload
    return false;
  }

  backToMembersList() {
    this.router.navigate(['/admins/students']);
  }

  mentorReportsReview() {
    const id = this.currRoute.snapshot.params['id'];
    this.router.navigate(['/admins/students/mentorReports/' + id + '/']); // this.studentId ]);
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }

}
