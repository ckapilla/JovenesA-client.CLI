import { Component } from '@angular/core';
// import { AppRouting } from '../../app.routing';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';
/**
 * This class represents the headerbar component.
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

  public isStudentWithValidToken(): boolean {
    return this.auth.loggedIn && this.session.getStudentId() !== 0;
  }
}
