import { Component } from '@angular/core';
import { Auth } from '../app_shared/services/auth.service';
/**
 * This class represents the lazy loaded StudentsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'ja-students',
  templateUrl: 'students.component.html',
  styleUrls: ['students.component.css']
})
export class StudentsComponent {

  constructor(public auth: Auth) {

  }
  public onLoginClick = ($event: Event) => {
        $event.preventDefault(); // don't navigate to href.
        this.auth.login();
  }

  public onLogoutClick = ($event: Event) => {
   	    console.log('onLogoutClick');
        $event.preventDefault(); // don't navigate to href.
        this.auth.logout();
  }

}
