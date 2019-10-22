import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../models/member';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
  selector: 'app-person-shared',
  templateUrl: './person-shared.component.html',
  styleUrls: ['./person-shared.component.css']
})
export class PersonSharedComponent implements OnInit {
  myForm: FormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;
  bReadOnly = true;
  errorMessage: string;
  successMessage: string;

  @Input() memberGUId: string;
  member: Member;

  constructor(
    public sqlResource: SqlResource,
    public formBuilder: FormBuilder
  ) {
    this.myForm = formBuilder.group({
      firstNames: ['', Validators.compose(
        [Validators.required, Validators.maxLength(30)])],
      lastNames: ['', Validators.compose(
        [Validators.required, Validators.maxLength(30)])],
      email: ['', Validators.compose(
        [Validators.required, Validators.maxLength(50)])],
      // smaPhone: [''],
      // nonSMAPhone: [''],

    });
    this.myForm.disable();

    this.member = new Member();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    console.log('fetchData for person-shared%%%%%%%%%%%%% ' + this.memberGUId);
    this.sqlResource.getMemberByGUId(this.memberGUId)
      .subscribe(
        data => {
          this.member = data;
        },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('getMember is done');
          this.setFormValues(this.member);
          this.isLoading = false;
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
  setFormValues(member: Member) {
    console.log('setFormValues');
    this.myForm.setValue({
      firstNames: member.firstNames,
      lastNames: member.lastNames,
      email: member.email
      // cellPhone: member.cellPhone,
      // homePhone: member.homePhone,
      // nickName: member.nickName,
      // photoUrl: member.photoUrl,

    });
  }



}
