import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { constants } from 'src/app/_shared/constants/constants';
import { StudentDataService } from 'src/app/_shared/data/student-data.service';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { SponsorGroup } from 'src/app/_shared/models/sponsor-group';
import { SetSelectedStudentIdentifiers } from 'src/app/_store/student/student.action';
import { StudentSelfReport } from '../../_shared/models/student-self-report';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { SessionService } from '../../_shared/services/session.service';

@Component({
  templateUrl: './students-self-reports.component.html',
  styleUrls: ['./students-self-reports.component.css']
})
export class StudentsSelfReportsComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  studentId: number;
  studentRecordGUId: string;
  student: StudentDTO;
  studentSelfReports: Array<StudentSelfReport>;
  sponsorGroup: SponsorGroup;
  sponsorGroupName: string;
  sponsorGroupId: number | undefined;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public studentData: StudentDataService,
    public studentSelfReportData: StudentSelfReportDataService,
    public session: SessionService,
    public store: Store
  ) {
    console.log('ssr constructor');
  }

  ngOnInit() {
    this.studentRecordGUId = this.session.getStudentRecordGUId();
    console.log('studentRecordGUId from session:' + this.studentRecordGUId);
    this.fetchSponsorGroup();
    this.isLoading = true;
  }

  fetchSponsorGroup() {
    this.studentData.getSponsorGroupForStudent(this.studentRecordGUId).subscribe(
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
    this.studentSelfReportData.getStudentSelfReportsByGUId(this.studentRecordGUId).subscribe(
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

  selfReportEdit(id: number, studentGUId: string, studentName: string) {
    // AABBCCDD
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));

    console.log(studentName);
    const link = '/students/self-reports-edit/' + id;
    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }

  studentSelfReportAdd() {
    const target =
      'students/self-reports-add/' + this.studentId + '/' + this.sponsorGroupId + '/' + this.studentRecordGUId;
    console.log('in SSR: ready to navigate to' + target);
    this.router.navigateByUrl(target);
  }
  isCurrentReportDate(rptDate: string) {
    return rptDate.substr(0, 7) >= constants.currentGradePeriodStartDate.substr(0, 7); // 'yyyy-MM';
  }
}
