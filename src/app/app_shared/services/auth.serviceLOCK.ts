// auth.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';
import { SessionService } from './session.service';
import { SqlResource } from '../../app_shared/services/sql-resource';
import 'rxjs/add/operator/take';
import { AUTH_CONFIG } from './auth0-variables';
import 'rxjs/add/operator/filter';
import Auth0Lock from 'auth0-lock';
import { LOCK_DICTIONARY } from './auth0-lock-dictionary';
import * as auth0 from 'auth0-js';


@Injectable()
export class AuthServiceXXXXX {

  userProfile: Object;
  zoneImpl: NgZone;
  adminStatus: number;
  mentorStatus: number;
  studentId: number;
  sponsorStatus: number;
  email: string;
  nickname: string;
  authenticated: boolean;


  // lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
  //   oidcConformant: true,
  //   // autoclose: true,

  //   auth: {
  //     redirectUrl: AUTH_CONFIG.callbackURL,
  //     responseType: 'token id_token',
  //     autoParseHash: true,
  //     audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  //     // params: {
  //     //   scope: 'openid'
  //     // }
  //   },
  //   theme: {
  //     logo: 'http://privada.jovenesadelante.org/assets/images/JovenesLogo.png',
  //     primaryColor: '#106cc8'
  //   },
  //   languageDictionary: LOCK_DICTIONARY
  // }); // end Auth0Lock ctor


    webAuth = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: 'http://localhost:3000',
    scope: 'openid',
    leeway: 30
  });

  constructor(
    //zone: NgZone,
    private router: Router,
    public session: SessionService,
    public sqlResource: SqlResource) {

    console.log('Auth constructor before attempt restore session');
    //this.zoneImpl = zone;
    // in case this is a page refresh, or reload before timeout
    // check to see if we have an unexpired saved profile
    this.authenticated = false;
    ///////////////this.checkRestoreUserProfile(); // JSON.parse(localStorage.getItem('profile'));
    this.session = session;
    this.sqlResource = sqlResource
    console.log(this.session);
    console.log(this.sqlResource);

    //this.setupAuthenticationHandlers();
  }

  public login(): void {


    // use lock
    // console.log('using lock to login');
    // this.lock.show();
    // or
    // use authh0.js
    console.log('using Hosted login Page');
    this.webAuth.authorize({
    });




  }


  // for using path-based routing
  // public setupAuthenticationHandlers(): void {

    // this.lock.on('authenticated', (authResult: any) => {
    //   this.authenticated = true;
    //   console.log('got authenticated event!');
    //   console.log('idToken>>>');
    //   console.log(authResult.idToken);
    //   console.log('accessToken>>>');
    //   console.log(authResult.accessToken);
    //   console.log('expiresIn');
    //   console.log(authResult.expiresIn);
    //   if (authResult && authResult.accessToken && authResult.idToken) {
    //     this.setSession(authResult);
    //     this.getProfile(authResult);
    //     //this.router.navigate(['/']);
    //   }
    // });

  //   this.lock.on('authorization_error', (err: any) => {
  //     console.log('got authorization error event!');
  //     this.router.navigate(['/']);
  //     console.log(err);
  //     alert(`Error: ${err.error}. Check the console for further details.`);
  //   });
  // }


  private getProfile(authResult: any) {
      // Call get userInfo with the token in authResult
      console.log('calling lock.getUserInfo');

    console.log('skipping call to handleRedirectWithHash');
    // this.handleRedirectWithAuthHash();

    // this.lock.getUserInfo(authResult.accessToken, (error: any, profile: any) => {
    //   if (error) {
    //     // Handle error
    //     alert(error);
    //     return;
    //   }
    //   // If authentication is successful, set up a 'session' by saving the items
    //   // in local storage
    //   console.log('in getUserInfo callback with profile>>');
    //   if (this.isAuthenticated()) {
    //     console.log('###in Authenticated getUserInfo callback with profile>>');
    //     console.log(profile);
    //     console.log('###setting AUth0 profile to local storage');
    //     localStorage.setItem('profile', JSON.stringify(profile));
    //     this.userProfile = profile;
    //     this.extractUserProfileElements();
    //   }
    // });
  }
