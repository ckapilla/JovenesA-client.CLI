import { Component } from '@angular/core';
import './operators';
import { Router } from '@angular/router';
import { Auth } from './app_shared/services/auth.service';
import { SessionService } from './app_shared/services/session.service';
import { SqlResource } from './app_shared/services/sql-resource';
/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'app-ja',
  templateUrl: 'app.component.html'
})
export class AppComponent {

   constructor(
                private auth: Auth,
                session: SessionService,
                router: Router,
                sqlResource: SqlResource
                ) {
    // if (session.getUserId() === 0) {
    //   auth.restoreUserProfileFromLocalStorage();
    // }
    console.log('@@@@session: ' + session.getUserId());
    // router.events
    //   //.filter(e => e instanceof NavigationEnd || e instanceof NavigationError)
    //   .subscribe(e => {
    //     console.log('event: ', e);
    //   });

  }
}
