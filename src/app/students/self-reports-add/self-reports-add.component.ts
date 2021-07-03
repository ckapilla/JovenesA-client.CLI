import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { StudentSelfReport } from 'src/app/_shared/models/student-self-report';
import { SetSelectedYearPeriod } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';

@Component({
  templateUrl: './self-reports-add.component.html',
  styleUrls: ['./self-reports-add.component.css', '../../../assets/css/forms.css']
})
export class SelfReportsAddComponent implements OnInit {
  myForm: FormGroup;
  selfReport: StudentSelfReport;
  isLoading: boolean;
  submitted: boolean;

  periodYears: SELECTITEM[];
  periodMonths: SELECTITEM[];
  errorMessage: string;
  successMessage: string;
  readonly activeQRPeriods: SELECTITEM[] = constants.activeQRperiods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  selectedYearPeriod = '';
  subscription: Subscription;

  @Select(UIState.getSelectedYearPeriod) selectedYearPeriod$: Observable<string>;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public ssrData: StudentSelfReportDataService,
    private _fb: FormBuilder,
    private store: Store
  ) {
    console.log('Hi from SelfReportsAddComponent');

    this.myForm = _fb.group({
      reportYear: ['2021'],
      reportPeriod: ['2'],

      narrative_English: ['', Validators.compose([Validators.required, Validators.maxLength(4500)])]
    });

    this.myForm.controls.reportYear.disable();
    this.myForm.controls.reportPeriod.disable();

    this.selfReport = new StudentSelfReport();
    this.selfReport.sponsorGroupId = 0;
    this.selfReport.reviewedStatusId = 2087;
    // SQL Server will adjust the time to UTC by adding TimezoneOffset
    // we want to store local time so we adjust for that.
    const now = new Date();
    this.selfReport.reportDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    console.log(this.selfReport.reportDateTime);

    this.selfReport.reportYear = 2021;
    this.selfReport.reportPeriod = 2;
    this.selfReport.narrative_English = '';

    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
  }

  ngOnInit() {
    console.log('selfReportsAdd ngOnInit');

    this.subscribeForSelectedYearPeriod();

    this.selfReport.sponsorGroupId = this.currRoute.snapshot.params['sponsorId'];
    this.selfReport.studentGUId = this.currRoute.snapshot.params['studentGUId'];

    console.log('sponsorGroupId ' + this.selfReport.sponsorGroupId);
    console.log('studentGUId ' + this.selfReport.studentGUId);

    this.myForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
      this.submitted = false;
      // console.log('form change event');
    });
  }


  subscribeForSelectedYearPeriod() {
    this.subscription = this.selectedYearPeriod$.subscribe((message) => {
      this.selectedYearPeriod = message;
      console.log('************NGXS: SSR Tracking new selectedYearPeriod received' + this.selectedYearPeriod);
      // this.fetchFilteredData();
    });
  }

  onSubmit() {
    console.log('Hi from self report Submit');

    if (this.submitted) {
      return false; // prevent dups
    }

    if (this.myForm.invalid) {
      // let i = 0;
      this.errorMessage = '';

      return false;
    }
    this.submitted = true; // need to set guard immediately to prevent dups

    this.ssrData.postStudentSelfReport(this.selfReport).subscribe(
      (student) => {
        console.log((this.successMessage = <any>student));
        // this.submitted = true;
        this.isLoading = false;
        const target = '/students';
        console.log('after call to postStudentSelfReports; navigating to ' + target);
        this.router.navigateByUrl(target);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    return false;
  }

  onCancel() {
    const target = '/students';
    console.log('navigating to ' + target);
    this.router.navigateByUrl(target);
  }

  public hasChanges() {
    // if have changes then ask for confirmation
    // ask if form is dirty and has not just been submitted
    console.log('hasChanges has submitted ' + this.submitted);
    console.log('hasChanges has form dirty ' + this.myForm.dirty);
    console.log('hasChanges net is ' + this.myForm.dirty || this.submitted);
    return this.myForm.dirty && !this.submitted;
  }
  setSelectedYearPeriod(yearPeriod: string) {
    this.store.dispatch(new SetSelectedYearPeriod(yearPeriod));
    // this.fetchFilteredData();
  }

}
