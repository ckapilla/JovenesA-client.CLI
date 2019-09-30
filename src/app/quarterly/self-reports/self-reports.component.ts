import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentSelfReport } from '../../app_shared/models/student-self-report';
import { StudentDTO } from '../../app_shared/models/studentDTO';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({
  selector: 'app-self-reports',
  templateUrl: './self-reports.component.html',
  styleUrls: ['./self-reports.component.css', '../../../assets/css/forms.css'],
})

export class SelfReportsComponent implements OnInit {

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
  studentGUId: string;
  selectedStudentGUIdMessage: string;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public sqlResource: SqlResource,
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

    this.sqlResource.putStudentSelfReport(this.selfReport)
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
          console.log(this.errorMessage = <any>error);
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


  onSelectedStudentGUId(studentGUId: string) {
    console.log('$$$$$$$ got selectedGUId event: ' + studentGUId);
    this.studentGUId = studentGUId;
    this.selectedStudentGUIdMessage = studentGUId;
    this.fetchData();
  }

  onSelectedStudent($event) {
    console.log('self reports parent recevied StudentGUIdEvent ' + $event);
    this.selectedStudentGUIdMessage = $event;
  }

  fetchData() {
    // this.selfReportId = this.currRoute.snapshot.params['selfReportId'];

    // if (!this.studentId) {
    //   this.studentId = this.session.getStudentId();
    //   console.log('studentId from session:' + this.studentId);
    // }

    this.isLoading = true;
    this.sqlResource.getStudentSelfReportsByPeriod('2019', '3', '0', this.studentGUId)
      .subscribe(
        data => { this.studentSelfReports = data; },
        err => console.error('Subscribe error: ' + err),
        () => {

          this.isLoading = false;
          if (this.studentSelfReports.length > 0) {
            console.log('### after retreiving, set form controls to retreived selfReport-- reportId to ' + this.studentSelfReports[0].studentSelfReportId);
            // mentorId and studentId do not have corresponding controls
            this.reportIdCtl.setValue(this.studentSelfReports[0].studentSelfReportId);
            this.narrative_EnglishCtl.setValue(this.studentSelfReports[0].narrative_English);
            this.narrative_SpanishCtl.setValue(this.studentSelfReports[0].narrative_Spanish);
          } else {
            console.log('no results returned');
            this.narrative_EnglishCtl.setValue('--No Report Found--');
            this.narrative_SpanishCtl.setValue('--No Report Found--');
          }

        });
  }

}
