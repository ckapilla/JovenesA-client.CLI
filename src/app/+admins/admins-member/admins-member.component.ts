import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SqlResource } from '../../app_shared/services/sql-resource';
import { Member } from '../../app_shared/models/member';

@Component({
  moduleId: module.id,
  selector: 'student-profile',
  templateUrl: './admins-member.component.html',
  styleUrls:  ['./admins-member.component.css'],
})
export class AdminsMemberComponent implements OnInit {
  profileForm: FormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;

  statuses: [{statusId: string, label: string}];
  errorMessage: string;
  successMessage: string;
  firstNames: string;
  lastNames: string;
  member: Member;
  ////studentId: number;

  constructor(
              public currRoute: ActivatedRoute,
              private router: Router,
              public sqlResource: SqlResource,
              public formBuilder: FormBuilder,
              public location: Location
              ) {
    console.log('hi from profile.component constructor');
    this.statuses = [
      { statusId: '1024', label: 'None' },
      { statusId: '1025', label: 'Basic' },
      { statusId: '1026', label: 'Intermediate' },
      { statusId: '1027', label: 'Advanced' },
      { statusId: '1028', label: 'Native' },
    ];

    this.profileForm = formBuilder.group({
      inputMemberFName: ['', Validators.compose(
                  [Validators.required, Validators.maxLength(30)])],
      inputMemberLName: ['', Validators.compose(
                  [Validators.required, Validators.maxLength(30)])],
      inputMemberSMAPhone: [''],
      inputMemberNonSMAPhone: [''],
      inputInitialInterview: ['', Validators.maxLength(2000)],
      inputMemberStory: ['', Validators.maxLength(2000)],
      EnglishLevelSelector: [''],
      SpanishLevelSelector: [''],
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
        data => {this.member = data; },
        err => console.error('Subscribe error: ' + err),
        () => { console.log('getMember is done');
                this.isLoading = false; }
      );

      this.profileForm.valueChanges.subscribe(
          (form: any) => {  this.errorMessage = '';
                            this.successMessage = '';
                            this.submitted = false;
          }
      );
  }

  saveProfile(): boolean {
    console.log('saving admin member ');
    this.isLoading = true;
    this.sqlResource.updateMember(this.member)
        .subscribe(
            (student) => {
                console.log('subscribe result in updateMember');
                // need timeout to avoid "Expression has changed error"
                window.setTimeout( () => {
                this.successMessage = 'Changes were saved successfully.'; }, 0);
                // this.successMessage = 'Changes were saved successfully.';
                this.submitted = true;
                this.isLoading = false;
                window.scrollTo(0, 0);
                window.setTimeout( () => {// console.log('clearing success message');
                              this.successMessage = ''; }, 3000);
             },
            (error) =>  {
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
    this.router.navigate(['/admins/students/mentorReports/' + id  + '/']); //this.studentId ]);
  };

  public hasChanges() {
      // if have changes then ask for confirmation
      // ask if form is dirty and has not just been submitted
      console.log('hasChanges has submitted ' + this.submitted);
      console.log('hasChanges has form dirty ' + this.profileForm.dirty);
      console.log('hasChanges net is ' + this.profileForm.dirty  || this.submitted);
      return this.profileForm.dirty && !this.submitted;
  }

}
