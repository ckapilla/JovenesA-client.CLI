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
//import { AppRouting } from '../../app.routing';
import { Auth } from '../services/auth.service';
import { SessionService } from '../services/session.service';
/**
 * This class represents the headerbar component.
 */
var HeaderbarComponent = (function () {
    function HeaderbarComponent(auth, session) {
        this.auth = auth;
        this.session = session;
        //console.log('***session: ' + session.getUserId());
    }
    HeaderbarComponent.prototype.isAdminWithValidToken = function () {
        return this.auth.isAuthenticated() && this.session.isAdmin();
    };
    HeaderbarComponent.prototype.isMentorWithValidToken = function () {
        return this.auth.isAuthenticated() && this.session.isMentor();
    };
    HeaderbarComponent.prototype.isStudentWithValidToken = function () {
        return this.auth.isAuthenticated() && this.session.getStudentId() !== 0;
    };
    return HeaderbarComponent;
}());
HeaderbarComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'ja-headerbar',
        templateUrl: 'headerbar.component.html',
        styleUrls: ['headerbar.component.css'],
    }),
    __metadata("design:paramtypes", [Auth,
        SessionService])
], HeaderbarComponent);
export { HeaderbarComponent };
//# sourceMappingURL=headerbar.component.js.map