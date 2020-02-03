import { APP_BASE_HREF, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderbarComponent } from './app-navbar/headerbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// every module that has a routing component no longer needs to be imported here
import { AppSharedModule } from './_shared/_shared.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'always' }),
    HttpClientModule,
    AppRoutingModule,
    AppSharedModule.forRoot(),
  ],

  declarations: [
    AppComponent,
    HeaderbarComponent
  ],

  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
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

export class AppModule { }
