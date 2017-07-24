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
import { SessionService } from '../../../app_shared/services/session.service';
/**
 * This class represents the navigation bar component.
 */
var AdminsNavbarComponent = (function () {
    function AdminsNavbarComponent(session) {
        this.currUserId = session.getUserId();
        console.log('AdminsNavbar has userId: ' + this.currUserId);
    }
    return AdminsNavbarComponent;
}());
AdminsNavbarComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'admins-navbar',
        templateUrl: 'admins-navbar.component.html',
        styleUrls: ['admins-navbar.component.css'],
    }),
    __metadata("design:paramtypes", [SessionService])
], AdminsNavbarComponent);
export { AdminsNavbarComponent };
//# sourceMappingURL=admins-navbar.component.js.map