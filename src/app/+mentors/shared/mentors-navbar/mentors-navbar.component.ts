import { Component } from '@angular/core';
//xximport { ROUTER_DIRECTIVES } from '@angular/router';
import { SessionService } from '../../../app_shared/services/session.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'mentors-navbar',
  templateUrl: './mentors-navbar.component.html',
  styleUrls: ['./mentors-navbar.component.css'],
  //xxdirectives: [ROUTER_DIRECTIVES]
})

export class MentorsNavbarComponent {
   currUserId: number;

  constructor(session: SessionService) {
    this.currUserId = session.getUserId();
    console.log('MentorsNav: ' + this.currUserId);

  }

}



