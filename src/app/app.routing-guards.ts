import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { MentorReportSummaryUpdatesComponent } from './admins/mr-summary-updates/mr-summary-updates.component';
import { GradesEditComponent } from './becas/grades-edit/grades-edit.component';
import { MonthlyReports2AddComponent } from './mentors/monthly-reports2-add/monthly-reports2-add.component';
import { AuthService } from './_shared/services/auth.service';
import { SessionService } from './_shared/services/session.service';

@Injectable({ providedIn: 'root' })
export class CanActivateViaAdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('canActivate for Admin AuthGuard with url' + state.url);
    if (this.auth.loggedIn) {
      console.log('Can Activate Admin 1');
      if (this.session.isAdmin()) {
        console.log('Authenticated and Can Activate Admin');
        return true;
      } else {
        console.log('Authenticated but unauthorized for Admin');
        // localStorage.setItem('unauthenticated_retry_url', state.url);
        // '/admins/mentor-reports/summary-tracking?id=id2681&year=2018&month=6&summaryStatus=0&highlight=2109');
        // this.router.navigate(['unauthorized']);
        return false;
      }
    } else {
      console.log('Not authenticated -- Can\'t Activate Admin');
      // localStorage.setItem('unauthenticated_retry_url', state.url);
      //  '/admins/mentor-reports/summary-tracking?id=id2681&year=2018&month=6&summaryStatus=0&highlight=2109');
      this.router.navigate(['']); // just to clean up url bar
      this.auth.login(state.url);
      return false;
    }
  }
}
@Injectable({ providedIn: 'root' })
export class CanActivateViaMentorAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('canActivate for /mentors');
    if (this.auth.loggedIn) {
      // following has issue of race condition with callback to get profile
      if (this.session.isMentor()) {
        console.log('Authenticated and Can Activate Mentor');
        return true;
      } else {
        // console.log('Authenticated but unauthorized for Mentor');
        // if this is on startup, will need to try navigate again after profile is loaded
        // this.session.setFailedAuthorizationRoute('mentors');
        // localStorage.setItem('unauthenticated_retry_url', state.url); // '/mentors');
        // this.router.navigate(['']);
        return false;
      }
    } else {
      console.log('link to Mentor but not authenticated -- save /mentors retry url:');
      // localStorage.setItem('unauthenticated_retry_url', state.url); // '/mentors');
      this.router.navigate(['']); // just to clean up URL bar
      this.auth.login(state.url);

      return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class CanActivateViaSponsorAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('canActivate for /sponsors');
    if (this.auth.loggedIn) {
      // following has issue of race condition with callback to get profile
      if (this.session.isSponsor()) {
        console.log('Authenticated and Can Activate Sponsor');
        return true;
      } else {
        // console.log('Authenticated but unauthorized for Mentor');
        // if this is on startup, will need to try navigate again after profile is loaded
        // this.session.setFailedAuthorizationRoute('mentors');
        // localStorage.setItem('unauthenticated_retry_url', state.url); // '/mentors');
        // this.router.navigate(['']);
        return false;
      }
    } else {
      console.log('link to Sponsor but not authenticated -- save /sponsors retry url:');
      // localStorage.setItem('unauthenticated_retry_url', state.url); // '/mentors');
      this.router.navigate(['']); // just to clean up URL bar
      this.auth.login(state.url);

      return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class CanActivateViaStudentAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('canActivate for /students');
    if (this.auth.loggedIn) {
      // following has issue of race condition with callback to get profile
      if (this.session.isStudent()) {
        console.log('Authenticated and Can Activate Student');
        return true;
      } else {
        console.log('Authenticated but unauthorized for Student');
        // if this is on startup, will need to try navigate again after profile is loaded
        // this.session.setFailedAuthorizationRoute('mentors');
        // localStorage.setItem('unauthenticated_retry_url', state.url); // '/students');
        // this.router.navigate(['']);
        return false;
      }
    } else {
      console.log('link to Mentor but not authenticated -- save /students retry url:');
      // localStorage.setItem('unauthenticated_retry_url', state.url); // '/students');
      this.router.navigate(['']); // just to clean up URL bar
      this.auth.login(state.url);

      return false;
    }
  }

}

@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateMonthlyReportAddGuard
  implements CanDeactivate<MonthlyReports2AddComponent> {

  canDeactivate(component: MonthlyReports2AddComponent): boolean {
    if (component.hasChanges()) {
      console.log('CanDeactivate');
      // tslint:disable-next-line:max-line-length
      return window.confirm('You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar');
    }
    return true;
  }
}
@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateMRSummaryUpdatesGuard
  implements CanDeactivate<MentorReportSummaryUpdatesComponent> {

  canDeactivate(component: MentorReportSummaryUpdatesComponent): boolean {
    if (component.hasChanges()) {
      console.log('CanDeactivate');
      // tslint:disable-next-line:max-line-length
      return window.confirm('You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar');
    }
    console.log('CanDeactivate for MRSummaryUpdates clearing unauthenticate_retry+url');
    localStorage.removeItem('unauthenticated_retry_url');
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateGradesEditGuard
  implements CanDeactivate<GradesEditComponent> {

  canDeactivate(component: GradesEditComponent): boolean {
    if (component.hasChanges()) {
      console.log('CanDeactivate');
      // tslint:disable-next-line:max-line-length
      return window.confirm('You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar');
    }
    console.log('CanDeactivate for GradesEdit clearing unauthenticate_retry+url');
    localStorage.removeItem('unauthenticated_retry_url');
    return true;
  }
}
