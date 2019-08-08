import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { of } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { SqlResource } from '../../app_shared/services/sql-resource.service';
import { AUTH_CONFIG } from './auth0-config';
import { SessionService } from './session.service';
import { UrlService } from './url.service';

(window as any).global = window;

@Injectable()
export class AuthService {
  userProfile: Object;
  authResult: Object;
  expiresAt: string;
  email: string;
  nickname: string;
  authenticated: boolean;

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: this.urlService.getClientUrl(), //  AUTH_CONFIG.redirectUri,
    scope: 'openid '
  });

  constructor(public router: Router,
    public urlService: UrlService,
    public session: SessionService,
    public sqlResource: SqlResource) {
    // if not authenticated, check to see if we have a saved profile
    if (session.getUserId() === 0) {
      console.log('no current session so check for stored authResult');
      this.checkRestoreSavedAuthData();
    }
  }
  private checkRestoreSavedAuthData() {
    this.authResult = this.checkRestoreAuthResult();
    if (this.authResult) {
      console.log('checkRestore with expiresAt: ');
      this.expiresAt = localStorage.getItem('expires_at');
      console.log(this.expiresAt);
      console.log('checkRestore has saved authResult:');
      console.log(this.authResult);
      this.extractUserProfileFromAuthResult(this.authResult);
    } else {
      console.log('no stored AuthResult');
    }
  }

  public login(): void {
    console.log('login Redirect to the Auth0 universal /authorize endpoint');
    this.auth0.authorize({
      scope: 'profile email'
    });
  }

  public handleAuthentication(): void {
    console.log('calling ParseHash');
    this.auth0.parseHash((err, _authResult) => {
      console.log('in parseHash callBack with authResult' + _authResult);
      if (_authResult && _authResult.accessToken && _authResult.idToken) {
        console.log('in parseHash with authResult tokens');
        this.authenticated = true;
        this.setSession(_authResult);
        this.storeAuthResultToStorage(_authResult);
        this.extractUserProfileFromAuthResult(_authResult);
        window.location.hash = '';
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at



    console.log('successful Login set expires_at to ');

    this.expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    console.log(this.expiresAt);

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', this.expiresAt);
    // console.log('in SetSession with Result idToken ' + authResult.idToken);
    // console.log('in SetSession with Result accessToken' + authResult.accessToken);
    // console.log('in SetSession with Result expiresAt' + this.expiresAt);

  }



  private storeAuthResultToStorage(authResult: any) {
    console.log('saving authResult to storage');
    localStorage.setItem('authResult', JSON.stringify(authResult));
  }

  public checkRestoreAuthResult(): any {
    console.log('in checkRestoreAuthResult with' + JSON.parse(localStorage.getItem('authResult')));
    return JSON.parse(localStorage.getItem('authResult'));
  }

  private extractUserProfileFromAuthResult(authResult: any) {
    // Call get userInfo with the token in authResult
    // console.log('in extractUserProfileFromAuthResult');
    // console.log('calling userInfo with authResult.accessToken')
    this.auth0.client.userInfo(authResult.accessToken, (err: any, profile: any) => {
      // console.log('userInfo Callback')

      if (err) {
        // Handle error
        console.log(err);
        return;
      }
      console.log('in userInfo Callback with profile>>');
      if (this.isTokenUnexpired()) {
        console.log('Token Unexpired, so set Session with Profile');
        // this.saveProfileToLocalStorage(profile);
        this.setUserProfileElementsToSession(profile);
      } else {
        console.log('getUserInfo with token expired');
      }

      // if (this.session.getFailedAuthorizationRoute()  > '') {
      //   console.log('have failed authorization route, retrying ');
      //   this.router.navigateByUrl(this.session.getFailedAuthorizationRoute());
      // }

      // Redirect to retryUrl if there is a saved url that has been set
      console.log('before checkForUnauthenticateRetryUrl');
      this.checkForUnauthenticateRetryUrl();
      this.UpdateLastLogin();
    });
  }

  private checkForUnauthenticateRetryUrl() {
    const retryUrl: string = localStorage.getItem('unauthenticated_retry_url');
    console.log('checkForUnauthenticateRetryUrl has retryUrl ' + retryUrl);
    if (retryUrl) {
      console.log('navigating to unauthenticated_retry_url: ' + retryUrl);
      this.router.navigateByUrl(retryUrl);
      console.log('');
      localStorage.removeItem('unauthenticated_retry_url');
    }
  }

  // private saveProfileToLocalStorage(profile: any) {
  //   console.log('###setting AUth0 profile to local storage');
  //   localStorage.setItem('profile', JSON.stringify(profile));
  //   this.userProfile = profile;
  // }

  // with angular router we need to not do autoParse
  // and to interupt router proccessing and complete the parse ourselves
  // https://github.com/auth0/lock/pull/790
  // see https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/issues/40
  public handleAuthenticationWithHashXXXX() {
    console.log('in handleRedirectWithAuthHash');
    this.router.events.pipe(
      filter(event => event.constructor.name === 'NavigationStart'),
      filter(event => (/access_token|id_token|error/).test(event['url'])
      ),
      catchError(err => of('Auth Error'))
    ).subscribe(event => {
      console.log('in handleRedirectWithAuthHash subscribe event with hash ' + window.location.hash);
      const authResult = this.auth0.parseHash(window.location.hash);
      // use following in conjunction with autoParseHash: false option setting
      this.auth0.resumeAuth(window.location.hash, (error, _authResult) => {
        if (_authResult && _authResult.idToken) {
          console.log('resumeAuthh successfully authenticated');
          // this.lock.emit('authenticated', authResult);
        }
        if (_authResult && _authResult.error) {
          this.auth0.emit('authorization_error', _authResult);
        }
      });
    });
  }

  public setUserProfileElementsToSession(userProfile: any): void {
    console.log('in extractElementsFromProfile with userProfile:');
    console.log(userProfile);
    if (userProfile !== null && userProfile !== undefined) {
      const app_metadata = (<any>userProfile)['app_metadata'];
      this.session.setAdminStatus((<any>app_metadata)['adminStatus']);
      console.log('isAdmin: ' + this.session.isAdmin());

      this.session.setMentorStatus((<any>app_metadata)['mentorStatus']);
      console.log('isMentor: ' + this.session.isMentor());

      this.session.setStudentId((<any>app_metadata)['studentId']);
      console.log('studentId: ' + this.session.getStudentId());

      this.session.setUserId((<any>userProfile)['user_id'].substr('auth0|'.length));
      console.log('userId: ' + this.session.userId);

      this.email = (<any>userProfile)['email'];
      this.nickname = (<any>userProfile)['nickname'];
    }
  }

  public UpdateLastLogin(): void {
    // console.log('calling SqlResource UpdateLastLogin with useId' + this.session.userId);
    this.sqlResource.UpdateLastLogin(this.session.userId)
      .subscribe(
        data => {/*console.log('');*/ },
        err => console.error('last login Subscribe error: ' + err),
        () => { }
      );
  }


  public logout(): void {
    console.log('in logout');
    // from sample:
    // Remove tokens and expiry time from localStorage
    localStorage.clear();

    // Go back to the home route
    this.router.navigate(['/']);
    // from prev code:

    this.session.setAdminStatus(undefined);
    this.session.setMentorStatus(undefined);
    this.session.setSponsorStatus(undefined);
    this.session.setStudentId(undefined);

    this.authResult = undefined;
    this.userProfile = undefined;
    // this.router.navigate(['']);
    console.log('return to address: ' + 'https://ckapilla.auth0.com/v2/logout?returnTo=' + this.urlService.getClientUrl());
    setTimeout(() => {
      console.log('in timeout callback with return to address ' +
        'https://ckapilla.auth0.com/v2/logout?returnTo=' + this.urlService.getClientUrl());
      document.location.href =
        'https://ckapilla.auth0.com/v2/logout?returnTo=' + this.urlService.getClientUrl();
    }
      , 50);
  }

  private isTokenUnexpired(): boolean {
    // abort if not set or not authenticated
    if (!this.expiresAt) { // || !this.authenticated) {
      // console.log('isTokenUnexpired has null');
      return false;
    } else {
      const now: string = new Date().getTime() + '';
      // console.log('isTokenUnexpired num has ' + now + ' ' + this.expiresAt);
      const isNotExpired = this.expiresAt > now;
      return isNotExpired;
    }
  }

  public isAuthenticated(): boolean {
    return this.isTokenUnexpired();
  }

}
