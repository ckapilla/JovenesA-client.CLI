import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';

import { SqlResource } from '../../app_shared/services/sql-resource';

import { Admin } from '../shared/admin';

@Component({
  moduleId: module.id,
  selector: 'app-admin-profile',
  templateUrl: './admins-profile.component.html',
  styleUrls:  ['../../../assets/css/forms.css'],
})
export class AdminsProfileComponent implements OnInit {
  profileForm: FormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;

  statuses: [{statusId: string, label: string}];
  errorMessage: string;
  successMessage: string;
  firstNames: string;
  lastNames: string;
  admin: Admin;
  //
  // private curSegment: RouteSegment;
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
      inputAdminFName: ['', Validators.required],
      inputAdminLName: ['', Validators.required],
      inputAdminPhone: ['', Validators.required],
      inputMonthsinSma: ['', Validators.required],
      SpanishLevelSelector: ['', Validators.required],
      EnglishLevelSelector: ['', Validators.required],
    });
    this.admin = new Admin();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('ngOnInit');

    const id = this.currRoute.snapshot.params['id'];
    console.log('sqlResource with adminId: ' + id);
    this.isLoading = true;
    this.sqlResource.getAdmin(id)
      .subscribe(
        data => {this.admin = data; },
        err => console.error('Subscribe error: ' + err),
        () => {console.log('done');
              console.log(this.admin.lastNames);
              console.log(this.admin.sma_Phone);
              this.isLoading = false;
            }
      );

      this.profileForm.valueChanges.subscribe(
          (form: any) => {
                            this.errorMessage = '';
                            this.successMessage = '';
                            this.submitted = false;
          }
      );
  }

  saveProfile(): boolean {
    console.log('saving ');
        this.sqlResource.updateAdmin(this.admin)
        .subscribe(
            (student) => {
                // console.log('subscribe result from postAdmin');
                this.successMessage = 'Changes were saved successfully.';
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

    public hasChanges() {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.profileForm.dirty);
        console.log('hasChanges net is ' + this.profileForm.dirty  || this.submitted);
        return this.profileForm.dirty && !this.submitted;
    }

}
