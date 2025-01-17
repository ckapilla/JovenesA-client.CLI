import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { BehaviorSubject, combineLatest, from, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, shareReplay, tap } from 'rxjs/operators';
import { TestNameDetectionService } from 'src/app/_shared/services/test-name-detection.service';
import { MemberDataService } from '../data/member-data.service';
import { AUTH_CONFIG } from './auth0-config';
import { SessionService } from './session.service';
import { UrlService } from './url.service';

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfile: Object;
  // authResult: Object;
  // expiresAt: string;
  // email: string;
  nickname: string;
  // authenticated: boolean;

  // Create an observable of Auth0 instance of client
  auth0Client$ = from(
    createAuth0Client({
      domain: AUTH_CONFIG.domain,
      client_id: AUTH_CONFIG.clientID,
      // redirect_uri: this.urlService.getClientUrl()
      redirect_uri: `${window.location.origin}/callback`
      // responseType: 'token id_token',
      // audience: `https://${AUTH_CONFIG.domain}/userinfo`,
      // scope: 'openid '
    })
  ).pipe(
    shareReplay(1),
    catchError((err) => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(concatMap((client: Auth0Client) => from(client.isAuthenticated())));
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  constructor(
    public router: Router,
    public urlService: UrlService,
    public session: SessionService,
    public memberData: MemberDataService,
    private testNameDetectionService: TestNameDetectionService
  ) {
    //  if not authenticated, check to see if we have a saved profile
    if (session.getUserId() === 0) {
      console.log('authService constructor has no current userProfile so check for stored userProfile');
      this.setUserProfileElementsToSession(this.checkRestoreUserProfile());
    }
  }

  // getUser$() is a method because options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(concatMap((client: Auth0Client) => from(client.getUser(options))));
  }

  localAuthSetup() {
    // console.log('localAuthSetup');
    // called from AppComponent constructor
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
    console.log('!@#$%^&*(in AUTH.login with redirectPath:' + redirectPath);
    console.log('!@#$%^&*(in calling auth0Client.subscribe');
    // ******
    // ****** TO FIX THE PROBLEM WHERE localhost redirects to prod,
    // restart front end and backend and possible multiple browser instances
    //
    // if still an issue close all browsers and open all and logout of all privada tabs
    // ******
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      console.log('!@#$%^&*(in subscribe calling loginWithRedirect');
      console.log('setting redirect_url to ' + `${window.location.origin}/callback`);
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
      tap((cbRes) => {
        // Get and set target redirect route from callback results
        targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
      }),
      concatMap(() =>
        // Redirect callback complete; create stream
        // returning user data and authentication status
        combineLatest(this.getUser$(), this.isAuthenticated$)
      )
    );

    // Subscribe to authentication completion observable
    // Response will be an array of user and login status
    authComplete$.subscribe(([user, loggedIn]) => {
      // Update subjects and loggedIn property
      this.userProfileSubject$.next(user);
      this.loggedIn = loggedIn;
      /// /////////////////// cjk
      // doesn't work because returns observable
      // this.userProfile = this.userProfileSubject$.pipe(mergeMap(() => take(1)));
      this.userProfile = this.userProfileSubject$.getValue();
      console.log('authComplete setting userProfle with value ');
      console.log(this.userProfile);
      this.setUserProfileElementsToSession(this.userProfile);
      this.storeUserProfileToStorage(this.userProfile);

      /// ////////////////// cjk

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

    /// ///////// cjk
    localStorage.clear();
    // Go back to the becas-home route
    this.router.navigate(['/']);
    // from prev code:
    this.session.setAdminStatus(undefined);
    this.session.setMentorStatus(undefined);
    this.session.setSponsorStatus(undefined);
    /// ///////////// cjk
  }

  public setUserProfileElementsToSession(userProfile: any): void {
    console.log('in setUserProfileElementsToSession');
    // console.log(userProfile);
    if (userProfile !== null && userProfile !== undefined) {
      const app_metadata = userProfile['app_metadata'];
      this.session.setAdminStatus(app_metadata['adminStatus']);
      console.log('isAdmin: ' + this.session.isAdmin());

      this.session.setMentorStatus(app_metadata['mentorStatus']);
      // console.log('isMentor: ' + this.session.isMentor());

      this.session.setSponsorStatus(app_metadata['sponsorStatus']);
      // console.log('isSponsor: ' + this.session.isSponsor());

      this.session.setStudentRecordGUId(app_metadata['studentRecordGUId']);
      console.log('isStudent: ' + this.session.isStudent());
      // console.log('studentRecordGUId: ' + this.session.getStudentRecordGUId());

      this.session.setUserGUId(userProfile['memberGUId']);
      // for testing abort: this.session.setUserGUId(null);
      // console.log('memberGUId: ' + this.session.getUserGUId());

      this.session.setUserId(userProfile['user_id'].substr('auth0|'.length));
      // console.log('userId: ' + this.session.userId);

      this.nickname = userProfile['nickname'];
      this.testNameDetectionService.checkForTestName(this.nickname);
    }
  }

  private storeUserProfileToStorage(userProfile: any) {
    // console.log('saving userProfile to storage');
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }

  public checkRestoreUserProfile(): any {
    console.log('in checkRestoreUserProfile with' + JSON.parse(localStorage.getItem('userProfile')));
    return JSON.parse(localStorage.getItem('userProfile'));
  }

  public UpdateLastLogin(): void {
    // console.log('calling data service UpdateLastLogin with useId' + this.session.userId);
    this.memberData.UpdateLastLogin(this.session.userId).subscribe(
      () => {
        /* console.log('');*/
      },
      (err) => console.error('last login Subscribe error: ' + err),
      () => {}
    );
  }
}
