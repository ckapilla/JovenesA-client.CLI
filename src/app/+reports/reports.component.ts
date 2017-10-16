import { Component } from '@angular/core';
import { AuthService } from '../app_shared/services/auth.service';
/**
 * This class represents the lazy loaded ReportsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'app-reports',
  templateUrl: 'reports.component.html',
  styleUrls: ['reports.component.css']
})
export class ReportsComponent {

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
