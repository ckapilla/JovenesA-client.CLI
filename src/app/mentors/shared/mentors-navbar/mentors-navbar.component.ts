import { Component } from '@angular/core';
import { SessionService } from '../../../app_shared/services/session.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  selector: 'mentors-navbar',
  templateUrl: './mentors-navbar.component.html',
  styleUrls: ['./mentors-navbar.component.css'],
})

export class MentorsNavbarComponent {
   currUserId: number;

  constructor(session: SessionService) {
    this.currUserId = session.getUserId();
    console.log('MentorsNav: ' + this.currUserId);

  }

}


