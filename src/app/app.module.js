var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF, Location } from '@angular/common';
// import { RouterModule } from '@angular/router';
import { HttpModule, Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt/angular2-jwt';
import { Auth } from './app_shared/services/auth.service';
import { AppComponent } from './app.component';
import { appRouting, appRoutingProviders } from './app.routing';
import { CanActivateViaAdminAuthGuard, CanActivateViaMentorAuthGuard, CanActivateViaStudentAuthGuard, ConfirmDeactivateGuard } from './app.routing-guards';
// every module that has a routing component needs to be imported here
import { HomeModule } from './+home/home.module';
import { AdminsModule } from './+admins/admins.module';
import { MentorsModule } from './+mentors/mentors.module';
import { StudentsModule } from './+students/students.module';
import { ReportsModule } from './+reports/reports.module';
import { AppSharedModule } from './app_shared/app_shared.module';
import { SessionService } from './app_shared/services/session.service';
import { SqlResource } from './app_shared/services/sql-resource';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        imports: [
            BrowserModule,
            ReactiveFormsModule,
            HttpModule,
            appRouting,
            appRoutingProviders,
            // RouterModule,
            ReactiveFormsModule,
            HomeModule,
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
            HttpModule
        ],
        providers: [
            {
                provide: APP_BASE_HREF,
                useValue: '/'
            },
            Location,
            // AUTH_PROVIDERS,
            {
                provide: AuthHttp,
                useFactory: function (http) {
                    return new AuthHttp(new AuthConfig(), http);
                },
                deps: [Http]
            },
            Auth,
            {
                provide: SessionService,
                useFactory: function () {
                    console.log('New SessionService##');
                    return new SessionService();
                }
            },
            SessionService,
            SqlResource,
            CanActivateViaAdminAuthGuard,
            CanActivateViaMentorAuthGuard,
            CanActivateViaStudentAuthGuard,
            ConfirmDeactivateGuard,
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map