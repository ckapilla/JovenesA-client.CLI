import { Component } from '@angular/core';
// import { AppRouting } from '../../app.routing';
import { AuthService } from '../_shared/services/auth.service';
import { SessionService } from '../_shared/services/session.service';
/**
 * This class represents the app-navbar component.
 */
@Component({

  selector: 'app-headerbar',
  templateUrl: 'headerbar.component.html',
  styleUrls: ['headerbar.component.css'],
})
export class HeaderbarComponent {
  constructor(public auth: AuthService,
    public session: SessionService
  ) {
    // console.log('***session: ' + session.getUserId());
  }

  public isAdminWithValidToken(): boolean {
    return this.auth.loggedIn && this.session.isAdmin();
  }

  public isMentorWithValidToken(): boolean {
    return this.auth.loggedIn && this.session.isMentor();
  }

  public isSponsorWithValidToken(): boolean {
    return this.auth.loggedIn && this.session.isSponsor();
  }

  public isStudentWithValidToken(): boolean {
    // use to force student status for testing only (BE CAREFUL!)
    // return true;
    return this.auth.loggedIn && this.session.getStudentId() !== 0;
  }
}
