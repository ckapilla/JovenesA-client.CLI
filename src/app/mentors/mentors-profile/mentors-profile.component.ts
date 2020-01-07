import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {NgSwitch, NgSwitchCase } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';
import { Member } from '../../_shared/models/member';
import { MemberDataService } from '../../_shared/services/member-data.service';


@Component({

  templateUrl: './mentors-profile.component.html'
})
export class MentorsProfileComponent implements OnInit {
  myForm: FormGroup;
  data: Object;
  isLoading: boolean;
  submitted: boolean;

  languageStatuses: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  firstNames: string;
  lastNames: string;
  mentor: Member;
  //
  // private curSegment: RouteSegment;
  //

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public memberData: MemberDataService,
    public formBuilder: FormBuilder
  ) {
    console.log('hi from profile.component constructor');
    this.languageStatuses = constants.languageStatuses;

    this.myForm = formBuilder.group({
      firstNames: ['', Validators.required],
      lastNames: ['', Validators.required],
      smA_Phone: ['', Validators.required],
      monthsinSma: ['', Validators.required],
      spanishSkillLevelId: ['', Validators.required],
      englishSkillLevelId: ['', Validators.required],
    });
    this.mentor = new Member();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.fetchData();
    this.myForm.valueChanges.subscribe(
      (form: any) => {
        // this.errorMessage = '';
        // this.successMessage = '';
        this.submitted = false;
      }
    );
  }

  fetchData() {
    const id = this.currRoute.snapshot.params['id'];
    console.log('calling data service with mentorId: ' + id);
    this.isLoading = true;
    this.memberData.getMember(id)
      .subscribe(
        data => { this.mentor = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('done loading');
          this.setFormValues(this.mentor);
          this.isLoading = false;
        }
      );
  }

  setFormValues(mentor: Member) {
    this.myForm.patchValue({
      firstNames: mentor.firstNames,
      lastNames: mentor.lastNames,
      smA_Phone: mentor.smA_Phone,
      monthsinSma: mentor.monthsinSma,
      spanishSkillLevelId: mentor.spanishSkillLevelId,
      englishSkillLevelId: mentor.englishSkillLevelId
    });
  }

  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));
    this.mentor.firstNames = this.myForm.controls.firstNames.value;
    this.mentor.lastNames = this.myForm.controls.lastNames.value;
    this.mentor.smA_Phone = this.myForm.controls.smA_Phone.value;
    this.mentor.spanishSkillLevelId = this.myForm.controls.spanishSkillLevelId.value;
    this.mentor.englishSkillLevelId = this.myForm.controls.englishSkillLevelId.value;
  }

  saveMyForm(): boolean {
    console.log('saving ');
    this.isLoading = true;
    this.retrieveFormValues();
    this.memberData.updateMember(this.mentor)
      .subscribe(
        (student) => {
          this.successMessage = 'Changes were saved successfully.';
          this.submitted = true;
          this.isLoading = false;

          window.scrollTo(0, 0);
          window.setTimeout(() => { this.successMessage = ''; }, 3000);
        },
        (error) => {
          this.errorMessage = <any>error;
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
