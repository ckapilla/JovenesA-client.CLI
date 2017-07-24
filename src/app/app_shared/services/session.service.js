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
var SessionService = (function () {
    function SessionService() {
        // this.loading$ = new Observable(observer => this._observer = observer)
        // .share();
        console.log('SessionService constructor');
        this.userId = 0;
        this.assignedStudentId = 0;
    }
    SessionService.prototype.setAdminStatus = function (status) {
        this.adminStatus = status;
    };
    SessionService.prototype.isAdmin = function () {
        if (this.adminStatus === undefined) {
            return false;
        }
        else {
            return this.adminStatus === 1015;
        }
    };
    SessionService.prototype.setMentorStatus = function (status) {
        this.mentorStatus = status;
    };
    SessionService.prototype.isMentor = function () {
        if (this.mentorStatus === undefined) {
            return false;
        }
        else {
            return this.mentorStatus === 1015;
        }
    };
    SessionService.prototype.setStudentId = function (studentId) {
        this.studentId = studentId;
    };
    SessionService.prototype.getStudentId = function () {
        return this.studentId ? this.studentId : 0;
    };
    SessionService.prototype.isStudent = function () {
        if (this.studentId === undefined) {
            return false;
        }
        else {
            return this.studentId !== 0;
        }
    };
    SessionService.prototype.setSponsorStatus = function (status) {
        this.sponsorStatus = status;
    };
    SessionService.prototype.isSponsor = function () {
        if (this.sponsorStatus === undefined) {
            return false;
        }
        else {
            return this.sponsorStatus === 1015;
        }
    };
    SessionService.prototype.setUserId = function (Id) {
        this.userId = Id;
    };
    SessionService.prototype.getUserId = function () {
        return this.userId;
    };
    SessionService.prototype.setAssignedStudentId = function (Id) {
        this.assignedStudentId = Id;
    };
    SessionService.prototype.getAssignedStudentId = function () {
        return this.assignedStudentId;
    };
    SessionService.prototype.setAssignedStudentName = function (name) {
        this.assignedStudentName = name;
    };
    SessionService.prototype.getAssignedStudentName = function () {
        return this.assignedStudentName;
    };
    SessionService.prototype.setFailedRoute = function (route) {
        this.failedRoute = route;
    };
    SessionService.prototype.getFailedRoute = function () {
        console.log('getFailedRoute returning ' + this.failedRoute);
        return this.failedRoute;
    };
    return SessionService;
}());
SessionService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], SessionService);
export { SessionService };
//# sourceMappingURL=session.service.js.map