import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetSelectedStudentGUId } from 'src/app/_store/student/student.action';
import { StudentState } from 'src/app/_store/student/student.state';
import { UIState } from 'src/app/_store/ui/ui.state';
import { constants } from '../../constants/constants';
import { SponsorGroupDataService } from '../../data/sponsor-group-data.service';
import { StudentSponsorXRef } from '../../models/student-sponsor-xref';
import { SessionService } from '../../services/session.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'students-for-sponsor-grid',
  templateUrl: './students-for-sponsor-grid.component.html'
})
export class StudentsForSponsorGridComponent implements OnInit {
  students: Array<StudentSponsorXRef>;
  emojis: Array<string> = [];
  studentGUId: string;
  errorMessage = '';
  displayTestNames: boolean;

  @Select(StudentState.getSelectedStudentGUId) currentGUId$: Observable<string>;
  @Select(UIState.getTestNamesVisibility) testNameVisibility$: Observable<boolean>;

  constructor(public session: SessionService, private sponsorGroupData: SponsorGroupDataService, private store: Store) {
    this.emojis = constants.emojis;
    this.testNameVisibility$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
  }

  public ngOnInit() {
    this.sponsorGroupData.getStudentsForSponsorByGUId(this.session.getUserGUId()).subscribe(
      (data) => {
        this.students = data.filter((item) => {
          if (this.displayTestNames) {
            return item;
          } else if (!this.displayTestNames && item['studentName'] !== '_Test, _Student') {
            return item;
          }
        });
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('studentsForSponsorGrid has All students: ' + this.students.length);
        console.log(this.students);
        if (this.students.length > 0) {
          this.selectFirstRow();
        } else {
          this.errorMessage = 'No students are assigned at this time. / No hay estudiantes asignado en este momento';
        }
      }
    );
  }

  selectFirstRow() {
    console.log('First row Id is ' + this.students[0].studentGUId + ' ' + this.students[0].studentName); // + ' ' + this.students[0].studentLastNames );
    this.setRowClasses(this.students[0].studentGUId);
    this.selectStudent(this.students[0].studentGUId, 0);
  }

  public selectStudent(studentGUId: string, idx: number) {
    console.log('student selected studentGUId: ' + studentGUId + 'idx: ' + idx);
    this.studentGUId = studentGUId;
    this.store.dispatch(new SetSelectedStudentGUId(this.studentGUId));
  }

  public setRowClasses(studentGUId: string) {
    const classes = {
      'table-success': studentGUId === this.studentGUId,
      'student-row': true,
      clickable: true
    };
    return classes;
  }
}
