import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentSelfReport } from '../../app_shared/models/student-self-report';
import { StudentDTO } from '../../app_shared/models/studentDTO';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';

@Component({
  templateUrl: './students-self-reports.component.html',
  styleUrls: ['./students-self-reports.component.css'],
})

export class StudentsSelfReportsComponent implements OnInit {

  isLoading: boolean;
  errorMessage: string;
  studentId: number;
  student: StudentDTO;
  studentSelfReports: Array<StudentSelfReport>;
  sponsorGroupName: string;
  sponsorGroupId: number;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public sqlResource: SqlResource,
    public session: SessionService) {

    console.log('sponsorLetters constructor');
  }

  ngOnInit() {
    console.log('sponsorLetters ngOnInit');
    this.studentId = this.currRoute.snapshot.params['studentId'];
    console.log('studentId from route: ' + this.studentId);
    if (!this.studentId) {
      this.studentId = this.session.getStudentId();
      console.log('studentId from session:' + this.studentId);
    }
    // may be undefined at this point:

    this.isLoading = true;
  }

  onSelectedSponsorGroupName(sponsorGroupName: string) {
    console.log('$$$$$$$ got selected NAME event');
    this.sponsorGroupName = '' + sponsorGroupName;
  }

  onSelectedSponsorGroupId(sponsorGroupId: number) {
    console.log('$$$$$$$ got selectedId event sponsorGroupId: ' + sponsorGroupId);
    this.sponsorGroupId = sponsorGroupId;
    this.sqlResource.getStudentSelfReports(this.studentId, sponsorGroupId)
      .subscribe(
        data => { this.studentSelfReports = data; },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('done: ');
          this.isLoading = false;
        }
      );
  }

  selfReportEdit(id: number, studentName: string) {
    this.session.setStudentInContextName(studentName);
    const link = '/students/self-reports-edit/' + id;
    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }

  sponsorLetterAdd() {
    const target = 'students/self-reports-add/' + this.studentId + '/' + this.sponsorGroupId;
    console.log('in students-sponsor-letters: ready to navigate to' + target);
    this.router.navigateByUrl(target);
  }
}
