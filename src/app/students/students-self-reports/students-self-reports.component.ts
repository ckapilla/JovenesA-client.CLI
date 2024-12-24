import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { StudentDataService } from 'src/app/_shared/data/student-data.service';
import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';
import { SponsorGroup } from 'src/app/_shared/models/sponsor-group';
import { SetSelectedStudentIdentifiers } from 'src/app/_store/student/student.action';
import { StudentState } from 'src/app/_store/student/student.state';
import { StudentSelfReport } from '../../_shared/models/student-self-report';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { SessionService } from '../../_shared/services/session.service';
//import { StudentSelfReportDataService } from 'src/app/_shared/data/student-self-report-data.service';

@Component({
  templateUrl: './students-self-reports.component.html',
  styleUrls: ['./students-self-reports.component.css', '../students.component.css']
})
export class StudentsSelfReportsComponent implements OnInit {
  isLoading: boolean;
  errorMessage: string;
  studentId: number;
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
  reportSubmitted = false; // default off for safety
  firstMonthInNextQuarter = '--';
  studentGUId: string;

  currentStudentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);

  fechaEntregaInicio: Date;
  fechaEntregaFinal: Date;

  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public studentData: StudentDataService,
    public studentSelfReportData: StudentSelfReportDataService,
    public session: SessionService,
    public store: Store,
    public ssrData: StudentSelfReportDataService,
    public renderer2: Renderer2,
    private changeDetector: ChangeDetectorRef,

  ) {
    //console.log('ssr constructor' + 'inReportProcessingPeriod = ' + this.inReportProcessingPeriod);
  }

  parseSSRDateRange() {
    //console.log('in parseSSRDateRange');

    var strToday = formatDate(new Date(), 'yyyyMMdd', 'en-us');
    //console.log('today literal ' + strToday);

    this.splitStartStopDates(strToday);
    this.getMonthStrings(strToday);
  }

  splitStartStopDates(strToday: string) {
    //console.log('constants has ' + constants.ssrDateRange);
    this.ssrEditDateStart =  constants.ssrDateRange.substring(0,8);
    //console.log('Start literal ' + this.ssrEditDateStart);
    this.ssrEditDateStop =  constants.ssrDateRange.substring(9);
    //console.log('stop literal ' + this.ssrEditDateStop);
    //console.log('month ' + constants.ssrDateRange.substring(4,6));

    if (strToday >= this.ssrEditDateStart && strToday <= this.ssrEditDateStop) {
      //console.log ('in report recording period');
      this.inReportProcessingPeriod = true;
    } else {
      //console.log('NOT in report recording period');
      this.inReportProcessingPeriod = false;
    }

      // REMP TEMP TEMP
    this.inReportProcessingPeriod = true;
  }



  getMonthStrings(strToday: string) {
    let month = strToday.substring(4, 6);
    //console.log('month ' + month)
    switch (month) {
      case '01':
      case '02':
      case '03':
        this.firstMonthInNextQuarter = 'febrero';
        break;
      case '04':
      case '05':
      case '06':
        this.firstMonthInNextQuarter = 'julio';
        break;
      case '07':
      case '08':
      case '09':
        this.firstMonthInNextQuarter = 'octubre';
        break;
      case '10':
      case '11':
      case '12':
        this.firstMonthInNextQuarter = 'enero';
        break;
    }
  }

  ngOnInit() {
    this.studentGUId = this.session.getStudentRecordGUId();
    //console.log('studentSelfReport ngOnInit, studentGUID = ' + this.studentGUId);
    this.parseSSRDateRange();
    // fetch
    this.fetchSelfReports();

    //  this.subscribeForStudentGUId();
  }


  // subscribeForStudentGUId() {
  //   this.studentGUId = 'unset';
  //   this.subscription = this.currentStudentGUId$.subscribe((message) => {
  //     this.studentGUId= message;
  //     console.log('************NGXS: admins-student-qrs new StudentGUID received' + this.studentGUId);
  //     // this.fetchSponsorGroup();
  //     this.isLoading = true;
  //     this.parseSSRDateRange();
  //     this.fetchSelfReports();

  //   });
  // }

  // fetchSponsorGroup() {
  //   //console.log('>>>>fetching Sponsor greoup for ' + this.studentGUId);
  //   this.studentData.getSponsorGroupForStudent(this.studentGUId).subscribe(
  //     (data) => {
  //       this.sponsorGroup = data;
  //       //console.log('got SponsorGroupForStudent');
  //       //console.log(this.sponsorGroup);
  //     },
  //     (err) => console.error('Subscribe error: ' + err),
  //     () => {
  //       //console.log('sponsors-for-student-grid loaded ');
  //       if (this.sponsorGroup) {
  //         this.sponsorGroupId = this.sponsorGroup.sponsorGroupId;
  //         this.fetchSelfReports();
  //       } else {
  //         this.errorMessage = 'Something went wrong';
  //         // this.onNoAssignedStudents.emit();
  //         this.isLoading = false;
  //       }
  //     }
  //   );
  // }

  // possible TODO: get full text only for each report and truncate here
  // OR fetch truncated text and full text in one pass
  fetchSelfReports() {
    // this returns truncated text and full text for all reports for a student
    this.studentSelfReportData.getStudentSelfReportsByGUId(this.studentGUId).subscribe(
      (data) => {
        this.studentSelfReports = data;
        this.setReportShortToReportShown();// display the short version
        this.setReportFulltext();  // separate call to get full text
        this.setEllipsisLink();
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        //console.log('done: ');
        this.isLoading = false;
      }
    );
  }

  selfReportEdit(id: number, studentGUId: string, studentName: string) {
    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));

    //console.log('datos para editar', id, studentGUId, studentName);
    const link = '/students/self-reports-edit/' + id;
    //console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }

  studentSelfReportAdd() {

    let sponsorGroupId = 1168; // dummy value until code is eliminated
    const link = [
      '/students/self-reports-add',
      {
        sponsorGroupId: sponsorGroupId,
        studentGUId: this.studentGUId
      }
    ];
    //console.log('navigating to ' + JSON.stringify(link));
    this.router.navigate(link);
  }

  isInCurrentReportDateRange(rptDate: string) {

    console.log('~~~~~~~~~~~~~~~~~check if in date range~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('current ReportDate: ' + rptDate);
    rptDate = rptDate.substr(0,4) + rptDate.substr(5,2) + rptDate.substr(8,2);
    rptDate = '20250202';
    console.log('current tweaked ReportDate: ' + rptDate);
    console.log('ssrEditDateStart: ' + this.ssrEditDateStart);
    console.log('ssrEditDateStop: ' + this.ssrEditDateStop);
    console.log('this.reportSubmitted =') ;
    console.log(rptDate >= this.ssrEditDateStart); //  && rptDate <= this.ssrEditDateStop);
    return this.reportSubmitted =(rptDate >= this.ssrEditDateStart );
    }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  readMore(position: number) {

    if (this.studentSelfReports[position]['link'] == 'Leer más &#62;') {
      //display the full-length version
      this.studentSelfReports[position]['reportShown'] = this.studentSelfReports[position]['reportFulltext'];
      this.studentSelfReports[position]['link'] = 'Leer menos &#708;';
      this.studentSelfReports[position]['ellipsis'] = '';
    } else {
      //cambiamos el valor del reportShown por el recumen del reporte
      // display the short version
      this.studentSelfReports[position]['reportShown'] = this.studentSelfReports[position]['reportShort'];
      this.studentSelfReports[position]['link'] = 'Leer más &#62;';
      this.studentSelfReports[position]['ellipsis'] = ' ...';
    }
  }
  // for initial load using truncated narrative_Spanish
  setReportShortToReportShown() {
    this.studentSelfReports.forEach((report) => {
      report['reportShort'] = report.narrative_Spanish;  // store it
      report['reportShown'] = report.narrative_Spanish;  // display it
    });
  }

  // fetch and store full text report load (do not display until leer mas)
  // (maybe change this to load on demand for a single report)
  setReportFulltext() {
    this.studentSelfReports.forEach((report) => {
      // full text
      this.ssrData.getStudentSelfReport(report.studentSelfReportId).subscribe(
        (data) => {
          //console.log(data)
          report['reportFulltext'] = data.narrative_Spanish;
        },
        (err) => console.error('Subscribe error: ' + err),
      );
    });
  }
  setEllipsisLink() {
    this.studentSelfReports.forEach((report) => {
      report['link'] = 'Leer más &#62;';
      report['ellipsis'] = '...';
    });
  }
}
