import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/_shared/services/session.service';
import { constants } from '../../_shared/constants/constants';
import { MemberDataService } from '../../_shared/data/member-data.service';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { Member } from '../../_shared/models/member';

@Component({
  templateUrl: './students-profile.component.html'
})
export class StudentProfileComponent implements OnInit {
  myForm: FormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;

  languageStatuses: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  firstNames: string;
  lastNames: string;
  email: string;
  student: Member;

  constructor(
    public currRoute: ActivatedRoute,
    private session: SessionService,
    public memberData: MemberDataService,
    public formBuilder: FormBuilder
  ) {
    console.log('hi from profile.component constructor');
    this.languageStatuses = constants.languageStatuses;

    this.myForm = formBuilder.group({
      firstNames: ['', Validators.required],
      lastNames: ['', Validators.required],
      email: ['', Validators.required],
      sma_Phone: ['', Validators.required]
      // englishSkillLevelId: ['', Validators.required]
    });
    this.student = new Member();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.fetchData();
    this.myForm.valueChanges.subscribe(() => {
      // this.errorMessage = '';
      // this.successMessage = '';
      this.submitted = false;
    });
  }

  fetchData() {
    // const id = this.currRoute.snapshot.params['id'];
    const guid = this.session.getUserGUId();
    console.log('calling data service with studentGUId: ' + guid);
    this.isLoading = true;
    this.memberData.getMemberByGUId(guid).subscribe(
      (data) => {
        this.student = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('done loading');
        this.setFormValues(this.student);
        this.isLoading = false;
      }
    );
  }

  setFormValues(student: Member) {
    this.myForm.setValue({
      firstNames: student.firstNames,
      lastNames: student.lastNames,
      email: student.email,
      sma_Phone: student.sma_Phone // ,
      // englishSkillLevelId: student.englishSkillLevelId
    });
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));
    // use spread operator to merge changes:
    this.student = { ...this.student, ...this.myForm.value };
  }

  saveMyForm(): boolean {
    console.log('saving ');
    this.isLoading = true;
    this.retrieveFormValues();
    this.memberData.updateMember(this.student).subscribe(
      () => {
        this.successMessage = 'Changes were saved successfully.';
        this.submitted = true;
        this.isLoading = false;

        window.scrollTo(0, 0);
        window.setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      (error) => {
        this.errorMessage = error;
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
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }
}
