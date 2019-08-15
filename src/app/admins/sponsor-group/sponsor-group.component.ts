import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorGroup } from 'src/app/app_shared/models/sponsor-group';
import { SORTCRITERIA } from '../../app_shared/interfaces/SORTCRITERIA';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({
  selector: 'app-sponsor-group',
  templateUrl: './sponsor-group.component.html'
})
export class SponsorGroupComponent implements OnInit {
  myForm: FormGroup;
  sponsorGroup: SponsorGroup;
  isLoading: boolean;
  submitted: boolean;
  bReadOnly = true;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;
  sponsorGroupId: number;

  constructor(
    public currRoute: ActivatedRoute,
    public sqlResource: SqlResource,
    public router: Router,
    public formBuilder: FormBuilder
  ) {
    this.isLoading = false;

    this.myForm = formBuilder.group({
      sponsorGroupId: 'xxx',
      sponsorGroupName: ['yyy',
        Validators.compose([Validators.required, Validators.maxLength(50)])],
    });
    // this.myForm.disable();
  }

  ngOnInit() {
    this.sponsorGroup = new SponsorGroup();
    this.sponsorGroupId = this.currRoute.snapshot.params['id'];
    this.sponsorGroup.sponsorGroupId = this.sponsorGroupId;
    this.sponsorGroup.sponsorGroupName = ' this is a test';
    this.setFormValues(this.sponsorGroup);
    console.log('sqlResource with sponsorGroupId: ' + this.sponsorGroupId);
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    console.log('in fetchFilteredData');
    this.sqlResource.getSponsorGroup(this.sponsorGroupId)
      .subscribe(
        data => { this.sponsorGroup = data; },
        err => this.errorMessage = err,
        () => {
          console.log('done ' + this.sponsorGroup.sponsorGroupId + ':' + this.sponsorGroup.sponsorGroupName);
          this.isLoading = false;
          this.setFormValues(this.sponsorGroup);
        }
      );
  }

  setFormValues(sponsorGroup: SponsorGroup) {
    console.log('setFormValues ' + sponsorGroup.sponsorGroupName);
    this.myForm.setValue({
      sponsorGroupId: sponsorGroup.sponsorGroupId,
      sponsorGroupName: sponsorGroup.sponsorGroupName
    });
  }

  retrieveFormValues(): void {
    this.sponsorGroup = this.myForm.value;
  }


  saveSponsorGroup(): boolean {
    console.log('saving admin student ');
    this.isLoading = true;
    this.retrieveFormValues();
    this.sqlResource.updateSponsorGroup(this.sponsorGroup)
      .subscribe(
        (sponsorGroup) => {
          // console.log('subscribe result in updateStudent');
          // need timeout to avoid "Expression has changed error"
          window.setTimeout(() => {
            this.successMessage = 'Changes were saved successfully.';
          }, 0);
          // this.successMessage = 'Changes were saved successfully.';
          this.submitted = true;
          this.isLoading = false;
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


}
