import { Component } from '@angular/core';
import { SessionService } from '../../_shared/services/session.service';


@Component({

  selector: 'app-becas-navbar',
  templateUrl: 'becas-navbar.component.html',
  styleUrls: ['becas-navbar.component.css'],
})

export class BecasNavbarComponent {
  currUserId: number;

  constructor(session: SessionService) {
    this.currUserId = session.getUserId();
    console.log('BecasNavbar has userId: ' + this.currUserId);

  }

}
