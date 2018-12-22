import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './app_shared/services/auth.service';
import { SessionService } from './app_shared/services/session.service';
import { MonthlyReportsAddComponent } from './mentors/index';
import { MentorReportsSummaryTrackingComponent } from './admins/index';

@Injectable({ providedIn: 'root' })
export class CanActivateViaAdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('canActivate for Admin AuthGuard with url' + state.url);
    if (this.auth.isAuthenticated()) {
      console.log('Can Activate Admin 1');
      if (this.session.isAdmin()) {
        console.log('Authenticated and Can Activate Admin');
        return true;
      } else {
        console.log('Authenticated but unauthorized for Admin');
        localStorage.setItem('unauthenticated_retry_url', state.url);
        // '/admins/mentor-reports/summary-tracking?id=id2681&year=2018&month=6&summaryStatus=0&highlight=2109');
        // this.router.navigate(['unauthorized']);
        return false;
      }
    } else {
      console.log('Not authenticated -- Can\'t Activate Admin');
      localStorage.setItem('unauthenticated_retry_url', state.url);
      //  '/admins/mentor-reports/summary-tracking?id=id2681&year=2018&month=6&summaryStatus=0&highlight=2109');
      this.router.navigate(['']); // just to clean up url bar
      this.auth.login();
      return false;
    }
  }
}
@Injectable({ providedIn: 'root' })
export class CanActivateViaMentorAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('canActivate for /mentors');
    if (this.auth.isAuthenticated()) {
      // following has issue of race condition with callback to get profile
      if (this.session.isMentor()) {
        console.log('Authenticated and Can Activate Mentor');
        return true;
      } else {
        console.log('Authenticated but unauthorized for Mentor');
        // if this is on startup, will need to try navigate again after profile is loaded
        // this.session.setFailedAuthorizationRoute('mentors');
        localStorage.setItem('unauthenticated_retry_url', state.url); // '/mentors');
        // this.router.navigate(['']);
        return false;
      }
    } else {
      console.log('link to Mentor but not authenticated -- save /mentors retry url:');
      localStorage.setItem('unauthenticated_retry_url', state.url); // '/mentors');
      this.router.navigate(['']); // just to clean up URL bar
      this.auth.login();

      return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class CanActivateViaStudentAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.auth.isAuthenticated()) {
      if (this.session.isStudent()) {
        console.log('Authenticated and Can Activate Student');
        return true;
      } else {
        console.log('Authenticated but unauthorized for Student');
        // if this is on startup, will need to try navigate again after profile is loaded
        // this.session.setFailedAuthorizationRoute('students');
        localStorage.setItem('unauthenticated_retry_url', '/students');
        return false;
      }
    } else {
      console.log('link to Student but not authenticated -- need login');
      localStorage.setItem('unauthenticated_retry_url', '/students');
      // this.auth.login();
      return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateMonthlyReportAddGuard
      implements CanDeactivate<MonthlyReportsAddComponent> {

  canDeactivate(component: MonthlyReportsAddComponent): boolean {
    if  (component.hasChanges()) {
      console.log('CanDeactivate');
      // tslint:disable-next-line:max-line-length
      return window.confirm('You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar');
    }
    return true;
  }
}
@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateSummaryTrackingGuard
      implements CanDeactivate<MentorReportsSummaryTrackingComponent> {

  canDeactivate(component: MentorReportsSummaryTrackingComponent): boolean {
    console.log('CanDeactivate for Admins clearing unauthenticate_retry+url');
    localStorage.removeItem('unauthenticated_retry_url');
    return true;
  }
}
