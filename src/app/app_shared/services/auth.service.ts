// auth.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { SqlResource } from '../../app_shared/services/sql-resource';
import 'rxjs/add/operator/take';
import { AUTH_CONFIG, LOCK_DICTIONARY } from './auth0-config';
import { UrlService } from './url.service';

// Avoid name not found warnings
declare var Auth0Lock: any;
declare var Auth0: any;

@Injectable()
export class AuthService {

  userProfile: Object;
  authResult: Object;
  // zoneImpl: NgZone;
  // adminStatus: number;
  // mentorStatus: number;
  // studentId: number;
  // sponsorStatus: number;
  expiresAtDt: string;
  expiresAtNum: number;
  email: string;
  nickname: string;
  authenticated: boolean;
  lock: any;


  constructor(
    // zone: NgZone,
    private router: Router,
    public urlService: UrlService,
    public session: SessionService,
    public sqlResource: SqlResource) {

    console.log('Auth constructor before stored token check');
    this.authenticated = false;
    this.session = session;
    this.sqlResource = sqlResource

    // if not authenticated, check to see if we have a saved profile
    if (session.getUserId() === 0) {
      console.log('no current session so check for stored authResult');
      this.checkRestoreSavedAuthData();
    }
    console.log('@@@@session: ' + session.getUserId());

    this.lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
      theme: {
        logo: urlService.getClientUrl() + '/assets/images/JovenesLogo.png',
        primaryColor: '#106cc8',
      },
      languageDictionary: LOCK_DICTIONARY,
      // force Lock to use Auth0's new (2017) authentication pipeline
      // oidcConformant: true,
      auth: {
        params: {  },
        scope: 'openid email',
        // with this, use lock.resumeAuth in handleRedirectWithHash:
        // autoParseHash: false
        redirect: true,
        redirectUrl: urlService.getClientUrl(),
        responseType: 'token',
      //   sso:false
      }
    }); // end new lock

    this.lock.on('authorization_error', (auth_error: any) => {
      console.log('authorization_error event received');
    });

    // authResult contains: accessToken, idToken, state, refreshToken and idTokenPayload.
    this.lock.on('authenticated', (authResult: any) => {
      console.log('got authenticated event!');
      this.storeAuthResultToStorage(authResult);

      this.authenticated = true;
      this.extractExpireDtFromAuthResult(authResult);
      this.retrieveAndExtractUserProfile(authResult);

      // instead of doing navigate retries here,
      // the need to be done in the above retrieveAndExtract callback

    });

    // this.handleAuthenticationWithHash();
  }  // end constructor


  public login() {
    // Show the Auth0 Lock widget
    this.lock.show();
  }

