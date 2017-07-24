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
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
var SqlResource = (function () {
    function SqlResource(http, _http) {
        // console.log('sqlResource constructor');
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
    SqlResource.prototype.getMentorReport = function (mentorReportId) {
        var url = this.WebApiPrefix + 'mentorReport/' + mentorReportId;
        console.log('sending AuthHttp get request for MentorReport with ' + url);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.getMentorReports = function (mentorId, studentId) {
        var url = this.WebApiPrefix + 'mentorreports/' + mentorId + '/' + studentId;
        console.log('sending AuthHttp get request for MentorReports with ' + url);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.getMentorReportsFollowUpStatus = function () {
        var url = this.WebApiPrefix + 'mentorReportsFollowUpNeeded';
        console.log('sending AuthHttp get request for MentorReportsFollowUpNeeded with ' + url);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.getSponsorLetters = function (studentId, sponsorId) {
        var url = this.WebApiPrefix + 'studentsponsorletters/' + studentId + '/' + sponsorId;
        console.log('sending AuthHttp get request for SponsorLetters with ' + url);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.postMentorReport = function (mentorReport, operation, mentorId, studentId) {
        console.log('operation is' + operation);
        var url = this.WebApiPrefix + 'mentorReports/' + operation;
        console.log('sending AuthHttp get request for PostMentoReport with ' + url);
        var body = JSON.stringify({ mentorReport: mentorReport });
        // strip outer 'mentor' name
        var x = JSON.parse(body);
        body = JSON.stringify(x.mentorReport);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        console.log('ready to post ' + url + ' body: ' + body + ' options ' + options);
        return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SqlResource.prototype.postSponsorLetter = function (sponsorLetter, studentId, sponsorId) {
        var url = this.WebApiPrefix + 'studentsponsorletters/' + studentId; // + '/' + sponsorId;
        console.log('in postSponsorLetter with url ' + url);
        var body = JSON.stringify({ sponsorLetter: sponsorLetter });
        // strip outer 'mentor' name
        var x = JSON.parse(body);
        body = JSON.stringify(x.sponsorLetter);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        console.log('ready to post ' + url + 'body: ' + body + ' options ' + options);
        return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SqlResource.prototype.getStudentsForMentor = function (mentorId) {
        var url = this.WebApiPrefix + 'studentsForMentors/' + mentorId;
        console.log('sending AuthHttp get request for StudentsForMentor');
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.getSponsorsForStudent = function (studentId) {
        var url = this.WebApiPrefix + 'sponsorsForStudent/' + studentId;
        console.log('sending AuthHttp get request ' + url);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.getStudentDTO = function (studentId) {
        var url = this.WebApiPrefix + 'studentDTO/' + studentId;
        // statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
        console.log('sending AuthHttp get request for Students');
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.getStudentDTOs = function (statusId, gradYear, yearJoinedJA) {
        var url = this.WebApiPrefix
            + 'studentDTOs/statusId/gradYear/yearJoinedJA'
            + '?statusId=' + statusId
            + '&gradYear=' + gradYear
            + '&yearJoinedJA=' + yearJoinedJA;
        // statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
        console.log('sending AuthHttp get request for Students');
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.getMentorReportsByMonth = function (year, month, summaryStatusId, highlightStatusId) {
        var url = this.WebApiPrefix + 'mentorReportsByMonth'
            + '?year=' + year
            + '&month=' + month
            + '&summaryStatusId=' + summaryStatusId
            + '&highlightStatusId=' + highlightStatusId;
        console.log('sending AuthHttp get request for MentorReportsByMonth with ' + url);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.getMembers = function (id) {
        var url = this.WebApiPrefix
            + 'members/' + id;
        console.log('sending AuthHttp get request for Member id ', id);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.getMember = function (memberId) {
        var url = this.WebApiPrefix + 'members/' + memberId;
        console.log('sending AuthHttp get request for Member');
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.getCommunicationsForMember = function (memberId) {
        var url = this.WebApiPrefix + 'communications/' + memberId;
        console.log('sending AuthHttp get request for Communications For Member with url', url);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.getMemberStudentRelations = function (type) {
        var url = this.WebApiPrefix
            + 'memberstudentrelations/type/' + type;
        // statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
        console.log('sending AuthHttp get request for Members of type ', type);
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.getMentor = function (mentorId) {
        var url = this.WebApiPrefix + 'mentors/' + mentorId;
        console.log('sending AuthHttp get request for Mentor');
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.postMentor = function (mentor) {
        var url = this.WebApiPrefix + 'mentors/';
        var body = JSON.stringify({ mentor: mentor });
        // strip outer 'mentor' name
        var x = JSON.parse(body);
        body = JSON.stringify(x.mentor);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SqlResource.prototype.postMember = function (member) {
        var url = this.WebApiPrefix + 'members/';
        var body = JSON.stringify({ member: member });
        // strip outer 'member' name
        var x = JSON.parse(body);
        body = JSON.stringify(x.member);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SqlResource.prototype.getAdmin = function (adminId) {
        var url = this.WebApiPrefix + 'admins/' + adminId;
        // console.log('sending AuthHttp get request for Admin');
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SqlResource.prototype.postAdmin = function (admin) {
        var url = this.WebApiPrefix + 'admins/';
        var body = JSON.stringify({ admin: admin });
        // strip outer 'admin' name
        var x = JSON.parse(body);
        body = JSON.stringify(x.admin);
        console.log('in postAdmin');
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SqlResource.prototype.getStudent = function (studentId) {
        var url = this.WebApiPrefix + 'students/' + studentId;
        console.log('sending AuthHttp get request for Student');
        return this.http.get(url)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //   public getStudentDTO(studentId: Number): Observable<StudentDTO> {
    //     const url = this.WebApiPrefix + 'studentDTOs/' + studentId;
    // // statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
    //     console.log('sending AuthHttp get request for Students');
    //     return this.http.get(url)
    //       .map((response: Response) => response.json())
    //       .catch(this.handleError);
    //   }
    SqlResource.prototype.postStudent = function (student) {
        var url = this.WebApiPrefix + 'students/';
        var body = JSON.stringify({ student: student });
        // strip outer 'student' name
        var x = JSON.parse(body);
        body = JSON.stringify(x.student);
        // console.log('in postStudent');
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    // public UpdateLastLogin(userId: number): Observable<any> {
    //   const url = this.WebApiPrefix + 'updateLastLogin/' + userId + '/true';
    //   console.log('sending AuthHttp get request to set LastLogin datetime');
    //   return this._http.get(url)
    //     .map(
    //         (response: Response) => {
    //           console.log('updateLastLogin success: ');
    //           console.log(response.json());
    //           })
    //     .catch(this.handleError
    //     );
    // }
    SqlResource.prototype.UpdateLastLogin = function (userId) {
        var url = this.WebApiPrefix + 'updates' + '/LastLoginTime/' + userId;
        console.log('sending AuthHttp get request to set LastLogin datetime');
        return this._http.get(url)
            .map(function (response) {
            console.log('updateLastLogin success; no json expected ');
        })
            .catch(this.handleError);
    };
    SqlResource.prototype.extractData = function (res) {
        console.log('sqlResource extractData');
        var body = res.json();
        return body.data || {};
    };
    SqlResource.prototype.handleError = function (error) {
        console.log('sqlResource handle error');
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.log(errMsg.message);
        console.log(errMsg.statusText);
        console.error(errMsg); // log to console instead
        if (errMsg === 'No JWT present or has expired') {
            window.alert('Session has expired, please log in again.');
        }
        return Observable.throw(errMsg);
    };
    return SqlResource;
}());
SqlResource = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthHttp,
        Http])
], SqlResource);
export { SqlResource };
//# sourceMappingURL=sql-resource.js.map