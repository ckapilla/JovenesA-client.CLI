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
import { SessionService } from '../../app_shared/services/session.service';
import { SqlResource } from '../../app_shared/services/sql-resource';
var MentorReportsSummaryTrackingComponent = (function () {
    function MentorReportsSummaryTrackingComponent(router, session, sqlResource, route) {
        this.router = router;
        this.session = session;
        this.sqlResource = sqlResource;
        this.route = route;
        this.years = [
            { value: '2017', label: '2017' }
        ];
        this.months = [
            { value: '0', label: 'Select' },
            { value: '1', label: 'Jan' },
            { value: '2', label: 'Feb' },
            { value: '3', label: 'Mar' },
            { value: '4', label: 'Apr' },
            { value: '5', label: 'May' },
            { value: '6', label: 'Jun' },
            { value: '7', label: 'Jul' },
            { value: '8', label: 'Aug' },
            { value: '9', label: 'Sep' },
            { value: '10', label: 'Oct' },
            { value: '11', label: 'Nov' },
            { value: '12', label: 'Dec' }
        ];
        this.sponsorSummaryStatuses = [
            { value: '0', label: '[All]' },
            { value: '2086', label: 'NeedsSetup' },
            { value: '2087', label: 'NeedsReview' },
            { value: '2088', label: 'ReadyToSend' },
            { value: '2089', label: 'Sent' },
            { value: '2090', label: 'Skipped' }
        ];
        this.highlightStatuses = [
            { value: '0', label: '[All]' },
            { value: '2105', label: 'Internal' },
            { value: '2106', label: 'Internal/External' },
        ];
        // this.followUpStatuses = [
        //   { value: '0', label: '[All]' },
        //   { value: '2091', label: 'Flagged' },
        //   { value: '2092', label: 'Assigned' },
        //   { value: '2104', label: 'Closed' },
        // ];
        var today = new Date();
        this.selectedYear = '' + today.getFullYear(); // '2017';
        this.selectedMonth = '0'; // + today.getMonth() + 1;// '5';
        this.selectedSponsorSummaryStatus = this.sponsorSummaryStatuses[0].value;
        this.selectedHighlightStatus = this.highlightStatuses[0].value;
        this.smileys = ['/assets/images/frownSmiley.jpg',
            '/assets/images/neutralSmiley.jpg',
            '/assets/images/greenSmiley.jpg',
            '/assets/images/NA.jpg'
        ];
    }
    MentorReportsSummaryTrackingComponent.prototype.ngOnInit = function () {
        console.log('in OnInit');
        var month = this.route.snapshot.queryParams['month'];
        console.log('month param = ' + month);
        if (month !== undefined) {
            this.selectedMonth = month;
        }
        var summary = this.route.snapshot.queryParams['summary'];
        console.log('summary param = ' + summary);
        if (month !== undefined) {
            this.selectedSponsorSummaryStatus = summary;
        }
        var highlight = this.route.snapshot.queryParams['highlight'];
        console.log('highlight param = ' + highlight);
        if (highlight !== undefined) {
            this.selectedHighlightStatus = highlight;
        }
        this.fetchFilteredData();
    };
    MentorReportsSummaryTrackingComponent.prototype.fetchFilteredData = function () {
        var _this = this;
        this.isLoading = true;
        console.log('in fetchData for MentorReportsByMonth');
        this.sqlResource.getMentorReportsByMonth(this.selectedYear, this.selectedMonth, this.selectedSponsorSummaryStatus, this.selectedHighlightStatus)
            .subscribe(function (data) { _this.mentorReportByMonth = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () {
            console.log('data loaded now set timeout for scroll');
            setTimeout(function () {
                _this.scrollIntoView();
            }, 0);
            _this.isLoading = false;
        });
    };
    MentorReportsSummaryTrackingComponent.prototype.scrollIntoView = function () {
        var idSelector = '#' + this.route.snapshot.queryParams['id'];
        console.log('id param = ' + this.route.snapshot.queryParams['id']);
        var element = document.querySelector(idSelector);
        if (element) {
            console.log('querySelector returns element ' + element);
            element.scrollIntoView(true);
        }
    };
    MentorReportsSummaryTrackingComponent.prototype.setSelectedSponsorSummaryStatus = function (status) {
        this.selectedSponsorSummaryStatus = status;
        this.fetchFilteredData();
    };
    MentorReportsSummaryTrackingComponent.prototype.setSelectedHighlightStatus = function (status) {
        this.selectedHighlightStatus = status;
        this.fetchFilteredData();
    };
    MentorReportsSummaryTrackingComponent.prototype.setSelectedYear = function (year) {
        this.selectedYear = year;
        this.fetchFilteredData();
    };
    MentorReportsSummaryTrackingComponent.prototype.setSelectedMonth = function (month) {
        this.selectedMonth = month;
        this.fetchFilteredData();
    };
    MentorReportsSummaryTrackingComponent.prototype.gotoStudent = function (id, studentName) {
        console.log('setting studentName to ' + studentName);
        this.session.setAssignedStudentName(studentName);
        var link = ['/admins/students/student/' + id];
        //const link = ['/admins/students/mentorReports/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    MentorReportsSummaryTrackingComponent.prototype.gotoMentorReport = function (id) {
        var link = ['/admins/mentor-reports/summary-updates/' + id];
        console.log('navigating to ' + link);
        this.router.navigate(link);
    };
    MentorReportsSummaryTrackingComponent.prototype.translationNeeded = function (lang1, lang2) {
        console.log(lang1, lang2);
        return (lang1 === lang2) ? '' : 'Translation Needed';
    };
    return MentorReportsSummaryTrackingComponent;
}());
MentorReportsSummaryTrackingComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'mr-summary-tracking.component.html'
    }),
    __metadata("design:paramtypes", [Router,
        SessionService,
        SqlResource,
        ActivatedRoute])
], MentorReportsSummaryTrackingComponent);
export { MentorReportsSummaryTrackingComponent };
//# sourceMappingURL=mr-summary-tracking.component.js.map