/*
  checkRestore saved Auth Data from local storage
*/

  private checkRestoreSavedAuthData() {
    this.authResult = this.checkRestoreAuthResult();
    if (this.authResult) {
      console.log('checkRestore has saved authResult:');
      // console.log(this.authResult);
      this.extractExpireDtFromAuthResult(this.authResult);
      this.userProfile = this.checkRestoreProfile();
      if (this.userProfile) {
        console.log('checkRestore has saved userProfile');
        // console.log(this.userProfile);
        this.extractElementsFromUserProfile(this.userProfile);
        this.authenticated = true;
      }
    }
  }

  private storeAuthResultToStorage(authResult: any) {
    localStorage.setItem('authResult', JSON.stringify(authResult));
  }

  public checkRestoreAuthResult(): any {
    return JSON.parse(localStorage.getItem('authResult'));
  }

  public checkRestoreUserProfile(): void {
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
  }

  private extractExpireDtFromAuthResult(authResult: any) {

      // console.log('idToken>>>');
      // console.log(authResult.idToken);
      // console.log('accessToken>>>');
      // console.log(authResult.accessToken);
    // console.log('authResult idTokenPayload');
    // console.log(authResult.idTokenPayload);
    // console.log('authResult aud');
    // console.log(authResult.idTokenPayload.aud);

    if (authResult.idTokenPayload) {
      this.expiresAtNum = (authResult.idTokenPayload.exp * 1000);
      this.expiresAtDt = '' + (new Date(authResult.idTokenPayload.exp * 1000));
      console.log('authResult ExpiresAt:');
      console.log(this.expiresAtDt);
    }

  }

  private retrieveAndExtractUserProfile(authResult: any) {
    // Call get userInfo with the token in authResult
    console.log('calling lock.getUserInfo');
    this.lock.getUserInfo(authResult.accessToken, (error: any, profile: any) => {
      if (error) {
        // Handle error
        console.log(error);
        return;
      }
      // use token to call getUserInfo, save and parse profile
      console.log('in getUserInfo with profile>>');
      if (this.isTokenUnexpired()) {
        console.log('savingProfile');

        this.saveProfileToLocalStorage(profile);
        this.extractElementsFromUserProfile(profile)
      } else {
        console.log('getUserInfo with token expired');
      }


      if (this.session.getFailedAuthorizationRoute()  > '') {
        console.log('have failed authorization route, retrying ');
        this.router.navigateByUrl(this.session.getFailedAuthorizationRoute());
      }

      // Redirect to retryUrl if there is a saved url that has been set
      console.log('before checkForUnauthenticateRetryUrl');
      // this.UpdateLastLogin();
      this.checkForUnauthenticateRetryUrl();





    });
  }

  private checkForUnauthenticateRetryUrl() {
    const retryUrl: string = localStorage.getItem('unauthenticated_retry_url');
    console.log('checkForUnauthenticateRetryUrl has retryUrl ' + retryUrl);
    if (retryUrl) {
      console.log('navigating to unauthenticated_retry_url: ' + retryUrl);
      this.router.navigate([retryUrl]);
      localStorage.removeItem('unauthenticated_retry_url');
    }
  }

  private saveProfileToLocalStorage(profile: any) {
    console.log('###setting AUth0 profile to local storage');
    localStorage.setItem('profile', JSON.stringify(profile));
    this.userProfile = profile;
  }

  public checkRestoreProfile(): any  {
    const x = JSON.parse(localStorage.getItem('profile'));
    return x;
  }

  // with angular router we need to not do autoParse
  // and to interupt router proccessing and complete the parse ourselves
  // https://github.com/auth0/lock/pull/790
  // see https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/issues/40
  public handleAuthenticationWithHash() {
    console.log('in handleRedirectWithAuthHash');
    this.router.events
        .filter(event => event.constructor.name === 'NavigationStart')
        .filter(event => (/access_token|id_token|error/).test(event['url']))
        .subscribe(event => {
      console.log('in handleRedirectWithAuthHash subscribe event with hash ' + window.location.hash);
      //const authResult = this.auth0.parseHash(window.location.hash);
      // use following in conjunction with autoParseHash: false option setting
      this.lock.resumeAuth(window.location.hash, (error, authResult) => {
        if (authResult && authResult.idToken) {
          console.log('resumeAuthh successfully authenticated');
          // this.lock.emit('authenticated', authResult);
        }
        if (authResult && authResult.error) {
          this.lock.emit('authorization_error', authResult);
        }
      });
    });
  }

  public isAuthenticated() {
    return this.authenticated; // && this.isTokenUnexpired();
  }

  public isTokenUnexpired() {
    // abort if not set or not authenticated
    if (!this.expiresAtNum || !this.authenticated) {
      // console.log('isTokenUnexpired has null');
      return false;
    } else {
      // console.log('isTokenUnexpired Dt has ' + new Date().toString() + ' ' + this.expiresAtDt);
      // console.log('isTokenUnexpired num has ' + new Date().getTime() + ' ' + expiresAtNum);
      const isNotExpired = this.expiresAtNum > new Date().getTime();
      return isNotExpired;
    }

  }


  public extractElementsFromUserProfile(userProfile: any): void {
    console.log('in extractUserProfileElements with userProfile:');
    console.log(userProfile);
    if (userProfile !== null && userProfile !== undefined) {
      const app_metadata = (<any>userProfile)['app_metadata'];
      this.session.setAdminStatus((<any>app_metadata)['adminStatus']);
      // console.log('isAdmin: ' + this.session.isAdmin());

      this.session.setMentorStatus((<any>app_metadata)['mentorStatus']);
      console.log('isMentor: ' + this.session.isMentor());

      this.session.setStudentId((<any>app_metadata)['studentId']);
      // console.log('studentId: ' + this.session.getStudentId());

      this.session.setUserId((<any>userProfile)['user_id'].substr('auth0|'.length));
      // console.log('userId: ' + this.session.userId);

      this.email = (<any>userProfile)['email'];
      this.nickname = (<any>userProfile)['nickname'];
    }
  }

  public UpdateLastLogin(): void {
    console.log('calling SqlResource UpdateLastLogin with useId' + this.session.userId);
    this.sqlResource.UpdateLastLogin(this.session.userId)
      .subscribe(
      data => {/*console.log('');*/ },
      err => console.error('last login Subscribe error: ' + err),
      () => { console.log('lastLogin set'); }
      );
  }


  public logout() {
    console.log('in logout');

    this.session.setAdminStatus(undefined);
    this.session.setMentorStatus(undefined);
    this.session.setSponsorStatus(undefined);
    this.session.setStudentId(undefined);
    //localStorage.removeItem('profile');
    //localStorage.removeItem('id_token');
    localStorage.clear();
    //this.zoneImpl.run(() => this.userProfile = undefined);
    this.authResult = undefined;
    this.userProfile = undefined;
    //this.router.navigate(['']);
    console.log('returen to address: ' + 'http://ckapilla.auth0.com/v2/logout?returnTo=' + this.urlService.getClientUrl());
    setTimeout(() => {
      console.log('in timeout callback with return to address ' +
      'http://ckapilla.auth0.com/v2/logout?returnTo=' + this.urlService.getClientUrl());
      document.location.href =
      'http://ckapilla.auth0.com/v2/logout?returnTo=' + this.urlService.getClientUrl();
      }
      , 50);
  }



}
