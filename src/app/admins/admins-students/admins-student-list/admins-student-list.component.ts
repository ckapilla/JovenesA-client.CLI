import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { constants } from 'src/app/_shared/constants/constants';
import { StudentDataService } from 'src/app/_shared/data/student-data.service';
import { SELECTITEM } from 'src/app/_shared/interfaces/SELECTITEM';
import { SORTCRITERIA } from 'src/app/_shared/interfaces/SORTCRITERIA';
import { StudentDTO } from 'src/app/_shared/models/studentDTO';
import { ColumnSortService } from 'src/app/_shared/services/column-sort.service';
import { SessionService } from 'src/app/_shared/services/session.service';
import { UIState } from 'src/app/_store/ui/ui.state';

@Component({
  selector: 'app-admins-student-list',
  templateUrl: './admins-student-list.component.html',
  styleUrls: [ './admins-student-list.component.css' ]
})
export class AdminsStudentListComponent implements OnInit {
  selectedActiveStatus: string;
  selectedStatus: string;
  selectedYearJoined: string;
  selectedGradYear: string;

  studentDTO: StudentDTO;
  studentDTOs: StudentDTO[];
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  sortCriteria: SORTCRITERIA;

  readonly studentStatuses: SELECTITEM[] = constants.studentStatuses;
  readonly joinedYears: SELECTITEM[] = constants.joinedYears;
  readonly gradYears: SELECTITEM[] = constants.gradYears;
  readonly smileys: string[] = constants.smileys;
  displayTestNames: boolean;

  @Select(UIState.getTestNamesVisibility) testNameVisibility$: Observable<boolean>;

  constructor(
    public studentData: StudentDataService,
    public router: Router,
    // private route: ActivatedRoute,
    private session: SessionService,
    private columnSorter: ColumnSortService
  ) {
    console.log('Hi from student List Ctrl controller function');

    this.selectedActiveStatus = '-1';
    this.selectedStatus = this.session.getSelectedStudentStatus();
    this.selectedYearJoined = this.session.getSelectedYearJoined();
    this.selectedGradYear = this.session.getSelectedGradYear();

    this.isLoading = false;
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
      this.fetchFilteredData();
    });
  }

  setSelectedActiveStatus(activeStatus: string) {
    console.log('selected activeStatus: ' + activeStatus);
    this.selectedActiveStatus = activeStatus;
    if (activeStatus === '1') {
      this.selectedStatus = '-1';
    } else {
      this.selectedStatus = '1005'; // current
    }
    this.fetchFilteredData();
  }

  setSelectedStatus(status: string) {
    console.log('selected status: ' + status);
    this.selectedStatus = status;
    this.session.setSelectedStudentStatus(status);
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
    this.isLoading = true;
    this.studentData
      .getStudentDTOsByStatusAndYear(
        this.selectedActiveStatus,
        this.selectedStatus,
        this.selectedYearJoined,
        this.selectedGradYear
      )
      .subscribe(
        (data) => {
          this.studentDTOs = data
            .filter((item) => {
              if (this.displayTestNames) {
                return item;
              } else if (!this.displayTestNames && item.studentName !== '_Test, _Student') {
                return item;
              }
            })
            .map(this.getNumericStatus);
        },
        (err) => {
          this.errorMessage = err;
        },
        () => {
          // this.studentDTOs = this.studentDTOs.filter(s => s.studentId !== 275); // N/A
          console.log(this.studentDTOs[0]);
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

    return studentDTO;
  }

  gotoStudent(guid: string, studentName: string) {
    console.log('setting studentName to ' + studentName);
    this.session.setStudentInContextName(studentName);

    const link = [ 'admins/students/student', { guid: guid } ];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoMentor(guid: string) {
    const link = [ 'admins/members/member', { guid: guid } ];

    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoReport(id: number) {
    const link = [ '/admins/students/mentorReports', id ];
    console.log('navigating to ' + link);
    this.router.navigate(link);
  }

  gotoStudentSearch() {
    const link = '/admins/students';
    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }

  public onSortColumn(sortCriteria: SORTCRITERIA) {
    console.log('parent received sortColumnCLick event with ' + sortCriteria.sortColumn);
    return this.studentDTOs.sort((a, b) => this.columnSorter.compareValues(a, b, sortCriteria));
  }

  // onSorted($event) {
  //   console.log('sorted event received');
  // }
}
