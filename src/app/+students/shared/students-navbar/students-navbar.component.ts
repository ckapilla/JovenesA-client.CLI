import { Component } from '@angular/core';
//xximport { ROUTER_DIRECTIVES } from '@angular/router';
import { SessionService } from '../../../app_shared/services/session.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'students-navbar',
  templateUrl: './students-navbar.component.html',
  styleUrls: ['./students-navbar.component.css'],
  //xxdirectives: [ROUTER_DIRECTIVES]
})

export class StudentsNavbarComponent {
   currUserId: number;

  constructor(session: SessionService) {
    this.currUserId = session.getStudentId();
    console.log('StudentsNav: ' + this.currUserId);

  }

}



