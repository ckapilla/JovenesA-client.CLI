import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentSelfReportDataService } from 'src/app/_shared/services/student-self-report-data.service';
import { StudentSelfReport } from '../../_shared/models/student-self-report';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  templateUrl: './self-reports-edit.component.html',
  styleUrls: ['./self-reports-edit.component.css', '../../../assets/css/forms.css'],
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

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public ssrData: StudentSelfReportDataService,
    private _fb: FormBuilder,
    public session: SessionService) {

    this.myForm = _fb.group({
      lastContactYearSelector: ['2019', Validators.required],
      narrative_English: ['', { validators: [Validators.required], updateOn: 'blur' }],
      narrative_Spanish: [''],
      selfReportId: [this.reportIdCtl]
    });

    this.narrative_EnglishCtl = this.myForm.controls['narrative_English'];
    this.narrative_SpanishCtl = this.myForm.controls['narrative_Spanish'];
    this.reportIdCtl = this.myForm.controls['selfReportId'];


  }

  ngOnInit() {
    this.selfReportId = this.currRoute.snapshot.params['selfReportId'];

    // if (!this.studentId) {
    //   this.studentId = this.session.getStudentId();
    //   console.log('studentId from session:' + this.studentId);
    // }

    this.isLoading = true;
    this.ssrData.getStudentSelfReport(this.selfReportId)
      .subscribe(
        data => { this.selfReport = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          this.isLoading = false;
          console.log('### after retreiving, set form controls to retreived selfReport-- reportId to ' + this.selfReportId);
          // mentorId and studentId do not have corresponding controls
          this.reportIdCtl.setValue(this.selfReportId);
          this.narrative_EnglishCtl.setValue(this.selfReport.narrative_English);
          this.narrative_SpanishCtl.setValue(this.selfReport.narrative_Spanish);
        });
  }

  onSubmit() {
    console.log('Hi from mentor Report2 Submit');
    // console.log(this.mentorReport);

    if (this.myForm.invalid) {
      let i = 0;
      this.errorMessage = '';

      if (!this.narrative_EnglishCtl.valid) {
        this.errorMessage = this.errorMessage + 'Description must be filled in. Descripcione debe rellenarse';
        ++i;
      }
      window.scrollTo(0, 0);
      return false;
    }

    console.log('###before submitting update model with form control values');
    // mentorId and studentId do not have corresponding controls

    this.selfReport.narrative_English = this.narrative_EnglishCtl.value;
    this.selfReport.narrative_Spanish = this.narrative_SpanishCtl.value;
    // this.selfReport.reviewedStatusId = 2086; // already is needs setup or wouldn't be here

    this.ssrData.putStudentSelfReport(this.selfReport)
      .subscribe(
        (student) => {
          console.log(this.successMessage = <any>student);
          this.isSubmitted = true;
          this.isLoading = false;
          const target = '/students/self-reports';
          console.log('after call to editMentorReport; navigating to ' + target);
          this.router.navigateByUrl(target);
        },
        (error) => {
          this.errorMessage = <any>error;
          this.isLoading = false;
        }
      );
    return false;
  }

  onCancel() {
    const target = '/students/self-reports/' + this.session.getStudentId(); // + '/' + this.studentId;
    console.log('navigating to ' + target);
    this.router.navigateByUrl(target);
  }

}
