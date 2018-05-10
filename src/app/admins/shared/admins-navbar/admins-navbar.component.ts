import { Component } from '@angular/core';
import { SessionService } from '../../../app_shared/services/session.service';

/**
 * This class represents the navigation bar component.
 */
@Component({

  // tslint:disable-next-line:component-selector
  selector: 'admins-navbar',
  templateUrl: 'admins-navbar.component.html',
  styleUrls: ['admins-navbar.component.css'],
})

export class AdminsNavbarComponent {
  currUserId: number;

  constructor(session: SessionService) {
    this.currUserId = session.getUserId();
    console.log('AdminsNavbar has userId: ' + this.currUserId);

  }

}
