
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { SqlResource } from '../../app_shared/services/sql-resource';
import { SessionService } from '../../app_shared/services/session.service';

import { StudentDTO } from '../../app_shared/models/studentDTO';

interface SELECTITEM {
   value: string; label: string;
}

@Component({
  moduleId: module.id,
  selector: 'student-status',
  templateUrl: './students-student-status.component.html',
  styleUrls:  ['./students-student-status.component.css'],
})

export class StudentsStudentStatusComponent implements OnInit {
  smileys: string[];
  studentDTOs: StudentDTO;
  studentId: number;
  isLoading: boolean;

  constructor(
              public currRoute: ActivatedRoute,
              public sqlResource: SqlResource,
              public router: Router,
              private session: SessionService
              ) {

    console.log('Hi from student List Ctrl controller function');

    this.smileys = [ '/assets/images/frownSmiley.jpg',
                    '/assets/images/neutralSmiley.jpg',
                    '/assets/images/greenSmiley.jpg',
                    '/assets/images/NA.jpg'
                    ];
    this.isLoading = false;
  }


  ngOnInit() {
    console.log('ngOnInit');
    //et id = this.currRoute.snapshot.params['id'];
    let id = this.session.getStudentId();
    console.log('stdudentStatus with studentId: ' + id);
    this.isLoading = true;
    this.sqlResource.getStudentDTO(id)
      .subscribe(
        data => {this.studentDTOs = data;},
        err => console.error('Subscribe error: ' + err),
        () => { console.log('done'); this.isLoading = false;}
      );
  }
}
