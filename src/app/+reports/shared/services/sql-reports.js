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
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
var SqlReports = (function () {
    function SqlReports(http, _http) {
        this.http = http;
        this._http = _http;
        var serverMode = 'Prod';
        console.log('window: ' + window.location.hostname);
        if (window.location.hostname === 'privada.jovenesadelante.org'
            || serverMode === 'Prod') {
            this.WebApiPrefix = 'http://jovenesadelantewebapi.azurewebsites.net/api/v1/';
        }
        else {
            // this.WebApiPrefix = 'http://jovenesadelantewebapitest.azurewebsites.net/api/v1/' ;
            this.WebApiPrefix = 'http://192.168.1.68:45455/api/v1/';
        }
    }
    SqlReports.prototype.getLatestMentorReports = function () {
        var url = this.WebApiPrefix + 'reports/latest-mentor-reports';
        console.log('sending AuthHttp get request for LatestMentorReports with ' + url);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlReports.prototype.getLatestMentorReports2 = function () {
        var url = this.WebApiPrefix + 'reports/latest-mentor-reports2';
        console.log('sending AuthHttp get request for LatestMentorReports with ' + url);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlReports.prototype.getLatestStudentLetters = function () {
        var url = this.WebApiPrefix + 'reports/latest-student-letters';
        console.log('sending AuthHttp get request for LatestStudentLetters with ' + url);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlReports.prototype.getLatestStudentLetters2 = function () {
        var url = this.WebApiPrefix + 'reports/latest-student-letters2';
        console.log('sending AuthHttp get request for LatestStudentLetters2 with ' + url);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlReports.prototype.handleError = function (error) {
        console.log('sqlResource handle error');
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        if (errMsg === 'No JWT present or has expired') {
            window.alert('Session has expired, please log in again.');
        }
        return Observable.throw(errMsg);
    };
    return SqlReports;
}());
SqlReports = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthHttp,
        Http])
], SqlReports);
export { SqlReports };
//# sourceMappingURL=sql-reports.js.map