/**
        console.log('checking for failed route of ');
        if (this.session.getFailedRoute() > '') {
          console.log('navigating to failed route: ' + this.session.getFailedRoute());
          this.router.navigate([this.session.getFailedRoute()]);
        }
        // Redirect if there is a saved url to do so.
        // var redirectUrl: string = localStorage.getItem('redirect_url');
        // if(redirectUrl !== undefined ) {
        //   console.log('redirecting to ' + redirectUrl);
        //   this.router.navigate([redirectUrl]);
        //   localStorage.removeItem('redirect_url');
        // }
      } else {
        console.log('isAuthenticated returned false');
      }
      console.log('end of getUserInfo handler');
    }); // end getUserInfo

 */


  // public handleRedirectWithAuthHash() {
  //   console.log('in handleRedirectWithAuthHash');
  //   this.router.events.take(1).subscribe(event => {
  //     console.log('in handleRedirectWithAuthHash subscribe event with hash ' + window.location.hash);
  //     // 7/23/2017 workaround for url not being found
  //     if (/access_token/.test(event['url']) || /error/.test(event['url'])) {
  //       console.log('handleRedirectWithAuthHash has token or error, parsing authResult');
  //       const authResult = this.webAuth.parseHash() //window.location.hash);
  //       if (authResult && authResult.idToken) {
  //         console.log('manual emit authenticated');
  //         this.lock.emit('authenticated', authResult);
  //       }
  //       if (authResult && authResult.error) {
  //         this.lock.emit('authorization_error', authResult);
  //       }
  //     }
  //   });
  // }

  public isAuthenticated(): boolean {
    // Check if there's an unexpired JWT
    return this.authenticated;
    // const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    // console.log('expiresAt: ' + expiresAt);
    // const now = new Date().getTime();
    // const isNotExpired = now < expiresAt;
    // console.log('isAuthenticated has now: ' + now + ' expiredAt: ' + expiresAt);
    // console.log(isNotExpired);
    // return isNotExpired;
  }

  private setSession(authResult: any) {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    console.log('expiresAt: ' + expiresAt);
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public extractUserProfileElements(): void {
    console.log('in extractUserPofileElements');
    if (this.userProfile !== null && this.userProfile !== undefined) {
      console.log('in extractUserPofileElements with nonEmpaty userProfile: ');
      console.log(this.userProfile);
      const app_metadata = (<any>this.userProfile)['app_metadata'];
      this.adminStatus = (<any>app_metadata)['adminStatus'];
      this.session.setAdminStatus(this.adminStatus);
      console.log('isAdmin: ' + this.session.isAdmin());
      localStorage.setItem('isAdmin', this.session.isAdmin().toString());

      this.mentorStatus = (<any>app_metadata)['mentorStatus'];
      this.session.setMentorStatus(this.mentorStatus);
      console.log('isMentor: ' + this.session.isMentor());
      localStorage.setItem('isMentor', this.session.isMentor().toString());

      this.studentId = (<any>app_metadata)['studentId'];
      this.session.setStudentId(this.studentId);
      console.log('studentId: ' + this.session.getStudentId());
      localStorage.setItem('studentId', this.session.getStudentId().toString());

      this.session.setUserId((<any>this.userProfile)['user_id'].substr('auth0|'.length));
      console.log('userId: ' + this.session.userId);
      localStorage.setItem('userId', this.session.userId.toString());


      this.email = (<any>this.userProfile)['email'];
      this.nickname = (<any>this.userProfile)['nickname'];
    }
  }

  public checkRestoreUserProfile(): void {
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    console.log('check restored profile>>>>>>>');

    if (this.userProfile === null) {
      console.log('emptyProfile, do not parse');
    } else {
      console.log('successful restore of profile');
      console.log(this.userProfile);
      this.extractUserProfileElements();
    }
  }

  public UpdateLastLogin(id: number): void {
    // console.log('calling SqlResource UpdateLastLogin');
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
    this.zoneImpl.run(() => this.userProfile = undefined);
    //this.router.navigate(['']);
    setTimeout(function() {
      console.log('in timeout callback');
      document.location.href =
      'http://ckapilla.auth0.com/v2/logout?returnTo=http%3A%2F%2Fprivada.jovenesadelante.org';
      }
      , 500);
    //window.location.href =
    //'https://ckapilla.auth0.com/v2/logout?client_id=pwC5E08ZZFytctumrhmI2bFmakYRGhD';
    //'https://ckapilla.auth0.com/v2/logout?client_id=pwC5E08ZZFytctumrhmI2bFmakYRGhD2&returnTo=http%3A%2F%2Fprivada.jovenesadelante.org';
  }



}
