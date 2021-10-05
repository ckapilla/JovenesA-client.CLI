import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UIState } from 'src/app/_store/ui/ui.state';
import { MentorDataService } from '../../data/mentor-data.service';
import { StudentDTO } from '../../models/studentDTO';
import { SessionService } from '../../services/session.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'students-for-mentor-list',
  templateUrl: './students-for-mentor-list.component.html'
})
export class StudentsForMentorListComponent implements OnInit {
  students: Array<StudentDTO>;
  smileys: Array<string> = [];
  studentId: number;
  errorMessage = '';
  haveData: boolean;
  mentorGUId: string;
  mentorId: number;
  studentGUId: string;
  displayTestNames: boolean;

  @Select(UIState.getTestNamesVisibility) testNameVisibility$: Observable<boolean>;

  constructor(
    public session: SessionService,
    private mentorData: MentorDataService,
    private router: Router,
    private currRoute: ActivatedRoute
  ) {
    console.log('in MentoredStudentComponent constructor XXXXXXXXXXXXXXXXXXXXX');
  }

  public ngOnInit() {
    this.haveData = false;
    this.mentorGUId = this.currRoute.snapshot.params['guid'];
    this.mentorData.getStudentsForMentorByGUId(this.mentorGUId).subscribe(
      (data) => {
        this.students = this.students = data.filter((item) => {
          if (this.displayTestNames) {
            return item;
          } else if (!this.displayTestNames && item.studentName.substr(0,5) !== '_Test, _Student') {
            return item;
          }
        });
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('studentsForMentorList has All students: ' + this.students.length);
        if (this.students.length > 0) {
          console.log(this.students[0].studentName);
          console.log(this.students[0].studentGUId);
          this.haveData = true;
        } else {
          //
        }
      }
    );
  }
  gotoStudent(GUId: number) {
    const link = 'admins/students/student-container;guid=' + GUId;

    console.log('navigating to ' + link);
    this.router.navigateByUrl(link);
  }
  mentorReportsReview() {
    // const guid = this.currRoute.snapshot.params['guid'];
    this.router.navigate([
      '/admins/students/student/mentorReports/',
      { mentorId: this.mentorId, mentorGUId: this.mentorGUId, studentGUId: this.studentGUId }
    ]);
  }
}
