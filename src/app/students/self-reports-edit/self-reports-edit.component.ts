import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from 'src/app/_shared/constants/constants';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { StudentSelfReport } from '../../_shared/models/student-self-report';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { SessionService } from '../../_shared/services/session.service';

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
  student: StudentDTO;
  studentSelfReports: Array<StudentSelfReport>;
  sponsorGroupName: string;
  sponsorGroupId: number;
  selfReport: StudentSelfReport;
  selfReportId: number;
  myForm: FormGroup;
  narrative_EnglishCtl: AbstractControl;
  narrative_SpanishCtl: AbstractControl;
  reportIdCtl: AbstractControl;
  periodYears: SELECTITEM[];
  periodMonths: SELECTITEM[];

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public ssrData: StudentSelfReportDataService,
    private _fb: FormBuilder,
    public session: SessionService
  ) {
    this.periodYears = constants.periodYears;
    this.periodMonths = constants.periods;

    this.myForm = _fb.group({
      reportYear: [''],
      reportPeriod: [''],
      narrative_English: ['', { validators: [Validators.required], updateOn: 'blur' }],
      narrative_Spanish: ['', { validators: [Validators.required], updateOn: 'blur' }],
      selfReportId: [this.reportIdCtl]
    });

    this.myForm.controls.reportYear.disable();
    this.myForm.controls.reportPeriod.disable();

    this.narrative_EnglishCtl = this.myForm.controls['narrative_English'];
    this.narrative_SpanishCtl = this.myForm.controls['narrative_Spanish'];
    this.reportIdCtl = this.myForm.controls['selfReportId'];
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
        this.reportIdCtl.setValue(this.selfReportId);
        this.narrative_EnglishCtl.setValue(this.selfReport.narrative_English);
        this.narrative_SpanishCtl.setValue(this.selfReport.narrative_Spanish);
      }
    );
  }

  onSubmit() {
    console.log('Hi from mentor Report2 Submit');
    // console.log(this.mentorReport);

    if (this.myForm.invalid) {
      this.errorMessage = '';

      if (!this.narrative_EnglishCtl.valid) {
        this.errorMessage = this.errorMessage + 'Description must be filled in. Descripcione debe rellenarse';
      }
      window.scrollTo(0, 0);
      return false;
    }

    console.log('###before submitting update model with form control values');

    this.selfReport.narrative_English = this.narrative_EnglishCtl.value;
    this.selfReport.narrative_Spanish = this.narrative_SpanishCtl.value;
    // this.selfReport.reviewedStatusId = 2086; // already is needs setup or wouldn't be here

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
