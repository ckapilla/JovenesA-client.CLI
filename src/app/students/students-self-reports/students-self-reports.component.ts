import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
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
  selectedQRPeriod = '';
  subscription: Subscription;
  // ssrEditDateRange = '';
  ssrEditDateStart = '';
  ssrEditDateStop = '';
  inReportProcessingPeriod = false; // default off for safety
  lastMonthInQuarter = '--';

  //  ssrEditDateRange$ = this.store.select<string>(UIState.getSSREditDateRange);

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public studentData: StudentDataService,
    public studentSelfReportData: StudentSelfReportDataService,
    public session: SessionService,
    public store: Store
  ) {
    console.log('ssr constructor' + 'inReportProcessingPeriod = ' + this.inReportProcessingPeriod);
  }

  computeSSREditDateRange() {

      let strDateRange = constants.ssrEditDateRange;
      console.log(strDateRange);
      this.ssrEditDateStart = strDateRange.substring(0,10);
      console.log(this.ssrEditDateStart);
      this.ssrEditDateStop = strDateRange.substring(11);
      console.log(this.ssrEditDateStop);
      console.log(strDateRange.substring(5,7));
      let x  = strDateRange.substring(5,7);

      var d0 = new Date(formatDate(new Date(),'yyyy-MM-dd', 'en-us'));
      var d1 = new Date(this.ssrEditDateStart);
      d1 = new Date(formatDate(d1,'yyyy-MM-dd', 'en-us'));
      var d2 = new Date(this.ssrEditDateStop);
      d2 = new Date(formatDate(d2,'yyyy-MM-dd', 'en-us'));
      if (d0 >= d1 && d0 <= d2) {
        console.log ('in report recording period');
        this.inReportProcessingPeriod = true;
      } else {
        console.log ('NOT in report recording period');
        this.inReportProcessingPeriod = false;
      }


      switch (x)
      {
        case '03':
          this.lastMonthInQuarter = 'marzo';
        case '06':
          this.lastMonthInQuarter = 'junio';
        case '09':
          this.lastMonthInQuarter = 'septiembre';
        case '12':
          this.lastMonthInQuarter = 'diciembre';
      }
      console.log('*ssrEditDateRange ' + this.ssrEditDateStart + '|' + this.ssrEditDateStop);
  }

  ngOnInit() {
    this.studentRecordGUId = this.session.getStudentRecordGUId();
    console.log('studentRecordGUId from session:' + this.studentRecordGUId);
    this.fetchSponsorGroup();
    this.isLoading = true;
    this.computeSSREditDateRange();

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

  isInCurrentReportDateRange(rptDate: string) {
    return (rptDate >= this.ssrEditDateStart  && rptDate <= this.ssrEditDateStop);
  }
}
