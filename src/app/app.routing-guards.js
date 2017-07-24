var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './app_shared/services/auth.service';
import { SessionService } from './app_shared/services/session.service';
var CanActivateViaAdminAuthGuard = (function () {
    function CanActivateViaAdminAuthGuard(auth, router, session) {
        this.auth = auth;
        this.router = router;
        this.session = session;
    }
    CanActivateViaAdminAuthGuard.prototype.canActivate = function (next, state) {
        if (this.auth.isAuthenticated()) {
            console.log('Can Activate Admin 1');
            if (this.session.isAdmin()) {
                console.log('Authenticated and Can Activate Admin');
                return true;
            }
            else {
                console.log('Authenticated but unauthorized for Admin');
                this.router.navigate(['unauthorized']);
                return false;
            }
        }
        else {
            console.log('Not authenticated -- Can\'t Activate Admin');
            //localStorage.setItem('redirect_url', state.url);
            this.auth.login();
            //this.router.navigate(['']);
            return false;
        }
    };
    return CanActivateViaAdminAuthGuard;
}());
CanActivateViaAdminAuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Auth, Router, SessionService])
], CanActivateViaAdminAuthGuard);
export { CanActivateViaAdminAuthGuard };
var CanActivateViaMentorAuthGuard = (function () {
    function CanActivateViaMentorAuthGuard(auth, router, session) {
        this.auth = auth;
        this.router = router;
        this.session = session;
    }
    CanActivateViaMentorAuthGuard.prototype.canActivate = function (next, state) {
        if (this.auth.isAuthenticated()) {
            if (this.session.isMentor()) {
                console.log('Authenticated and Can Activate Mentor');
                return true;
            }
            else {
                console.log('Authenticated but unauthorized for Mentor');
                // if this is on startup, will need to try navigate again after profile is loaded
                this.session.setFailedRoute('mentors');
                return false;
            }
        }
        else {
            console.log('link to Mentor but not authenticated -- need login');
            //localStorage.setItem('redirect_url', state.url);
            this.auth.login();
            return false;
        }
    };
    return CanActivateViaMentorAuthGuard;
}());
CanActivateViaMentorAuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Auth, Router, SessionService])
], CanActivateViaMentorAuthGuard);
export { CanActivateViaMentorAuthGuard };
var CanActivateViaStudentAuthGuard = (function () {
    function CanActivateViaStudentAuthGuard(auth, router, session) {
        this.auth = auth;
        this.router = router;
        this.session = session;
    }
    CanActivateViaStudentAuthGuard.prototype.canActivate = function (next, state) {
        if (this.auth.isAuthenticated()) {
            if (this.session.isStudent()) {
                console.log('Authenticated and Can Activate Student');
                return true;
            }
            else {
                console.log('Authenticated but unauthorized for Student');
                // if this is on startup, will need to try navigate again after profile is loaded
                this.session.setFailedRoute('students');
                return false;
            }
        }
        else {
            console.log('link to Student but not authenticated -- need login');
            this.auth.login();
            return false;
        }
    };
    return CanActivateViaStudentAuthGuard;
}());
CanActivateViaStudentAuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Auth, Router, SessionService])
], CanActivateViaStudentAuthGuard);
export { CanActivateViaStudentAuthGuard };
var ConfirmDeactivateGuard = (function () {
    function ConfirmDeactivateGuard() {
    }
    ConfirmDeactivateGuard.prototype.canDeactivate = function (target) {
        if (target.hasChanges()) {
            return window.confirm('Do you really want to cancel?');
        }
        return true;
    };
    return ConfirmDeactivateGuard;
}());
ConfirmDeactivateGuard = __decorate([
    Injectable()
], ConfirmDeactivateGuard);
export { ConfirmDeactivateGuard };
//# sourceMappingURL=app.routing-guards.js.map