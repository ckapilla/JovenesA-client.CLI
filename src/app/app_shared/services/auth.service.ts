// auth.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';
import { SessionService } from './session.service';
import { SqlResource } from '../../app_shared/services/sql-resource';
import 'rxjs/add/operator/take';

// Avoid name not found warnings
declare var Auth0Lock: any;
declare var Auth0: any;

@Injectable()
export class Auth {
  // Configure Auth0

  userProfile: Object;
  zoneImpl: NgZone;
  adminStatus: number;
  mentorStatus: number;
  studentId: number;
  sponsorStatus: number;
  email: string;
  nickname: string;
  // lock: any;
  AUTH0_CLIENT_ID = 'pwC5E08ZZFytctumrhmI2bFmakYRGhD2';
  AUTH0_DOMAIN = 'ckapilla.auth0.com';

  lock = new Auth0Lock(this.AUTH0_CLIENT_ID, this.AUTH0_DOMAIN, {
    theme: {
      logo: 'http://privada.jovenesadelante.org/assets/images/JovenesLogo.png',
      primaryColor: '#106cc8'
    },
    // auth: {
    //   //redirectUrl: this.getRedirectUrl(),
    //   responseType: 'token',
    //   //redirect: true, // redirectUrl is ignored
    //   //redirect: false,
    //   sso:false
    // },
    languageDictionary: {
      error: {
        login: {
          invalid_email_password: 'Wrong email or password'
        }
      },
      success: { // success messages show above the form or in a confirmation pane
        logIn: 'Thanks for logging in. / Sesión iniciada con éxito',
        forgotPassword: 'An email is being sent to enable resetting your password.'
        + '/<br/>Hemos enviado un correo para completar el restablecimiento de su contraseña.'
      },
      blankErrorHint: 'Can\'t be blank / Requerido',
      emailInputPlaceholder: 'something@youremail.com',
      title: 'LogIn/Iniciar sesión',
      loginLabel: 'LogIn/Iniciar sesión',
      LoginSubmitLabel: 'LogIn/Iniciar sesión',
      // notYourAccountAction: 'Not your account? / ¿No es su cuenta?',
      // notYourAccountAction: 'Use different account or change Password / Cambiar cuenta o contraseña?',
      notYourAccountAction: 'Use different account or Change Password / Usar otra cuenta o Cambiar contraseña',
      lastLoginInstructions: 'Last time you logged in with /<br/>La última vez inició sesión con',
      passwordInputPlaceholder: 'your password / su contraseña',
      forgotPasswordAction: 'Change password / Cambiar contraseña',
      forgotPasswordInstructions: 'Please enter your email address. We will send you an email to reset your password.'
      + '/<br/>Por favor ingrese su dirección de correo. Le enviaremos las instrucciones para restablecer su contrseña.',
      welcome: 'Not / ¿No es %s?',
    }
  }); // end new lock

  // auth1= new Auth0({
  //   domain:       'mine.auth0.com',
  //   clientID:     'dsa7d77dsa7d7',
  //   callbackURL:  'http://my-app.com/callback',
  //   responseType: 'token'
  // });
  auth0 = new Auth0({
    domain: this.AUTH0_DOMAIN,
    clientID: this.AUTH0_CLIENT_ID

  });

  constructor(
    zone: NgZone,
    private router: Router,
    public session: SessionService,
    public sqlResource: SqlResource) {

    console.log('Auth constructor before stored session assignment');
    this.zoneImpl = zone;
    // in case this is a page refresh, check to see if we have a saved profile
    this.checkRestoreUserProfile(); // JSON.parse(localStorage.getItem('profile'));
    this.session = session;
    this.sqlResource = sqlResource
    console.log(this.session);
    console.log(this.sqlResource);

    this.lock.on('authorization_error', (auth_error: any) => {
      console.log('authorization_error event received');
    });

    // Listening for the authenticated event
    this.lock.on('authenticated', (authResult: any) => {
      console.log('got authenticated event!');

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
    this.handleRedirectWithAuthHash();
  }

  public handleRedirectWithAuthHash() {
    console.log('in handleRedirectWithAuthHash');
    this.router.events.take(1).subscribe(event => {
      console.log('in handleRedirectWithAuthHash subscribe event with hash ' + window.location.hash);
      // 7/23/2017 workaround for url not being found
      if (/access_token/.test(event['url']) || /error/.test(event['url'])) {
        console.log('handleRedirectWithAuthHash has token or error, parsing authResult');
        const authResult = this.auth0.parseHash(window.location.hash);
        if (authResult && authResult.idToken) {
          console.log('manual emit authenticated');
          this.lock.emit('authenticated', authResult);
        }
        if (authResult && authResult.error) {
          this.lock.emit('authorization_error', authResult);
        }
      }
    });
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show();
  }

  public isAuthenticated() {
    // Check if there's an unexpired JWT
    // console.log('isAuthenticated: ' + tokenNotExpired());
    return tokenNotExpired();
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
    console.log('restored profile>>>>>>>');

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
