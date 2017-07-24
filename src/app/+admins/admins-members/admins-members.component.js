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
import { Router } from '@angular/router';
import { SqlResource } from '../../app_shared/services/sql-resource';
import { SessionService } from '../../app_shared/services/session.service';
var AdminsMembersComponent = (function () {
    function AdminsMembersComponent(sqlResource, router, session) {
        this.sqlResource = sqlResource;
        this.router = router;
        this.session = session;
        console.log('Hi from member List Ctrl controller function');
        this.types = [
            { value: '1012', label: 'Employee' },
            // { value: '1011', label: 'ESOLTutor' },
            { value: '1010', label: 'Mentor' },
            { value: '2072', label: 'NonPerson' },
            { value: '2041', label: 'Pledger' },
            { value: '2040', label: 'President' },
            // { value: '2066', label: 'LegacyDonor' },
            // { value: '2067', label: '[All]' },
            { value: '1009', label: 'Sponsor' },
            // { value: '2069', label: 'Student' },
            { value: '1008', label: 'Volunteer' }
        ];
        // this.selectedTypeLabel = this.types[3].label;
        // this.gradeRptsStatus = 'yellowWarning.jpg'
        // this.gpaStatus = 'greenCheck.jpg'
        this.smileys = ['/assets/images/frownSmiley.jpg',
            '/assets/images/neutralSmiley.jpg',
            '/assets/images/greenSmiley.jpg',
            '/assets/images/NA.jpg'
        ];
        this.isLoading = false;
    }
    Object.defineProperty(AdminsMembersComponent.prototype, "selectedType", {
        get: function () {
            return this._selectedType;
        },
        set: function (value) {
            // console.log('selected type: ' + objValue);
            this._selectedType = value;
            this.fetchFilteredData(value.label);
        },
        enumerable: true,
        configurable: true
    });
    AdminsMembersComponent.prototype.ngOnInit = function () {
        console.log('ngOnInit');
        this.selectedType = this.types[3];
        this.fetchFilteredData(this.selectedType.label);
    };
    // can't rely on two way binding to have updated the selected values
    // in time so we do it manually below
    AdminsMembersComponent.prototype.fetchFilteredData = function (type) {
        var _this = this;
        // console.log('sqlResource for getMembers: ' +
        //        'status: ' + this.selectedStatus + ' ' +
        //        'yearjoined: ' + this.selectedYearJoined +  + ' ' +
        //        'gradyear: ' + this.selectedGradYear
        //        );
        this.isLoading = true;
        this.sqlResource.getMemberStudentRelations(type)
            .subscribe(function (data) { _this.members = data; _this.successMessage = 'Data loaded successfully'; }, function (err) { return _this.errorMessage = err; }, function () { console.log('done'); _this.isLoading = false; });
    };
    AdminsMembersComponent.prototype.gotoMember = function (id, memberName) {
        console.log('setting memberName to ' + memberName);
        // this.session.setAssignedMemberName(memberName);
        var link = ['/admins/members/member/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    AdminsMembersComponent.prototype.gotoCommunications = function (id, memberName) {
        var link = ['/admins/members/communications/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    return AdminsMembersComponent;
}());
AdminsMembersComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: './admins-members.component.html',
        styleUrls: ['./admins-members.component.css'],
    }),
    __metadata("design:paramtypes", [SqlResource,
        Router,
        SessionService])
], AdminsMembersComponent);
export { AdminsMembersComponent };
//# sourceMappingURL=admins-members.component.js.map