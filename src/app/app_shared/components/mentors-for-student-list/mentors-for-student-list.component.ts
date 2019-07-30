import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Mentor} from '../../models/mentor';
import { SessionService } from '../../services/session.service';
import { SqlResource } from '../../services/sql-resource.service';

@Component({
  selector: 'app-mentors-for-student-list',
  templateUrl: './mentors-for-student-list.component.html'
})

export class MentorsForStudentListComponent implements OnInit {
  mentors: Array<Mentor>;
  errorMessage = '';
  @Input() studentId: number;

  constructor(public session: SessionService,
            private sqlResource: SqlResource) {

    console.log('in MentorsForStudentComponent constructor with studentId=' + this.studentId);
  }

  public ngOnInit() {
    this.sqlResource.getMentorsForStudent(this.studentId)
      .subscribe(
        data => { this.mentors = data; console.log('getMentorsForStudent'); console.log(this.mentors[0]); },
        err => console.error('Subscribe error: ' + err),
        () => {
          console.log('mentors-for-student-list loaded ' + this.mentors.length + ' rows');
        }
      );
  }

}
