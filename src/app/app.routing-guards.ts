import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { MentorReportSummaryUpdatesComponent } from './admins/admins-mr/mr-summary-updates/mr-summary-updates.component';
import { AdminsStudentComponent } from './admins/admins-students/admins-student-profile/admins-student-student-profile.component';
import { GradesEditComponent } from './becas/grades-edit/grades-edit.component';
import { MonthlyReports2ENAddComponent } from './mentors/monthly-reports2-EN-add/monthly-reports2-EN-add.component';
import { MonthlyReports2ESAddComponent } from './mentors/monthly-reports2-ES-add/monthly-reports2-ES-add.component';
import { AuthService } from './_shared/services/auth.service';
import { SessionService } from './_shared/services/session.service';

@Injectable({ providedIn: 'root' })
export class CanActivateViaAdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) {}

  canActivate(next: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
    console.log('canActivate for Admin AuthGuard with url' + routerState.url);
    if (this.auth.loggedIn) {
      console.log('Can Activate Admin 1');
      if (this.session.isAdmin()) {
        console.log('Authenticated and Can Activate Admin');
        return true;
      } else {
        console.log('Authenticated but unauthorized for Admin');
        return false;
      }
    } else {
      console.log('Not authenticated -- Can\'t Activate Admin');
      this.router.navigate([ '' ]); // just to clean up url bar
      this.auth.login(routerState.url);
      return false;
    }
  }
}
@Injectable({ providedIn: 'root' })
export class CanActivateViaMentorAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) {}

  canActivate(next: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
    console.log('canActivate for /mentors');
    if (this.auth.loggedIn) {
      // following has issue of race condition with callback to get profile
      if (this.session.isMentor()) {
        console.log('Authenticated and Can Activate Mentor');
        return true;
      } else {
        return false;
      }
    } else {
      console.log('link to Mentor but not authenticated -- save /mentors retry url:');
      this.router.navigate([ '' ]); // just to clean up URL bar
      this.auth.login(routerState.url);

      return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class CanActivateViaSponsorAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) {}

  canActivate(next: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
    console.log('canActivate for /sponsors');
    if (this.auth.loggedIn) {
      // following has issue of race condition with callback to get profile
      if (this.session.isSponsor()) {
        console.log('Authenticated and Can Activate Sponsor');
        return true;
      } else {
        return false;
      }
    } else {
      console.log('link to Sponsor but not authenticated -- save /sponsors retry url:');
      this.router.navigate([ '' ]); // just to clean up URL bar
      this.auth.login(routerState.url);

      return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class CanActivateViaStudentAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private session: SessionService) {}

  canActivate(next: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
    console.log('canActivate for /students');
    if (this.auth.loggedIn) {
      // following has issue of race condition with callback to get profile
      if (this.session.isStudent()) {
        console.log('Authenticated and Can Activate Student');
        return true;
      } else {
        console.log('Authenticated but unauthorized for Student');
        return false;
      }
    } else {
      console.log('link to Mentor but not authenticated -- save /students retry url:');
      this.router.navigate([ '' ]); // just to clean up URL bar
      this.auth.login(routerState.url);

      return false;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateMonthlyReportAddGuard implements CanDeactivate<MonthlyReports2ESAddComponent> {
  canDeactivate(component: MonthlyReports2ESAddComponent): boolean {
    if (component.hasChanges()) {
      console.log('CanDeactivate');
      // tslint:disable-next-line:max-line-length
      return window.confirm(
        'You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar'
      );
    }
    return true;
  }
}
@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateMonthlyReportENAddGuard implements CanDeactivate<MonthlyReports2ENAddComponent> {
  canDeactivate(component: MonthlyReports2ENAddComponent): boolean {
    if (component.hasChanges()) {
      console.log('CanDeactivate');
      // tslint:disable-next-line:max-line-length
      return window.confirm(
        'You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar'
      );
    }
    return true;
  }
}


@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateMRSummaryUpdatesGuard implements CanDeactivate<MentorReportSummaryUpdatesComponent> {
  canDeactivate(component: MentorReportSummaryUpdatesComponent): boolean {
    if (component.hasChanges()) {
      console.log('CanDeactivate');
      // tslint:disable-next-line:max-line-length
      return window.confirm(
        'You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar'
      );
    }
    console.log('CanDeactivate for MRSummaryUpdates clearing unauthenticate_retry+url');
    localStorage.removeItem('unauthenticated_retry_url');
    return true;
  }
}

// see https://stackoverflow.com/questions/68299992/how-to-use-can-deactivate-without-routing
@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateStudentProfileUpdatesGuard implements CanDeactivate<AdminsStudentComponent> {
  canDeactivate(component: AdminsStudentComponent): boolean {
    console.log('XXXXXXXXXXXCanDeactivate');
    if (component.hasChanges instanceof Function) {
      console.log('XXXXXXXXXXXCanDeactivate2');
      if (component.hasChanges()) {
        console.log('CanDeactivate');
        // tslint:disable-next-line:max-line-length
        return window.confirm(
          'You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar'
        );
      }
    }
    console.log('CanDeactivate for StudentProfile clearing unauthenticate_retry+url');
    localStorage.removeItem('unauthenticated_retry_url');
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class ConfirmDeactivateGradesEditGuard implements CanDeactivate<GradesEditComponent> {
  canDeactivate(component: GradesEditComponent): boolean {
    if (component.hasChanges()) {
      console.log('CanDeactivate');
      // tslint:disable-next-line:max-line-length
      return window.confirm(
        'You have unsaved changes. Click OK to leave the page without saving.\nTiene cambios no guardados. Haga clic OK para salir de la página sin guardar'
      );
    }
    console.log('CanDeactivate for GradesEdit clearing unauthenticate_retry+url');
    localStorage.removeItem('unauthenticated_retry_url');
    return true;
  }
}
