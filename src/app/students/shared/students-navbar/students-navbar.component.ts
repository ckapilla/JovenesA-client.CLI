import { Component } from '@angular/core';
import { SessionService } from '../../../app_shared/services/session.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'app-students-navbar',
  templateUrl: './students-navbar.component.html',
  styleUrls: ['./students-navbar.component.css'],
})

export class StudentsNavbarComponent {
  currStudentId: number;

  constructor(session: SessionService) {
    this.currStudentId = session.getStudentId();
    console.log('StudentsNav: ' + this.currStudentId);

  }

}
