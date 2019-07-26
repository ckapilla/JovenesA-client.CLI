
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { constants } from '../../app_shared/constants/constants';
import { SELECTITEM } from '../../app_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from '../../app_shared/interfaces/SORTCRITERIA';
import { StudentDTO } from '../../app_shared/models/studentDTO';
import { ColumnSortService } from '../../app_shared/services/column-sort.service';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource.service';



@Component({

  templateUrl: './admins-students.component.html',
  styleUrls: ['./admins-students.component.css']
})

export class AdminsStudentsComponent implements OnInit {

  selectedStatus: string;
  selectedYearJoined: string;
  selectedGradYear: string;

  studentDTO: StudentDTO;
  studentDTOs: StudentDTO[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;

  readonly statuses: SELECTITEM[] = constants.studentStatuses;
  readonly schoolTypes: SELECTITEM[] = constants.schoolTypes;
  readonly joinedYears: SELECTITEM[] = constants.joinedYears;
  readonly gradYears: SELECTITEM[] = constants.gradYears;
  readonly smileys: string[] = constants.smileys;

  constructor(
    public sqlResource: SqlResource,
    public router: Router,
    // private route: ActivatedRoute,
    private session: SessionService,
    private columnSorter: ColumnSortService
  ) {

    console.log('Hi from student List Ctrl controller function');

    this.selectedStatus = this.statuses[3].value; // Current
    this.selectedYearJoined = '' + this.session.getSelectedYearJoined(); // this.joinedYears[0].value;
    this.selectedGradYear = this.session.getSelectedGradYear(); // this.gradYears[0].value; // All

    // this.gradeRptsStatus = 'yellowWarning.jpg'
    // this.gpaStatus = 'greenCheck.jpg'

    this.isLoading = false;
  }

  ngOnInit() {
    console.log('ngOnInit');
    // this.processRouteParams();
    this.fetchFilteredData();
  }

  // processRouteParams() {
  //   console.log('students setting filters form queryParams');

  //   const yearJoined = this.route.snapshot.queryParams['yearJoined'];
  //   console.log('yearJoined param = ' + yearJoined);
  //   if (yearJoined !== undefined) {
  //     this.selectedYearJoined = yearJoined;
  //   }
  // }
  // can't rely on two way binding to have updated the selected values
  // in time so we do it manually below
  setSelectedStatus(status: string) {
    // console.log('selected status: ' + status);
    this.selectedStatus = status;
    this.fetchFilteredData();
  }
  setSelectedGradYear(year: string) {
    console.log('setting SelectedGradYear: ' + year);
    this.session.setSelectedGradYear(year);
    this.selectedGradYear = year;
    this.fetchFilteredData();
  }
  setSelectedYearJoined(year: string) {
    console.log('setting SelectedYearJoined: ' + year);
    this.session.setSelectedYearJoined(year);
    this.selectedYearJoined = year;
    this.fetchFilteredData();
  }

  fetchFilteredData() {
    // console.log('sqlResource for getStudents: ' +
    //        'status: ' + this.selectedStatus + ' ' +
    //        'yearjoined: ' + this.selectedYearJoined +  + ' ' +
    //        'gradyear: ' + this.selectedGradYear
    //        );
    this.isLoading = true;
    this.sqlResource.getStudentDTOsByStatusAndYear(this.selectedStatus, this.selectedYearJoined, this.selectedGradYear)
      .subscribe(
        data => { this.studentDTOs = data.map(this.getNumericStatus); },
        err => { this.errorMessage = err; },
        () => {
          this.studentDTOs = this.studentDTOs.filter(s => s.studentId !== 275); // N/A
          console.log('data loaded now set timeout for scroll');
          setTimeout(() => {
            this.scrollIntoView();
          }, 0);
          this.isLoading = false;
        }
      );
  }

  scrollIntoView() {

    const element = document.body;
    if (element) {
      element.scrollIntoView(true);
    }
  }


  getNumericStatus(studentDTO: StudentDTO): StudentDTO {

    studentDTO.numericTimelyMentorMeetingStatus = 0;
    if (studentDTO.timelyMentorMeetingStatus === 'red') {
      studentDTO.numericTimelyMentorMeetingStatus = 1;
    } else if (studentDTO.timelyMentorMeetingStatus === 'yellow') {
      studentDTO.numericTimelyMentorMeetingStatus = 2;
    } else if (studentDTO.timelyMentorMeetingStatus === 'green') {
      studentDTO.numericTimelyMentorMeetingStatus = 3;
    }

    studentDTO.numericTimelyMentorReportStatus = 0;
    if (studentDTO.timelyMentorReportStatus === 'red') {
      studentDTO.numericTimelyMentorReportStatus = 1;
    } else if (studentDTO.timelyMentorReportStatus === 'yellow') {
      studentDTO.numericTimelyMentorReportStatus = 2;
    } else if (studentDTO.timelyMentorReportStatus === 'green') {
      studentDTO.numericTimelyMentorReportStatus = 3;
    }


    studentDTO.numericGradeRptStatus = 0;
    if (studentDTO.gradeRptStatus === 'red') {
      studentDTO.numericGradeRptStatus = 1;
    } else if (studentDTO.gradeRptStatus === 'yellow') {
      studentDTO.numericGradeRptStatus = 2;
    } else if (studentDTO.gradeRptStatus === 'green') {
      studentDTO.numericGradeRptStatus = 3;
    }

    studentDTO.numericGPAStatus = 0;
    if (studentDTO.gpaStatus === 'red') {
      studentDTO.numericGPAStatus = 1;
    } else if (studentDTO.gpaStatus === 'yellow') {
      studentDTO.numericGPAStatus = 2;
    } else if (studentDTO.gpaStatus === 'green') {
      studentDTO.numericGPAStatus = 3;
    }

    studentDTO.joinedFrom = 'N/A';
    if (studentDTO.joinedFromId === 2056) {
      studentDTO.joinedFrom = 'Prepa';
    } else if (studentDTO.joinedFromId === 2057) {
      studentDTO.joinedFrom = 'Univ';
    }

    return studentDTO;
  }

  gotoStudent(id: number, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.session.setStudentInContextName(studentName);

    // const link = ['/admins/students/student', id];
    const link = ['admins/students/student', { id: id }];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoReport(id: number) {
    const link = ['/admins/students/mentorReports', id];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.studentDTOs.sort((a, b) => {
      return this.columnSorter.compareValues(a, b, sortCriteria);
    });
  }

  onSorted($event) {
    console.log('sorted event received');
  }

}
