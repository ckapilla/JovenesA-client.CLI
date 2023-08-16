import { formatDate } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
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
  styleUrls: ['./students-self-reports.component.css']
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
  lastMonthInQuarter = '--';
  studentGUId: string;

  currentStudentGUId$ = this.store.select<string>(StudentState.getSelectedStudentGUId);



  reporteCompletoTexto: string;
  reporteResumenTexto: string;
  reporteCompleto: StudentSelfReport;


  constructor(
    public currRoute: ActivatedRoute,
    private router: Router,
    public studentData: StudentDataService,
    public studentSelfReportData: StudentSelfReportDataService,
    public session: SessionService,
    public store: Store,
    public ssrData: StudentSelfReportDataService,
    public renderer2: Renderer2


  ) {

    //console.log('ssr constructor' + 'inReportProcessingPeriod = ' + this.inReportProcessingPeriod);

  }

  parseSSRDateRange() {
    console.log('in parseSSRDateRange');

    var strToday = formatDate(new Date(), 'yyyyMMdd', 'en-us');
    console.log('today literal ' + strToday);

    this.splitStartStopDates(strToday);
    this.getMonthStrings(strToday);
  }

  splitStartStopDates(strToday: string) {

    console.log('constants has ' + constants.ssrDateRange);
    let ssrEditDateStart = constants.ssrDateRange.substring(0, 8);
    console.log('Start literal ' + ssrEditDateStart);
    let ssrEditDateStop = constants.ssrDateRange.substring(9);
    console.log('stop literal ' + ssrEditDateStop);
    console.log('month ' + constants.ssrDateRange.substring(4, 6));

    if (strToday >= ssrEditDateStart && strToday <= ssrEditDateStop) {
      console.log('in report recording period');
      this.inReportProcessingPeriod = true;
    } else {
      console.log('NOT in report recording period');
      this.inReportProcessingPeriod = false;
    }
  }

  getMonthStrings(strToday: string) {
    let month = strToday.substring(4, 6);
    switch (month) {
      case '03':
        this.lastMonthInQuarter = 'marzo';
      case '06':
        this.lastMonthInQuarter = 'junio';
      case '09':
        this.lastMonthInQuarter = 'septiembre';
      case '12':
        this.lastMonthInQuarter = 'diciembre';
    }
  }

  ngOnInit() {
    this.studentGUId = this.session.getStudentRecordGUId();
    console.log('studentSelfReport ngOnInit, studentGUID = ' + this.studentGUId);
    this.parseSSRDateRange();
    this.fetchSelfReports();
    //  this.subscribeForStudentGUId();
  }
  verMas(reportId, lugar) {
    if (this.studentSelfReports[lugar]['link'] == 'Seguir leyendo &#709;') {

      this.ssrData.getStudentSelfReport(reportId).subscribe(
        (data) => {
          //guardamos el resumen en una nueva variable
          this.reporteResumenTexto = this.studentSelfReports[lugar].narrative_Spanish
          //cambiamos el resumen por el texto completo del reporte
          this.studentSelfReports[lugar].narrative_Spanish = data.narrative_Spanish
          //cambiamos el texto del link
          this.studentSelfReports[lugar]['link'] = 'Leer menos &#708;'
          this.studentSelfReports[lugar]['puntos'] = ''
        }
        ,
        (err) => console.error('Subscribe error: ' + err),
        () => {

        }
      );
    }
    else {

      //regresamos el resumen al arreglo
      this.studentSelfReports[lugar].narrative_Spanish = this.reporteResumenTexto
      this.studentSelfReports[lugar]['link'] = 'Seguir leyendo &#709;'
      this.studentSelfReports[lugar]['puntos'] = ' ...'
    }

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



  fetchSponsorGroup() {
    console.log('>>>>fetching Sponsor greoup for ' + this.studentGUId);
    this.studentData.getSponsorGroupForStudent(this.studentGUId).subscribe(
      (data) => {
        this.sponsorGroup = data;
        console.log('got SponsorGroupForStudent');
        console.log(this.sponsorGroup);
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('sponsors-for-student-grid loaded ');
        if (this.sponsorGroup) {
          this.sponsorGroupId = this.sponsorGroup.sponsorGroupId;
          this.fetchSelfReports();
        } else {
          this.errorMessage = 'Something went wrong';
          // this.onNoAssignedStudents.emit();
          this.isLoading = false;
        }
      }
    );
  }

  fetchSelfReports() {
    this.studentSelfReportData.getStudentSelfReportsByGUId(this.studentGUId).subscribe(
      (data) => {
        this.studentSelfReports = data;
        console.log(data)
        this.agregarLinkPuntos()
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('done: ');
        this.isLoading = false;
      }
    );
  }

  agregarLinkPuntos() {
    this.studentSelfReports.forEach(element => {
      element['link'] = 'Seguir leyendo &#709;'
      element['puntos'] = ' ...'
    });


  }



  selfReportEdit(id: number, studentGUId: string, studentName: string) {

    this.store.dispatch(new SetSelectedStudentIdentifiers({ studentGUId, studentName }));

    console.log(studentName);
    const link = '/students/self-reports-edit/' + id;
    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }

  studentSelfReportAdd() {
    //   const target =
    //       'students/self-reports-add/' +  this.sponsorGroupId + '/' + this.studentGUId;
    //   console.log('in SSR: ready to navigate to ' + target);
    //   this.router.navigateByUrl(target);
    // }
    console.log('actual nonProxy studentGUId ' + this.studentGUId);

    let sponsorGroupId = 1168; // dummy value until code is eliminated
    const link = ['/students/self-reports-add',
      {
        sponsorGroupId: sponsorGroupId,
        studentGUId: this.studentGUId
      }
    ];
    console.log('navigating to ' + JSON.stringify(link));
    this.router.navigate(link);
  }

  //***prueba de función para detectar si esta dentro del plazo para editar */

  isInCurrentReportDateRange2(rptDate2: string) {
    console.log(rptDate2)

    this.ssrEditDateStart = '2023-03-07T17:29:48.34'
    this.ssrEditDateStop = '2023-05-07T17:29:48.34'
    return (rptDate2 >= this.ssrEditDateStart && rptDate2 <= this.ssrEditDateStop);


  }

  isInCurrentReportDateRange(rptDate: string) {
    return (rptDate >= this.ssrEditDateStart && rptDate <= this.ssrEditDateStop);


  }

}