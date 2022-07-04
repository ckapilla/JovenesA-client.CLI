import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { StudentSelfReport } from 'src/app/_shared/models/student-self-report';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../_shared/constants/constants';
import { SELECTITEM } from '../../_shared/interfaces/SELECTITEM';

@Component({
  templateUrl: './self-reports-edit.component.html',
  styleUrls: ['./self-reports-edit.component.css', '../../../assets/css/forms.css']
})
export class SelfReportsEditComponent implements OnInit {
  isLoading: boolean;
  isSubmitted: boolean;
  errorMessage: string;
  successMessage: string;
  studentId: number;
  studentSelfReports: Array<StudentSelfReport>;
  sponsorGroupName: string;
  sponsorGroupId: number;
  selfReport: StudentSelfReport;
  selfReportId: number;
  myForm: FormGroup;
  periodYears: SELECTITEM[];
  periodMonths: SELECTITEM[];
  readonly qrPeriods: SELECTITEM[] = constants.qrPeriods;
  readonly reviewedStatuses: SELECTITEM[] = constants.reviewedQRStatuses;
  selectedQRPeriod = '';
  subscription: Subscription;

  @Select(UIState.getSelectedQRPeriod) selectedQRPeriod$: Observable<string>;


  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public ssrData: StudentSelfReportDataService,
    private _fb: FormBuilder,
    private store: Store
  ) {


    this.myForm = _fb.group({
      currentQRPeriod: this.selectedQRPeriod,
      narrative_English: ['', { validators: [Validators.required], updateOn: 'blur' }],
      narrative_Spanish: ['', { validators: [Validators.required], updateOn: 'blur' }],
      selfReportId: ''
    });

    this.myForm.controls.currentQRPeriod.disable();
  }

  ngOnInit() {
    this.selfReportId = this.currRoute.snapshot.params['selfReportId'];
    this.isLoading = true;
    this.ssrData.getStudentSelfReport(this.selfReportId).subscribe(
      (data) => {
        this.selfReport = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        this.isLoading = false;
        console.log(
          '### after retreiving, set form controls to retreived selfReport-- reportId to ' + this.selfReportId
        );
        this.myForm.controls.selfReportId.setValue(this.selfReportId);
        this.myForm.controls.narrative_English.setValue(this.selfReport.narrative_English);
        this.myForm.controls.narrative_Spanish.setValue(this.selfReport.narrative_Spanish);
      }
    );
    this.subscribeForselectedQRPeriod();
  }

  subscribeForselectedQRPeriod() {
    this.subscription = this.selectedQRPeriod$.subscribe((message) => {
      this.selectedQRPeriod = message;
      console.log('************NGXS: SSR Tracking new selectedQRPeriod received' + this.selectedQRPeriod);
    });
  }

  onSubmit() {
    console.log('Hi fromself reports Submit');
    // console.log(this.mentorReport);

    if (this.myForm.invalid) {
      this.errorMessage = '';

      if (!this.myForm.controls.narrative_English.valid) {
        this.errorMessage = this.errorMessage + 'Description must be filled in. Descripcione debe rellenarse';
      }
      window.scrollTo(0, 0);
      return false;
    }

    console.log('###before submitting update model with form control values');

    this.selfReport.narrative_English = this.myForm.controls.narrative_English.value;
    this.selfReport.narrative_Spanish = this.myForm.controls.narrative_Spanish.value;

    this.ssrData.putStudentSelfReport(this.selfReport).subscribe(
      (student) => {
        console.log((this.successMessage = <any>student));
        this.isSubmitted = true;
        this.isLoading = false;
        const target = '/students';
        console.log('after call to editMentorReport; navigating to ' + target);
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

}
