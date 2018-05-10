import { Component } from '@angular/core';
import { SessionService } from '../../../app_shared/services/session.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'students-navbar',
  templateUrl: './students-navbar.component.html',
  styleUrls: ['./students-navbar.component.css'],
})

export class StudentsNavbarComponent {
   currUserId: number;

  constructor(session: SessionService) {
    this.currUserId = session.getStudentId();
    console.log('StudentsNav: ' + this.currUserId);

  }

}



