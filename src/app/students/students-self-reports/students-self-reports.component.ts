import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorGroupDataService } from 'src/app/_shared/data/sponsor-group-data.service';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { SponsorGroup } from 'src/app/_shared/models/sponsor-group';
import { StudentSelfReport } from '../../_shared/models/student-self-report';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  templateUrl: './students-self-reports.component.html',
  styleUrls: [ './students-self-reports.component.css' ]
})
export class StudentsSelfReportsComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  studentId: number;
  studentGUId: string;
  student: StudentDTO;
  studentSelfReports: Array<StudentSelfReport>;
  sponsorGroup: SponsorGroup;
  sponsorGroupName: string;
  sponsorGroupId: number | undefined;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public sponsorGroupData: SponsorGroupDataService,
    public studentSelfReportData: StudentSelfReportDataService,
    public session: SessionService
  ) {
    console.log('ssr constructor');
  }

  ngOnInit() {
    console.log('sponsorLetters ngOnInit');
    // this.studentId = this.currRoute.snapshot.params['studentId'];
    // console.log('studentId from route: ' + this.studentId);
    // if (!this.studentId) {
    this.studentId = this.session.getUserId();
    console.log('studentId from session:' + this.studentId);
    // }

    // this.studentGUId = this.currRoute.snapshot.params['studentGUId'];
    // console.log('studentGUId from route: ' + this.studentGUId);
    // if (!this.studentGUId) {
    this.studentGUId = this.session.getUserGUId();
    console.log('studentGUId from session:' + this.studentGUId);
    // }
    this.fetchSponsorGroup();
    this.isLoading = true;
  }

  fetchSponsorGroup() {
    this.sponsorGroupData.getSponsorGroupForStudent(this.studentId).subscribe(
      (data) => {
        this.sponsorGroup = data;
        console.log('getSponsorGroupForStudent');
        console.log(this.sponsorGroup);
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('sponsors-for-student-grid loaded ');
        if (this.sponsorGroup) {
          this.sponsorGroupId = this.sponsorGroup.sponsorGroupId;
          this.fetchSelfReports();
        } else {
          this.errorMessage = 'No Assigned Sponsors.';
          // this.onNoAssignedStudents.emit();
          this.isLoading = false;
        }
      }
    );
  }

  fetchSelfReports() {
    console.log('fetch reports with sponsorGroupId: 0 so only for this student');
    this.studentSelfReportData.getStudentSelfReports(this.studentId, 0).subscribe(
      (data) => {
        this.studentSelfReports = data;
      },
      (err) => console.error('Subscribe error: ' + err),
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

  studentSelfReportAdd() {
    const target =
			'students/self-reports-add/' + this.studentId + '/' + this.sponsorGroupId + '/' + this.studentGUId;
    console.log('in students-sponsor-letters: ready to navigate to' + target);
    this.router.navigateByUrl(target);
  }
  isCurrentReportDate(rptDate: string) {
    console.log(rptDate.substr(0, 7));
    return rptDate.substr(0, 7) >= '2020-06';
  }
}
