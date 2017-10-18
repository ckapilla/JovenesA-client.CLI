// auth.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { SqlResource } from '../../app_shared/services/sql-resource';
import 'rxjs/add/operator/take';
import { AUTH_CONFIG } from './auth0-variables';
import { LOCK_DICTIONARY } from './auth0-lock-dictionary';
import { UrlService } from './url.service';

// Avoid name not found warnings
declare var Auth0Lock: any;
declare var Auth0: any;

@Injectable()
export class AuthService {

  userProfile: Object;
  zoneImpl: NgZone;
  adminStatus: number;
  mentorStatus: number;
  studentId: number;
  sponsorStatus: number;
  email: string;
  nickname: string;
  authenticated: boolean;
  lock: any;



  constructor(
    zone: NgZone,
    private router: Router,
    public urlService: UrlService,
    public session: SessionService,
    public sqlResource: SqlResource) {

    console.log('Auth constructor before stored session assignment');
    this.zoneImpl = zone;
    this.authenticated = false;
    // in case this is a page refresh, check to see if we have a saved profile
    // this.checkRestoreUserProfile(); // JSON.parse(localStorage.getItem('profile'));
    this.session = session;
    this.sqlResource = sqlResource
    console.log(this.session);
    console.log(this.sqlResource);

    this.lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
      theme: {
        // TODO https not working
        logo: urlService.getClientUrl() + '/assets/images/JovenesLogo.png',
        primaryColor: '#106cc8',
      },
      languageDictionary: LOCK_DICTIONARY
      // auth: {
      //   //redirectUrl: this.getRedirectUrl(),
      //   responseType: 'token',
      //   //redirect: true, // redirectUrl is ignored
      //   //redirect: false,
      //   sso:false
      // },
    }); // end new lock


    this.lock.on('authorization_error', (auth_error: any) => {
      console.log('authorization_error event received');
    });

    // Listening for the authenticated event
    this.lock.on('authenticated', (authResult: any) => {
      console.log('got authenticated event!');
      this.authenticated = true;
      console.log('token>>>');
      console.log(authResult.idToken);

      this.setSession(authResult);


      // Call get userInfo with the token in authResult
      console.log('calling lock.getUserInfo');
      this.lock.getUserInfo(authResult.accessToken, (error: any, profile: any) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }
        // If authentication is successful, set up a 'session' by saving the items
        // in local storage
        console.log('in getUserInfo callback with profile>>');

        if (this.isAuthenticated()) {
          console.log('###in Authenticated getUserInfo callback with profile>>');
          console.log(profile);
          console.log('###setting AUth0 profile to local storage');
          localStorage.setItem('profile', JSON.stringify(profile));

          // this.zoneImpl.run(() => this.userProfile = profile); // enter Angular zone and assign userProfile
          this.userProfile = profile;
          this.extractUserProfileElements();
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
      console.log('end of authenticated event handler1');
    });
    console.log('end of authenticated event handler definition'); // end authenticated event handler


    // console.log('before call to handleRedirectWithHash');
    //this.handleRedirectWithAuthHash();
  }

  // public handleRedirectWithAuthHash() {
  //   console.log('in handleRedirectWithAuthHash');
  //   this.router.events.take(1).subscribe(event => {
  //     console.log('in handleRedirectWithAuthHash subscribe event with hash ' + window.location.hash);
  //     // 7/23/2017 workaround for url not being found
  //     if (/access_token/.test(event['url']) || /error/.test(event['url'])) {
  //       console.log('handleRedirectWithAuthHash has token or error, parsing authResult');
  //       const authResult = this.auth0.parseHash(window.location.hash);
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

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show();
  }

  public isAuthenticated() {
    // Check if there's an unexpired JWT
    // console.log('isAuthenticated: ' + tokenNotExpired());
//    return tokenNotExpired();
    return this.authenticated;
    // const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    // console.log('expiresAt: ' + expiresAt);
    // const isNotExpired = new Date().getTime() < expiresAt;
    // console.log('isAuthenticated has ' + Date.now.toString() + ' ' + expiresAt);
    // console.log(isNotExpired);
    // return isNotExpired; // tokenNotExpired();
  }

  private setSession(authResult: any) {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    console.log('expiresAt: ' + expiresAt);
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public extractUserProfileElements(): void {
    console.log('in extractUserProfileElements with userProfile:');
    console.log(this.userProfile);
    if (this.userProfile !== null && this.userProfile !== undefined) {
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
    console.log('check restor profile>>>>>>>');

    if (this.userProfile === null) {
      console.log('emptyProfile, do not parse');
    } else {
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
