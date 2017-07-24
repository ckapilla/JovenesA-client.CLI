var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import './operators';
import { Router } from '@angular/router';
import { Auth } from './app_shared/services/auth.service';
import { SessionService } from './app_shared/services/session.service';
/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
var AppComponent = (function () {
    function AppComponent(auth, session, router) {
        this.auth = auth;
        if (session.getUserId() === 0) {
            auth.restoreUserProfile();
        }
        console.log('@@@@session: ' + session.getUserId());
        // router.events
        //   //.filter(e => e instanceof NavigationEnd || e instanceof NavigationError)
        //   .subscribe(e => {
        //     console.log('event: ', e);
        //   });
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'app-ja',
        templateUrl: 'app.component.html'
    }),
    __metadata("design:paramtypes", [Auth,
        SessionService,
        Router])
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map