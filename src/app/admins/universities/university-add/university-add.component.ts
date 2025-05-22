import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from '../../../_shared/constants/constants';
import { UniversityDataService } from '../../../_shared/data/university-data.service';
import { SELECTITEM } from '../../../_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../../_shared/interfaces/SORTCRITERIA';
import { University } from '../../../_shared/models/university';

@Component({
  selector: 'app-university',
  templateUrl: './university-add.component.html'
})
export class UniversityAddComponent implements OnInit {
  myForm: UntypedFormGroup;
  university: University;
  isLoading: boolean;
  submitted: boolean;
  bReadOnly = true;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;
  universityId: number;
  newMemberMessage: string;
  academicYearTypes: SELECTITEM[];
  gradeMonthsValues: SELECTITEM[];

  public bInvalidSubmitState = false;

  constructor(
    public currRoute: ActivatedRoute,
    public universityData: UniversityDataService,
    public router: Router,
    public _fb: UntypedFormBuilder,
    public location: Location
  ) {
    this.isLoading = false;
    this.academicYearTypes = constants.academicYearTypes;
     this.gradeMonthsValues = constants.gradeMonths;

    this.myForm = _fb.group({
      // universityId: [ { value: '', hidden: true } ],
      universityAbbrev: [ '', Validators.compose([ Validators.required, Validators.maxLength(10) ]) ],
      universityName: [ '', Validators.compose([ Validators.required, Validators.maxLength(50) ]) ],
      universityCity: [ '', Validators.compose([ Validators.required, Validators.maxLength(50) ]) ],
      academicYearTypeId: [ '', Validators.compose([ Validators.required ]) ]
    });
    // this.myForm.disable();
        this.university = new (University);

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    this.setFormValues(this.university);
    this.isLoading = false;
  }
    setFormValues(university: University) {
    console.log('setFormValues ' + university.universityName);
    this.myForm.patchValue({
      // universityId: 0,
      universityName: university.universityName,
      universityAbbrev: university.universityAbbrev,
      universityCity: university.universityCity,
      academicYearTypeId: university.academicYearTypeId // ,
      // gradeMonthsId: university.gradeMonthsId

    });
  }

  // fetchData() {
  //   this.isLoading = true;
  //   this.universityData.getUniversity(this.universityId).subscribe(
  //     (data) => {
  //       this.university = data;
  //       if(this.university.academicYearTypeId = 2031)
  //         this.university.gradeMonthsId = 1001;
  //       else if(this.university.academicYearTypeId = 2032)
  //         this.university.gradeMonthsId = 1002;
  //       else
  //         this.university.gradeMonthsId = 0;
  //     },
  //     (err) => (this.errorMessage = err),
  //     () => {
  //       console.log('done ' + this.university.universityId);
  //       this.isLoading = false;
  //       this.setFormValues(this.university);
  //     }
  //   );
  // }


  retrieveFormValues(): void {
    console.log('retrieveFormValues ' + JSON.stringify(this.myForm.value));

    // use spread operator to merge changes:
    this.university = {
      ...this.university,
      ...this.myForm.value };
  }

  saveMyForm() {
    console.log('saving university');
     if (!this.myForm.valid) {
      this.bInvalidSubmitState = true;
      return false;
     }
    console.log('saving university ');
    this.isLoading = true;
    this.retrieveFormValues();
    this.universityData.addNewUniversity(this.university).subscribe(
      () => {
        // console.log('subscribe result in updateStudent');
        // need timeout to avoid "Expression has changed error"
        window.setTimeout(() => {
          this.successMessage = 'Changes saved successfully';
        }, 0);
        // this.successMessage = 'Changes were saved successfully.';
        this.submitted = true;
        this.isLoading = false;
        window.setTimeout(() => {
          this.location.back();
          // console.log('clearing success message');
          this.successMessage = '';
        }, 1500);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    // prevent default action of reload
    return false;
  }

onCancel() {
    this.location.back();
  }

}
