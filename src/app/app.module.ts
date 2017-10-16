import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';

import { APP_BASE_HREF, Location } from '@angular/common';
// import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { AuthHttp, AuthConfig } from 'angular2-jwt/angular2-jwt';
import { AuthService } from './app_shared/services/auth.service';
import { AppComponent } from './app.component';

import { appRouting, appRoutingProviders } from './app.routing';
import { CanActivateViaAdminAuthGuard,
          CanActivateViaMentorAuthGuard,
          CanActivateViaStudentAuthGuard,
          ConfirmDeactivateGuard  } from './app.routing-guards';
// every module that has a routing component needs to be imported here
import { HomeModule } from './+home/home.module';
import { AdminsModule } from './+admins/admins.module';
import { MentorsModule } from './+mentors/mentors.module';
import { StudentsModule } from './+students/students.module';
import { ReportsModule } from './+reports/reports.module';

import { AppSharedModule } from './app_shared/app_shared.module';
import { SessionService } from './app_shared/services/session.service';
import { SqlResource } from './app_shared/services/sql-resource';
import { WebApiPrefixService } from './app_shared/services/web-api-prefix.service';

// export declare const WEB_API_LOCAL: InjectionToken<string>;
// export declare const WEB_API_AZURE: InjectionToken<string>;


// export function AuthHttpFactory (http: Http) {
//   // console.log(' *************************************************** New AuthHttp');
//       return new AuthHttp(new AuthConfig(), http);
// }

export function sqlResourceFactory (http: HttpClient, webApiPrefixService: WebApiPrefixService) {
    console.log(' *************************************************** New SqlResource');
       return new SqlResource(http, webApiPrefixService);
 }

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRouting,
    appRoutingProviders,
    // RouterModule,
    ReactiveFormsModule,
    HomeModule,
    AdminsModule,
    MentorsModule,
    StudentsModule,
    ReportsModule,
    AppSharedModule.forRoot()
  ],

  declarations: [
    AppComponent
  ],

  exports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    // {
    //   provide: WEB_API_LOCAL,
    //   useValue: 'http://192.168.1.69:45456/api/'
    // },
    // {
    //   provide: WEB_API_AZURE,
    //   useValue: 'https://jovenesadelantewebapi.azurewebsites.net/api/v1/'
    // },
    Location,
    // AUTH_PROVIDERS,
    // {
    //   provide: AuthHttp,
    //   useFactory(http: Http) {
    //     return new AuthHttp(new AuthConfig(), http);
    //   },
    //   deps: [Http]
    // },
    // {
    //   provide: AuthHttp,
    //   useFactory: AuthHttpFactory,
    //   deps: [Http]
    // },

    AuthService,
    // {
    //   provide: SessionService,
    //   useFactory() {
    //     console.log('New SessionService##');
    //     return new SessionService();
    //   }
    // },
    SessionService,
    SqlResource,
    // {
    //   provide: SqlResource,
    //   useFactory: sqlResourceFactory, // (http: AuthHttp, _http: Http) {
    //   //   console.log(' *************************************************** New SqlResource');
    //   //   return new SqlResource(http, _http);
    //   // }// ,
    //   deps: [AuthHttp, Http]
    // },
    WebApiPrefixService,
    CanActivateViaAdminAuthGuard,
    CanActivateViaMentorAuthGuard,
    CanActivateViaStudentAuthGuard,
    ConfirmDeactivateGuard

  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

