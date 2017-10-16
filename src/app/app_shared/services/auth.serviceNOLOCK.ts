// auth.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
// import { tokenNotExpired } from 'angular2-jwt/angular2-jwt';
import { SessionService } from './session.service';
import { SqlResource } from '../../app_shared/services/sql-resource';
import 'rxjs/add/operator/take';

// Avoid name not found warnings
import { AUTH_CONFIG } from './auth0-variables';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthServiceNOLOCK {

  authenticated: boolean;

  webAuth = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    redirectUri: 'http://localhost:3000/callback',
    //redirectUri: window.location.href,
    scope: 'openid',
    leeway: 30
  });

  constructor(public router: Router) {
    this.authenticated = false;
  }

  public login(): void {
    console.log('in login before call to authorize');
    this.webAuth.authorize({
      clientID: AUTH_CONFIG.clientID,
      //domain: AUTH_CONFIG.domain,
      responseType: 'token id_token',
      audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      redirectUri: 'http://localhost:3000/callback',
      scope: 'openid'
    });
    // console.log('in login before call to client.login');
    // this.webAuth.client.login({
    //   realm: 'JovenesAWebAPI', //connection name or HRD domain
    //   username: 'test@kapilla.net',
    //   password: 'Cjjk2551',
    //   audience: 'https://JovenesAdelanteWebAPI',
    //   //scope: 'read:order write:order',
    //   }, function(err, authResult) {
    //     console.log('callback has authResult');
    //     console.log(authResult);
    //     console.log('callback has error');
    //     console.log(err);
    //     // Auth tokens in the result or an error)
    //   });
  }
  public handleAuthentication(): void {
    console.log('in handleAuthentication B4 parseHash parseHash');
    this.webAuth.parseHash((err: any, authResult: any) => {
      console.log('in handleAuthentication parseHash with authResult');
      console.log(authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.authenticated = true;
        this.setSession(authResult);
        // this.router.navigate(['/home']);
      } else if (err) {
        // this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult: any): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    console.log('%%%%%%%%%%%setSession wiht expiresAt: ' + expiresAt);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    //this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    //const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    // console.log('expiresAt: ' + expiresAt);
    // return new Date().getTime() < expiresAt;
    return this.authenticated;
  }

}
