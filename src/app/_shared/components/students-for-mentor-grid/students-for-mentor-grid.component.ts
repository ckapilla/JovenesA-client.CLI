import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SetSelectedStudentGUId } from 'src/app/_store/student/student.action';
import { StudentState } from 'src/app/_store/student/student.state';
import { constants } from '../../constants/constants';
import { StudentDataService } from '../../data/student-data.service';
import { StudentDTO } from '../../models/studentDTO';
import { SessionService } from '../../services/session.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'students-for-mentor-grid',
  templateUrl: './students-for-mentor-grid.component.html'
})
export class StudentsForMentorGridComponent implements OnInit {
  students: Array<StudentDTO>;
  emojis: Array<string> = [];
  studentId: number;
  studentGUId: string;
  errorMessage = '';
  isLoading: boolean;
  private subscription: Subscription;
  gridLoaded: boolean;

  @Select(StudentState.getSelectedStudentGUId)  currentGUId$: Observable<string>;

  constructor(
    public session: SessionService,
    private studentData: StudentDataService,
    // delete me private selectedStudent: SelectedStudent
    private store: Store
  ) {
    this.emojis = constants.emojis;

    console.log('in StudentsForMentorGridComponent constructor');
  }

  public ngOnInit() {
    this.isLoading = true;
    this.studentGUId = '';
    this.gridLoaded = false;
    this.subscribeForStudentGUIds2();
  }
  // public ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  // subscribeForStudentGUIds() {
  //   console.log('studentGrid set up studentGUId subscription');
  //   this.subscription = this.selectedStudent.subscribeForStudentGUIds().subscribe((message) => {
  //     this.studentGUId = message;
  //     console.log('students grid new StudentGUId received' + message);
  //     // only want to respond on initial load; don't want changes from self (user click)
  //     if (!this.gridLoaded) {
  //       // initial load no student preselcted
  //       this.fetchGridData();
  //       this.gridLoaded = true;
  //     }
  //   });
  // }

  subscribeForStudentGUIds2() {
    // console.log('header set up studentGUId subscription');
    this.subscription = this.currentGUId$.subscribe((message) => {
      this.studentGUId = message;
      console.log('************NGXS: header new StudentGUId received' + this.studentGUId);
      // only want to respond on initial load; don't want changes from self (user click)
      if (!this.gridLoaded) {
        // initial load no student preselcted
        this.fetchData();
        this.gridLoaded = true;
      }
    });
  }


  fetchData() {
    console.log('studentGrid calling getStudentsForMentor');
    this.studentData.getStudentsForMentorByGUId(this.session.getUserGUId()).subscribe(
      (data) => {
        this.students = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        this.isLoading = false;
        console.log('studentsForMentorGrid has # students: ' + this.students.length);
        console.log(this.students);
        if (this.students.length > 0) {
          this.selectInitialStudentAfterLoad();
        } else {
          this.errorMessage = 'No students are assigned at this time. / No hay estudiantes asignado en este momento';
        }
      }
    );
  }

  selectInitialStudentAfterLoad() {
    if (this.studentGUId === '0000') {
      console.log('no StudentGuid set, force selection of first row');
      this.studentGUId = this.students[0].studentGUId;
    }
    // see if current student
    const idx = this.students.findIndex((x) => x.studentGUId === this.studentGUId);
    if (idx >= 0) {
      console.log('selecting specific row, studentGUId = ' + this.studentGUId);
      this.selectStudent(this.studentGUId, idx);
    } else {
      // left over student from other process, so set to zero and call again recursively
      this.studentGUId = '0000';
      this.selectInitialStudentAfterLoad();
    }
  }

  public selectStudent(studentGUId: string, idx: number) {
    console.log('student selected studentGUId: ' + studentGUId + 'idx: ' + idx);
    this.studentGUId = studentGUId;
    this.setRowClasses(this.students[idx].studentGUId, this.students[idx].activeStatus);
    // this.selectedStudent.notifyNewStudentGUId(studentGUId);
    this.store.dispatch(new SetSelectedStudentGUId(this.studentGUId))

  }

  // called from code (above) and from template
  public setRowClasses(studentGUId: string, activeStatus: number) {
    const classes = {
      'table-success': studentGUId === this.studentGUId,
      dimmed: activeStatus === 0,
      'student-row': true,
      clickable: true
    };

    return classes;
  }
}
