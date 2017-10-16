import { Component, OnInit } from '@angular/core';
// import {NgSwitch, NgSwitchCase } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SqlResource } from '../../app_shared/services/sql-resource';

import { Mentor } from '../../app_shared/models/mentor';
//import {DisplayErrorsComponent } from '../../app_shared/components/app-display-errors.component';

@Component({
  moduleId: module.id,
  templateUrl: './mentors-profile.component.html'
})
export class MentorsProfileComponent implements OnInit {
  profileForm: FormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;

  statuses: [{statusId: string, label: string}];
  errorMessage: string;
  successMessage: string;
  firstNames: string;
  lastNames: string;
  mentor: Mentor;
  //
  //private curSegment: RouteSegment;
  //

  constructor(
              public currRoute: ActivatedRoute,
              private router: Router,
              public sqlResource: SqlResource,
              public formBuilder: FormBuilder
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
      inputMentorFName: ['', Validators.required],
      inputMentorLName: ['', Validators.required],
      inputMentorPhone: ['', Validators.required],
      inputMonthsinSma: ['', Validators.required],
      SpanishLevelSelector: ['', Validators.required],
      EnglishLevelSelector: ['', Validators.required],
    });
    this.mentor = new Mentor();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('ngOnInit');
    // this.currRoute.params
    //   .map(params => params['id'])
    //   .subscribe((id) => {
    const id = this.currRoute.snapshot.params['id'];
    console.log('calling sqlResource with mentorId: ' + id);
    this.isLoading = true;
    this.sqlResource.getMentor(id)
      .subscribe(
        data => {this.mentor = data; },
        err => console.error('Subscribe error: ' + err),
        () => {console.log('done loading');
              this.isLoading = false;
              }
      );

      this.profileForm.valueChanges.subscribe(
          (form: any) => {
                            // this.errorMessage = '';
                            // this.successMessage = '';
                            this.submitted = false;
          }
      );
  }

  saveProfile(): boolean {
    console.log('saving ');
        this.sqlResource.updateMentor(this.mentor)
        .subscribe(
            (student) => {
                this.successMessage = 'Changes were saved successfully.';
                this.submitted = true;
                this.isLoading = false;

                window.scrollTo(0, 0);
                window.setTimeout( () => {this.successMessage = ''; }, 3000);
             },
            (error) =>  {
                console.log(this.errorMessage = <any>error);
                this.isLoading = false;
            }
        );
      // prevent default action of reload
      return false;
  }

    public hasChanges() {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.profileForm.dirty);
        console.log('hasChanges net is ' + this.profileForm.dirty  || this.submitted);
        return this.profileForm.dirty && !this.submitted;
    }

}
