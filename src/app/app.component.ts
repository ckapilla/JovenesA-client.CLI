import { Component } from '@angular/core';
import { Config } from './app_shared/index';
import './operators';
import { Router } from '@angular/router';
import { Auth } from './app_shared/services/auth.service';
import { SessionService } from './app_shared/services/session.service';


/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'ja-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {

   constructor(
                private auth: Auth,
                session: SessionService,
                router: Router
                ) {
    if (session.getUserId() === 0) {
      auth.restoreUserProfile();
    }
    console.log('@@@@session: ' + session.getUserId());
    console.log('Environment config', Config);
    // router.events
    //   //.filter(e => e instanceof NavigationEnd || e instanceof NavigationError)
    //   .subscribe(e => {
    //     console.log('event: ', e);
    //   });

  }
}
