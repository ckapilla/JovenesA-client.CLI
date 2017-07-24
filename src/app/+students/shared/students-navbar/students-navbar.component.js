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
//xximport { ROUTER_DIRECTIVES } from '@angular/router';
import { SessionService } from '../../../app_shared/services/session.service';
/**
 * This class represents the navigation bar component.
 */
var StudentsNavbarComponent = (function () {
    function StudentsNavbarComponent(session) {
        this.currUserId = session.getStudentId();
        console.log('StudentsNav: ' + this.currUserId);
    }
    return StudentsNavbarComponent;
}());
StudentsNavbarComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'students-navbar',
        templateUrl: './students-navbar.component.html',
        styleUrls: ['./students-navbar.component.css'],
    }),
    __metadata("design:paramtypes", [SessionService])
], StudentsNavbarComponent);
export { StudentsNavbarComponent };
//# sourceMappingURL=students-navbar.component.js.map