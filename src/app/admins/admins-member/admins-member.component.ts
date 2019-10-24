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
  bReadOnly = true;
  errorMessage: string;
  successMessage: string;

  languageStatuses: SELECTITEM[];
  roleStatuses: SELECTITEM[];


  firstNames: string;
  lastNames: string;
  member: Member;
  photoPathName: string;

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
      firstNames: ['', Validators.compose(
        [Validators.required, Validators.maxLength(30)])],
      lastNames: ['', Validators.compose(
        [Validators.required, Validators.maxLength(30)])],
      email: ['', Validators.compose(
        [Validators.required, Validators.maxLength(50)])],
      smA_Phone: [''],
      nonSMA_Phone: [''],

      mentorStatusId: [''],
      sponsorStatusId: [''],
      adminStatusId: [''],
      employeeStatusId: [''],
      donorStatusId: [''],
      volunteerStatusId: [''],
      presidentStatusId: [''],
      boardStatusId: [''],

      yearJoinedJA: [''],
      monthsinSma: [''],
      nonSma_CountryId: [''],
      bestWayToContactId: [''],
      countryOfResidenceId: [''],

      englishSkillLevelId: [''],
      spanishSkillLevelId: [''],
      preferredLanguageId: [''],

      lastLoginDateTime: [''],
      numberOfLogins: [''],

      careerBackground: [''],
      otherRelevantExperience: [''],
      comments: ['', Validators.maxLength(2000)],
      photoUrl: [{ value: '' }, Validators.maxLength(2000)],

      memberId: [''],
      memberGUId: [''],
      studentGUId: ['']

    });
    this.myForm.disable();

    this.member = new Member();

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('admins Member ngOnInit');

    this.fetchMemberData();

  }

  fetchMemberData() {
    const guid = this.currRoute.snapshot.params['guid'];
    console.log('sqlResource with MemberGUId: ' + guid);
    this.isLoading = true;
    this.sqlResource.getMemberByGUId(guid)
      .subscribe(
        data => {
          this.member = data;
          this.photoPathName = '../../../assets/images/MemberPhotos';
          this.photoPathName = this.photoPathName + '/' + 'N-a, N-a.png';
          console.log('photoPathName is ' + this.photoPathName);
        },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('getMember is done with member values ');
          console.log(JSON.stringify(this.member));
          this.setFormValues(this.member);
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 0);
          this.isLoading = false;
        });

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
      memberId: member.memberId,
      firstNames: member.firstNames,
      lastNames: member.lastNames,
      email: member.email,
      smA_Phone: member.smA_Phone,
      nonSMA_Phone: member.nonSMA_Phone,
      // gender: member.gender,


      mentorStatusId: member.mentorStatusId,
      sponsorStatusId: member.sponsorStatusId,
      adminStatusId: member.adminStatusId,
      employeeStatusId: member.employeeStatusId,
      donorStatusId: member.donorStatusId,
      volunteerStatusId: member.volunteerStatusId,
      presidentStatusId: member.presidentStatusId,
      boardStatusId: member.boardMemberStatusId,

      yearJoinedJA: member.yearJoinedJa,
      monthsinSma: member.monthsinSma,
      nonSma_CountryId: member.nonSma_CountryId,
      bestWayToContactId: member.bestWayToContactId,
      countryOfResidenceId: member.countryOfResidenceId,

      englishSkillLevelId: member.englishSkillLevelId,
      spanishSkillLevelId: member.spanishSkillLevelId,
      preferredLanguageId: member.preferredLanguageId,

      lastLoginDateTime: member.lastLoginDateTime,
      numberOfLogins: member.numberOfLogins,

      careerBackground: member.careerBackground,
      otherRelevantExperience: member.otherRelevantExperience,
      comments: member.comments,
      photoUrl: member.photoUrl,

      studentGUId: member.studentGUId,
      memberGUId: member.memberGUId
    });
  }

  retrieveFormValues(): void {
    console.log('retrieve myForm.value is ');
    console.log(JSON.stringify(this.myForm.value));
    this.member = this.myForm.value;
  }

  saveMyForm(): boolean {
    console.log('saving admin member ');
    console.log(JSON.stringify(this.member));
    this.isLoading = true;
    this.retrieveFormValues();
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
          }, 10000);
        },
        (error) => {
          window.setTimeout(() => {// console.log('clearing success message');
            this.errorMessage = <any>error.message;
            this.isLoading = false;
          }, 8000);
        }
      );
    // prevent default action of reload
    return false;
  }

  backToMembersList() {
    this.router.navigate(['/admins/students']);
  }

  setReadOnly() {
    console.log('toggle readOnly');
    if (this.myForm.enabled) {
      this.myForm.disable();
    } else {
      this.myForm.enable();
    }
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
