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
var AdminsCommunicationsComponent = (function () {
    function AdminsCommunicationsComponent(currRoute, sqlResource, router, session) {
        this.currRoute = currRoute;
        this.sqlResource = sqlResource;
        this.router = router;
        this.session = session;
        console.log('Hi from member List Ctrl controller function');
        this.types = [
            // { value: '0', label: '[All]' },
            { value: '2068', label: 'Admin' },
            { value: '1007', label: 'BoardMember' },
            { value: '1013', label: 'Donor' },
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
    AdminsCommunicationsComponent.prototype.ngOnInit = function () {
        console.log('ngOnInit');
        var Id = this.currRoute.snapshot.params['id'];
        this.fetchFilteredData(Id);
    };
    // can't rely on two way binding to have updated the selected values
    // in time so we do it manually below
    AdminsCommunicationsComponent.prototype.fetchFilteredData = function (memberId) {
        var _this = this;
        console.log('>>>>sqlResource for getCommunicationsForMember: ' +
            'memberId: ' + memberId);
        this.isLoading = true;
        this.sqlResource.getCommunicationsForMember(memberId)
            .subscribe(function (data) {
            _this.communications = data;
            console.log('subscribe data is ', _this.communications);
            _this.successMessage = 'Data retrieved successfully';
        }, function (err) { _this.errorMessage = err; }, function () { console.log('done is', _this.communications); _this.isLoading = false; });
    };
    AdminsCommunicationsComponent.prototype.communicationAdd = function (memberId) {
        console.log('in communication: communicationAdd, ready to navigate');
        // this.studentId = this.session.getAssignedStudentId();
        var target = '/admins/members/communications-add/' + memberId;
        this.router.navigateByUrl(target); // , //{mentorId: this.mentorId, studentId: this.studentId}]);
    };
    return AdminsCommunicationsComponent;
}());
AdminsCommunicationsComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: './admins-communications.component.html',
        styleUrls: ['./admins-communications.component.css'],
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        SqlResource,
        Router,
        SessionService])
], AdminsCommunicationsComponent);
export { AdminsCommunicationsComponent };
//# sourceMappingURL=admins-communications.component.js.map