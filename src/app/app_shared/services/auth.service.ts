import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { BehaviorSubject, combineLatest, from, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, shareReplay, tap } from 'rxjs/operators';
import { AUTH_CONFIG } from './auth0-config';
import { SessionService } from './session.service';
import { SqlResource } from './sql-resource.service';
import { UrlService } from './url.service';


(window as any).global = window;

@Injectable({
  providedIn: 'root'
}

)
export class AuthService {
  userProfile: Object;
  // authResult: Object;
  // expiresAt: string;
  // email: string;
  nickname: string;
  // authenticated: boolean;

  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: AUTH_CONFIG.domain,
      client_id: AUTH_CONFIG.clientID,
      // redirect_uri: this.urlService.getClientUrl()
      redirect_uri: `${window.location.origin}/callback`
      // responseType: 'token id_token',
      // audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      // scope: 'openid '
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1),
    catchError(err => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated()))
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  constructor(public router: Router,
    public urlService: UrlService,
    public session: SessionService,
    public sqlResource: SqlResource) {
    //  if not authenticated, check to see if we have a saved profile
    if (session.getUserId() === 0) {
      console.log('no current userProfile so check for stored userProfile');
      this.setUserProfileElementsToSession(this.checkRestoreUserProfile());
    }
  }

  // getUser$() is a method because options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options)))
    );
  }


  localAuthSetup() {
    console.log('localAuthSetup');
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user data
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );

    const checkAuthSub = checkAuth$.subscribe((response: { [key: string]: any } | boolean) => {
      // If authenticated, response will be user object
      // If not authenticated, response will be 'false'
      // Set subjects appropriately
      if (response) {
        const user = response;
        this.userProfileSubject$.next(user);
      }
      this.loggedIn = !!response;
      // Clean up subscription
      checkAuthSub.unsubscribe();
    });
  }

  login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    console.log('!@#$%^&*(in login with redirectPath:' + redirectPath);
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: `${window.location.origin}/callback`,
        appState: { target: redirectPath }
      });
    });
  }

  /*
  Stores the application route to redirect back to after login processing is complete
  Calls the JS SDK's handleRedirectCallback method
  Gets and sets the user's profile data
  Updates application login state
  After the callback has been processed, redirects the user to their intended route
  */

  handleAuthCallback() {
    console.log('handleAuthCallback');
    // Only the callback component should call this method
    // Call when app reloads after user logs in with Auth0
    let targetRoute: string; // Path to redirect to after login processsed
    this.UpdateLastLogin();
    // Ensure Auth0 client instance exists
    const authComplete$ = this.auth0Client$.pipe(
      // Have client, now call method to handle auth callback redirect
      concatMap(() => this.handleRedirectCallback$),
      tap(cbRes => {
        // Get and set target redirect route from callback results
        targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
      }),
      concatMap(() => {
        // Redirect callback complete; create stream
        // returning user data and authentication status
        return combineLatest(
          this.getUser$(),
          this.isAuthenticated$
        );
      })
    );

    // Subscribe to authentication completion observable
    // Response will be an array of user and login status
    authComplete$.subscribe(([user, loggedIn]) => {
      // Update subjects and loggedIn property
      this.userProfileSubject$.next(user);
      this.loggedIn = loggedIn;
      ////////////////////// cjk
      // doesn't work because returns observable
      // this.userProfile = this.userProfileSubject$.pipe(mergeMap(() => take(1)));
      this.userProfile = this.userProfileSubject$.getValue();
      console.log('authComplete setting userProfle with value ');
      console.log(this.userProfile);
      this.setUserProfileElementsToSession(this.userProfile);
      this.storeUserProfileToStorage(this.userProfile);

      ///////////////////// cjk

      // Redirect to target route after callback processing
      this.router.navigate([targetRoute]);
    });
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: AUTH_CONFIG.clientID,
        returnTo: `${window.location.origin}`
      });
    });

    //////////// cjk
    localStorage.clear();
    // Go back to the home route
    this.router.navigate(['/']);
    // from prev code:
    this.session.setAdminStatus(undefined);
    this.session.setMentorStatus(undefined);
    this.session.setSponsorStatus(undefined);
    this.session.setStudentId(undefined);
    //////////////// cjk

  }



  // private setSessionTokenParams(authResult): void {
  //   // Set the time that the access token will expire at


  //   console.log('successful Login set expires_at to ');

  //   this.expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  //   console.log(this.expiresAt);

  //   localStorage.setItem('access_token', authResult.accessToken);
  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem('expires_at', this.expiresAt);
  //   // console.log('in SetSession with Result idToken ' + authResult.idToken);
  //   // console.log('in SetSession with Result accessToken' + authResult.accessToken);
  //   // console.log('in SetSession with Result expiresAt' + this.expiresAt);

  // }

  // private finalize(authResult: any) {

  //   // if (this.session.getFailedAuthorizationRoute()  > '') {
  //   //   console.log('have failed authorization route, retrying ');
  //   //   this.router.navigateByUrl(this.session.getFailedAuthorizationRoute());
  //   // }

  //   // Redirect to retryUrl if there is a saved url that has been set
  //   console.log('before checkForUnauthenticateRetryUrl');
  //   this.checkForUnauthenticateRetryUrl();
  //   this.UpdateLastLogin();
  //   // });
  // }

  // private checkForUnauthenticateRetryUrl() {
  //   const retryUrl: string = localStorage.getItem('unauthenticated_retry_url');
  //   console.log('checkForUnauthenticateRetryUrl has retryUrl ' + retryUrl);
  //   if (retryUrl) {
  //     console.log('navigating to unauthenticated_retry_url: ' + retryUrl);
  //     this.router.navigateByUrl(retryUrl);
  //     console.log('');
  //     localStorage.removeItem('unauthenticated_retry_url');
  //   }
  // }


  public setUserProfileElementsToSession(userProfile: any): void {
    console.log('in extractElementsFromProfile with userProfile:');
    console.log(userProfile);
    if (userProfile !== null && userProfile !== undefined) {
      const app_metadata = (<any>userProfile)['app_metadata'];
      this.session.setAdminStatus((<any>app_metadata)['adminStatus']);
      console.log('isAdmin: ' + this.session.isAdmin());

      this.session.setMentorStatus((<any>app_metadata)['mentorStatus']);
      console.log('isMentor: ' + this.session.isMentor());

      this.session.setSponsorStatus((<any>app_metadata)['sponsorStatus']);
      console.log('isSponsor: ' + this.session.isSponsor());

      this.session.setStudentId((<any>app_metadata)['studentId']);
      console.log('studentId: ' + this.session.getStudentId());

      this.session.setStudentGUId((<any>app_metadata)['studentGUId']);
      console.log('studentGUId: ' + this.session.getStudentGUId());

      this.session.setUserId((<any>userProfile)['user_id'].substr('auth0|'.length));
      console.log('userId: ' + this.session.userId);

      // this.email = (<any>userProfile)['email'];
      this.nickname = (<any>userProfile)['nickname'];
    }
  }

  private storeUserProfileToStorage(userProfile: any) {
    console.log('saving userProfile to storage');
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }

  public checkRestoreUserProfile(): any {
    console.log('in checkRestoreUserProfile with' + JSON.parse(localStorage.getItem('userProfile')));
    return JSON.parse(localStorage.getItem('userProfile'));
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


  // public logout(): void {
  //   console.log('in logout');
  //   // from sample:
  //   // Remove tokens and expiry time from localStorage
  //   localStorage.clear();

  //   // Go back to the home route
  //   this.router.navigate(['/']);
  //   // from prev code:

  //   this.session.setAdminStatus(undefined);
  //   this.session.setMentorStatus(undefined);
  //   this.session.setSponsorStatus(undefined);
  //   this.session.setStudentId(undefined);

  //   this.authResult = undefined;
  //   this.userProfile = undefined;
  //   // this.router.navigate(['']);
  //   console.log('return to address: ' + 'https://ckapilla.auth0.com/v2/logout?returnTo=' + this.urlService.getClientUrl());
  //   setTimeout(() => {
  //     console.log('in timeout callback with return to address ' +
  //       'https://ckapilla.auth0.com/v2/logout?returnTo=' + this.urlService.getClientUrl());
  //     document.location.href =
  //       'https://ckapilla.auth0.com/v2/logout?returnTo=' + this.urlService.getClientUrl();
  //   }
  //     , 50);
  // }

  // private isTokenUnexpired(): boolean {
  //   // abort if not set or not authenticated
  //   if (!this.expiresAt) { // || !this.authenticated) {
  //     // console.log('isTokenUnexpired has null');
  //     return false;
  //   } else {
  //     const now: string = new Date().getTime() + '';
  //     // console.log('isTokenUnexpired num has ' + now + ' ' + this.expiresAt);
  //     const isNotExpired = this.expiresAt > now;
  //     return isNotExpired;
  //   }
  // }

  // public isAuthenticated(): boolean {
  //   return this.isTokenUnexpired();
  // }

}
