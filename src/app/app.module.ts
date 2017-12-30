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
import { UrlService } from './app_shared/services/url.service';
import { SortService } from './app_shared/services/sort.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRouting,
    appRoutingProviders,
    ReactiveFormsModule,
    HomeModule,
    AdminsModule,
    MentorsModule,
    StudentsModule,
    ReportsModule,
    AppSharedModule.forRoot(),

  ],

  declarations: [
    AppComponent
  ],

  exports: [
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    Location,
    AuthService,
    SessionService,
    SqlResource,
    UrlService,
    SortService,
    CanActivateViaAdminAuthGuard,
    CanActivateViaMentorAuthGuard,
    CanActivateViaStudentAuthGuard,
    ConfirmDeactivateGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

