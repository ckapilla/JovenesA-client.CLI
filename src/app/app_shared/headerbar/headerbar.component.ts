import { Component } from '@angular/core';
//import { AppRouting } from '../../app.routing';

import { Auth } from '../services/auth.service';
import { SessionService } from '../services/session.service';
/**
 * This class represents the headerbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'ja-headerbar',
  templateUrl: 'headerbar.component.html',
  styleUrls: ['headerbar.component.css'],
})
export class HeaderbarComponent {
     constructor( public auth: Auth,
                  public session: SessionService
                  ) {
        //console.log('***session: ' + session.getUserId());
     }

     public isAdminWithValidToken(): boolean {
       return this.auth.isAuthenticated() && this.session.isAdmin();
     }

     public isMentorWithValidToken(): boolean {
       return this.auth.isAuthenticated() && this.session.isMentor();
     }

     public isStudentWithValidToken(): boolean {
       return this.auth.isAuthenticated() && this.session.getStudentId() !== 0;
     }
}
