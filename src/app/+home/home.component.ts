import { Component } from '@angular/core';
import { AuthService } from '../app_shared/services/auth.service';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {

  constructor(public auth: AuthService) {

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
