import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF, Location } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { appRouting, appRoutingProviders } from './app.routing';
// every module that has a routing component no longer needs to be imported here
import { HomeModule } from './home/home.module';
import { AppSharedModule } from './app_shared/app_shared.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRouting,
    appRoutingProviders,
    HomeModule,
    // AdminsModule,
    // MentorsModule,
    // StudentsModule,
    // ReportsModule,
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
    Location
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}

