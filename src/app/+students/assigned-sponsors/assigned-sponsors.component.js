var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Output } from '@angular/core';
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource';
var AssignedSponsorsComponent = (function () {
    //@Output() onNoAssignedsponsor = new EventEmitter();
    function AssignedSponsorsComponent(session, sqlResource) {
        this.session = session;
        this.sqlResource = sqlResource;
        this.errorMessage = '';
        this.onSelectedSponsorName = new EventEmitter();
        this.onSelectedSponsorId = new EventEmitter();
        console.log('in AssignedsponsorComponent constructor');
    }
    AssignedSponsorsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sqlResource.getSponsorsForStudent(this.session.getStudentId())
            .subscribe(function (data) { _this.sponsors = data; console.log(_this.sponsors[0]); }, function (err) { return console.error('Subscribe error: ' + err); }, function () {
            console.log('assigned-sponsor loaded ' + _this.sponsors.length + ' rows');
            console.log('first one is ' + _this.sponsors[0].sponsorGroupName);
            if (_this.sponsors.length > 0) {
                _this.selectFirstRow();
            }
            else {
                _this.errorMessage = 'No Assigned sponsor for this student.';
                //this.onNoAssignedsponsor.emit();
            }
        });
    };
    AssignedSponsorsComponent.prototype.selectFirstRow = function () {
        console.log('First row has SponsorId ' + this.sponsors[0].sponsorGroupId);
        this.setRowClasses(this.sponsors[0].sponsorGroupId);
        this.selectSponsor(this.sponsors[0].sponsorGroupId, 0);
    };
    AssignedSponsorsComponent.prototype.selectSponsor = function (sponsorId, idx) {
        console.log('sponsor selected sponsorId: ' + sponsorId + ' idx: ' + this.sponsors[idx] + 'idx: ' + idx);
        var sponsorName = this.sponsors[idx].sponsorGroupName;
        this.sponsorId = sponsorId;
        this.onSelectedSponsorId.emit(sponsorId);
        this.onSelectedSponsorName.emit(sponsorName);
    };
    AssignedSponsorsComponent.prototype.setRowClasses = function (sponsorId) {
        //console.log('row MemberID is ' + memberId);
        //console.log('session Assigned member ID is ' + this.session.getAssignedMemberId());
        var classes = {
            'success': true,
            'member-row': true,
            'clickable': true
        };
        return classes;
    };
    return AssignedSponsorsComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], AssignedSponsorsComponent.prototype, "onSelectedSponsorName", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AssignedSponsorsComponent.prototype, "onSelectedSponsorId", void 0);
AssignedSponsorsComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'assigned-sponsors',
        templateUrl: './assigned-sponsors.component.html',
        styleUrls: ['./assigned-sponsors.component.css'],
    }),
    __metadata("design:paramtypes", [SessionService,
        SqlResource])
], AssignedSponsorsComponent);
export { AssignedSponsorsComponent };
//# sourceMappingURL=assigned-sponsors.component.js.map