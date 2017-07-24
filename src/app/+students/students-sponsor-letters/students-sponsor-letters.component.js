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
import { Router, ActivatedRoute } from '@angular/router';
import { SqlResource } from '../../app_shared/services/sql-resource';
import { SessionService } from '../../app_shared/services/session.service';
var StudentsSponsorLettersComponent = (function () {
    function StudentsSponsorLettersComponent(currRoute, router, sqlResource, session) {
        this.currRoute = currRoute;
        this.router = router;
        this.sqlResource = sqlResource;
        this.session = session;
        console.log('sponsorLetters constructor');
    }
    StudentsSponsorLettersComponent.prototype.ngOnInit = function () {
        console.log('sponsorLetters ngOnInit');
        this.studentId = this.currRoute.snapshot.params['id'];
        //console.log('stdudentsSponsorLetters with studentId: ' + id);
        // this.isLoading = true;
        // this.sqlResource.getStudentDTO(id)
        //   .subscribe(
        //     data => {this.student = data;},
        //     err => console.error('Subscribe error: ' + err),
        //     () => {console.log('done loading');
        //           this.isLoading = false;
        //           }
        //   );
        // may be undefined at this point:
        console.log('studentId ' + this.studentId);
    };
    StudentsSponsorLettersComponent.prototype.onSelectedSponsorName = function (sponsorName) {
        // console.log('$$$$$$$ got selected NAME event');
        this.sponsorName = '' + sponsorName;
    };
    StudentsSponsorLettersComponent.prototype.onSelectedSponsorId = function (sponsorId) {
        var _this = this;
        console.log('$$$$$$$ got selectedId event sponsorId: ' + sponsorId);
        this.sponsorId = sponsorId;
        this.sqlResource.getSponsorLetters(this.studentId, sponsorId)
            .subscribe(function (data) { _this.sponsorLetters = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () { return console.log('done: '); });
    };
    StudentsSponsorLettersComponent.prototype.sponsorLetterAdd = function () {
        console.log('in students-donor-letters: sponsorLettertAdd, ready to navigate');
        var target = '/students/sponsor-letters-add/' + this.studentId + '/' + this.sponsorId;
        this.router.navigateByUrl(target);
    };
    return StudentsSponsorLettersComponent;
}());
StudentsSponsorLettersComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: './students-sponsor-letters.component.html',
        styleUrls: ['./students-sponsor-letters.component.css'],
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        Router,
        SqlResource,
        SessionService])
], StudentsSponsorLettersComponent);
export { StudentsSponsorLettersComponent };
//# sourceMappingURL=students-sponsor-letters.component.js.map