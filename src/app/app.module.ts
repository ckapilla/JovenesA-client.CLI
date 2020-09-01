import { APP_BASE_HREF, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { HeaderbarComponent } from './app-navbar/headerbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeValuesService } from './_shared/services/codeValuesService';
// every module that has a routing component no longer needs to be imported here
import { AppSharedModule } from './_shared/_shared.module';
import { MemberState } from './_store/member/member.state';
import { StudentState } from './_store/student/student.state';

export function appInit(codeValuesService: CodeValuesService) {
  return () => codeValuesService.buildArrays();
}

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'always' }),
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot([ StudentState, MemberState ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AppSharedModule.forRoot()
  ],

  declarations: [ AppComponent, HeaderbarComponent ],

  exports: [ ReactiveFormsModule, HttpClientModule, AppRoutingModule ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [ CodeValuesService ],
      multi: true // required because it reference ApplicationStatusService which is multi and "can't mix"
    },
    Location
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
