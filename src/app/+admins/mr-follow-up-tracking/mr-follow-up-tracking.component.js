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
import { SqlResource } from '../../app_shared/services/sql-resource';
import { Router } from '@angular/router';
import { SessionService } from '../../app_shared/services/session.service';
var MentorReportsFollowUpTrackingComponent = (function () {
    function MentorReportsFollowUpTrackingComponent(sqlResource, router, session) {
        this.sqlResource = sqlResource;
        this.router = router;
        this.session = session;
        this.followUpStatuses = [
            { value: '0', label: '[All]' },
            { value: '2091', label: 'Requested' },
            { value: '2092', label: 'Assigned' },
            { value: '2104', label: 'Closed' }
        ];
        this.smileys = ['/assets/images/frownSmiley.jpg',
            '/assets/images/neutralSmiley.jpg',
            '/assets/images/greenSmiley.jpg',
            '/assets/images/NA.jpg'
        ];
    }
    MentorReportsFollowUpTrackingComponent.prototype.ngOnInit = function () {
        this.fetchData();
    };
    MentorReportsFollowUpTrackingComponent.prototype.fetchData = function () {
        var _this = this;
        this.isLoading = true;
        console.log('in fetchData for MentorReportsFollowUp');
        this.sqlResource.getMentorReportsFollowUpStatus()
            .subscribe(function (data) { _this.mentorReportsFollowUp = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () { console.log('done >>'); console.log(_this.mentorReportsFollowUp[0]); console.log('<<'); _this.isLoading = false; });
    };
    // setSelectedSponsorSummaryStatus(status: string) {
    //   // console.log('selected status: ' + status);
    //   this.selectedSponsorSummaryStatus = status;
    //   this.fetchFilteredData();
    // }
    MentorReportsFollowUpTrackingComponent.prototype.gotoStudent = function (id, studentName) {
        console.log('setting studentName to ' + studentName);
        this.session.setAssignedStudentName(studentName);
        var link = ['/admins/students/student/' + id];
        // const link = ['/admins/students/mentorReports/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    MentorReportsFollowUpTrackingComponent.prototype.gotoFollowUpUpdate = function (id) {
        var link = ['/admins/mentor-reports/follow-up-updates/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    return MentorReportsFollowUpTrackingComponent;
}());
MentorReportsFollowUpTrackingComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'mr-follow-up-tracking.component.html',
    }),
    __metadata("design:paramtypes", [SqlResource,
        Router,
        SessionService])
], MentorReportsFollowUpTrackingComponent);
export { MentorReportsFollowUpTrackingComponent };
//# sourceMappingURL=mr-follow-up-tracking.component.js.map