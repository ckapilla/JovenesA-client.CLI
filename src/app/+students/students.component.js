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
import { Auth } from '../app_shared/services/auth.service';
/**
 * This class represents the lazy loaded StudentsComponent.
 */
var StudentsComponent = (function () {
    function StudentsComponent(auth) {
        var _this = this;
        this.auth = auth;
        this.onLoginClick = function ($event) {
            $event.preventDefault(); // don't navigate to href.
            _this.auth.login();
        };
        this.onLogoutClick = function ($event) {
            console.log('onLogoutClick');
            $event.preventDefault(); // don't navigate to href.
            _this.auth.logout();
        };
    }
    return StudentsComponent;
}());
StudentsComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'ja-students',
        templateUrl: 'students.component.html',
        styleUrls: ['students.component.css']
    }),
    __metadata("design:paramtypes", [Auth])
], StudentsComponent);
export { StudentsComponent };
//# sourceMappingURL=students.component.js.map