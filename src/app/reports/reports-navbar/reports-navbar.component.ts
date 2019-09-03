import { Component } from '@angular/core';
import { SessionService } from '../../app_shared/services/session.service';

/**
 * This class represents the navigation bar component.
 */
@Component({

  selector: 'app-reports-navbar',
  templateUrl: './reports-navbar.component.html',
  styleUrls: ['./reports-navbar.component.css'],
  // xxdirectives: [ROUTER_DIRECTIVES]
})

export class ReportsNavbarComponent {
  currUserId: number;

  constructor(session: SessionService) {
    this.currUserId = session.getUserId();
    console.log('ReportsNav: ' + this.currUserId);

  }

}
