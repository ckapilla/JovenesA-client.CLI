import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './app_shared/services/auth.service';
import { SessionService } from './app_shared/services/session.service';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({

  selector: 'app-ja',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(
    private auth: AuthService,
    session: SessionService,
    router: Router
  ) {
    // if (session.getUserId() === 0) {
    //   auth.tryGetAuthResultFromStorage();
    // }
    // console.log('@@@@session: ' + session.getUserId());
    // router.events
    //   //.filter(e => e instanceof NavigationEnd || e instanceof NavigationError)
    //   .subscribe(e => {
    //     console.log('event: ', e);
    //   });
    // auth.handleAuthentication();
    console.log('AppComponentConstructor');
    auth.localAuthSetup();

  }
}
