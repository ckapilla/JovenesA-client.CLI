import { APP_BASE_HREF, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appRouting, appRoutingProviders } from './app.routing';
import { AppSharedModule } from './app_shared/app_shared.module';
import { HeaderbarComponent } from './headerbar/headerbar.component';
// every module that has a routing component no longer needs to be imported here
import { HomeModule } from './home/home.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    appRouting,
    appRoutingProviders,
    HomeModule,
    AppSharedModule.forRoot(),
  ],

  declarations: [
    AppComponent,
    HeaderbarComponent
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
    Location
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
