
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDataService } from 'src/app/_shared/services/student-data.service';
import { constants } from '../../_shared/constants/constants';
import { StudentDTO } from '../../_shared/models/studentDTO';
import { SessionService } from '../../_shared/services/session.service';
@Component({

  templateUrl: './students-student-status.component.html',
  styleUrls: ['./students-student-status.component.css'],
})

export class StudentsStudentStatusComponent implements OnInit {
  smileys: string[];
  studentDTOs: StudentDTO;
  studentId: number;
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;

  constructor(
    public currRoute: ActivatedRoute,
    public studentData: StudentDataService,
    public router: Router,
    private session: SessionService
  ) {

    console.log('Hi from student List Ctrl controller function');

    this.smileys = constants.smileys;
    this.isLoading = false;
  }


  ngOnInit() {
    console.log('ngOnInit');
    // et id = this.currRoute.snapshot.params['id'];
    const id = this.session.getStudentId();
    console.log('stdudentStatus with studentId: ' + id);
    this.isLoading = true;
    this.studentData.getStudentDTO(id)
      .subscribe(
        data => { this.studentDTOs = data; },
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done'); this.isLoading = false; }
      );
  }
}
