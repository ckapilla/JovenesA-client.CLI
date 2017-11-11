import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

import { SqlResource } from '../../app_shared/services/sql-resource';
import { SponsorLetter } from '../../app_shared/models/sponsor-letter';

import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';

@Component({
  moduleId: module.id,
  templateUrl: './sponsor-letters-add.component.html',
  styleUrls: ['./sponsor-letters-add.component.css'],
})

export class SponsorLettersAddComponent
        implements OnInit {
    addNewForm: FormGroup;
    sponsorLetter: SponsorLetter;
    isLoading: boolean;
    submitted: boolean;

    letterYear: AbstractControl;
    letterMonth: AbstractControl;
    letterText: AbstractControl;
    periodYears: SELECTITEM[];
    periodMonths: SELECTITEM[];
    errorMessage: string;
    successMessage: string;


    constructor(
              public currRoute: ActivatedRoute,
              private router: Router,
              public sqlResource: SqlResource,
              private _fb: FormBuilder
    ) {

        console.log('Hi from SponsorLettersAddComponent');
     this.periodYears = [
      // {value: '2016', label: '2016'},
      {value: '2017', label: '2017'} // ,
      //    {value: '2018', label: '2018'}, {value: '2019', label: '2015'},
      //    {value: '2020', label: '2020'}
    ];

     this.periodMonths = [
      // {value: '0', label: 'Seleccionar Mes'},
      {value: '1', label: 'Ene'},
      {value: '2', label: 'Feb'},
      {value: '3', label: 'Mar'},
      {value: '4', label: 'Abr'},
      {value: '5', label: 'Mayo'},
      {value: '6', label: 'Jun'},
      {value: '7', label: 'Jul'},
      {value: '8', label: 'Ago'},
      {value: '9', label: 'Sept'},
      {value: '10', label: 'Oct'},
      {value: '11', label: 'Nov'},
      {value: '12', label: 'Dic'}
          ];

        this.addNewForm = _fb.group({
            letterYearSelector: ['', Validators.required],
            letterMonthSelector: ['', this.validateMonth],

            inputLetterText: ['', Validators.compose(
                                [Validators.required, Validators.maxLength(2000)])]
        });

        this.letterYear = this.addNewForm.controls['letterYearSelector'];
        this.letterMonth = this.addNewForm.controls['letterMonthSelector'];
        this.letterText = this.addNewForm.controls['inputFollowUp'];


        this.sponsorLetter = new SponsorLetter();
        this.sponsorLetter.sponsorGroupId = 0;
        this.sponsorLetter.studentId = 0;
        // SQL Server will adjust the time to UTC by adding TimezoneOffset
        // we want to store local time so we adjust for that.
        const now = new Date();
        this.sponsorLetter.letterDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
        console.log(this.sponsorLetter.letterDateTime);

        this.sponsorLetter.letterYear = null; // moment(new Date).format('YYYY-MM-DD');
        this.sponsorLetter.letterMonth = null;
        this.sponsorLetter.letterText = '';

        this.errorMessage = '';
        this.successMessage = '';
        this.submitted = false;
    };

    ngOnInit() {
        console.log('sponsorLettersAdd ngOnInit');
        this.sponsorLetter.sponsorGroupId = this.currRoute.snapshot.params['sponsorId'];
        this.sponsorLetter.studentId = this.currRoute.snapshot.params['studentId'];
        console.log('sponsorGroupId ' + this.sponsorLetter.sponsorGroupId);
        console.log('studentId ' + this.sponsorLetter.studentId);
        this.sponsorLetter.letterYear = 2017;
        this.sponsorLetter.letterMonth = 1;

      this.addNewForm.valueChanges.subscribe(
          (form: any) => {
                            this.errorMessage = '';
                            this.successMessage = '';
                            this.submitted = false;
                            console.log('form change event');
          }
      );
    }

    onSubmit()  {
        console.log('Hi from sponsor letter Submit');
        // console.log(this.sponsorLetter);

        if (this.addNewForm.invalid) {
          let i = 0;
          this.errorMessage = '';

          if (!this.letterYear.valid || !this.letterMonth.valid) {
           this.errorMessage = this.errorMessage + 'Year and month must be selected from drop-downs. ';
           ++i;
          }

          if (!this.letterText.valid) {
            this.errorMessage = this.errorMessage + 'Letter text box must be filled in . ';
            ++i;
          }

          return false;
        }


        this.sqlResource.postSponsorLetter(this.sponsorLetter,
                                        this.sponsorLetter.studentId,
                                        this.sponsorLetter.sponsorGroupId)
            .subscribe(
                (student) => {
                    console.log(this.successMessage = <any>student);
                    this.submitted = true;
                    this.isLoading = false;
                    const target = '/students/sponsor-letters/' + this.sponsorLetter.studentId;
                    console.log('after call to postSponsorLetter; navigating to ' + target);
                    this.router.navigateByUrl(target);
                },
                (error) =>  {
                    console.log(this.errorMessage = <any>error);
                    this.isLoading = false;
                }
            );
        return false;
    }

    onCancel() {
        const target = '/students/sponsor-letters/' + this.sponsorLetter.studentId; // + '/' + this.studentId;
        console.log('navigating to ' + target);
        this.router.navigateByUrl(target);
    }

    validateMonth(control: FormControl): { [error: string]: any } {
        console.log('month validator ' + control.value);
        const rtnVal: any = ('' + control.value === '0') ? { // can be either string or number
                    validateMonth: {
                        valid: false
                    }
                } : null;
         console.log(rtnVal);
         return rtnVal;
    }

    public hasChanges() {
        // if have changes then ask for confirmation
        // ask if form is dirty and has not just been submitted
        console.log('hasChanges has submitted ' + this.submitted);
        console.log('hasChanges has form dirty ' + this.addNewForm.dirty);
        console.log('hasChanges net is ' + this.addNewForm.dirty  || this.submitted);
        return this.addNewForm.dirty && !this.submitted;
    }

}
