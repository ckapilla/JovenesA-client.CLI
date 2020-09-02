import { Component } from '@angular/core';
import { AuthService } from './_shared/services/auth.service';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (BecasHomeComponent, AboutComponent).
 */
@Component({
  selector: 'app-ja',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(private auth: AuthService) {
    console.log('AppComponentConstructor, calling localAuthSetup');
    auth.localAuthSetup();
  }
}
