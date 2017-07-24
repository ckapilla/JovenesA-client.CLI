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
import { SessionService } from '../../app_shared/services/session.service';
var GradeTrackingComponent = (function () {
    function GradeTrackingComponent(router, session) {
        this.router = router;
        this.session = session;
        this.smileys = ['/assets/images/frownSmiley.jpg',
            '/assets/images/neutralSmiley.jpg',
            '/assets/images/greenSmiley.jpg',
            '/assets/images/NA.jpg'
        ];
    }
    GradeTrackingComponent.prototype.ngOnInit = function () {
        this.fetchData();
    };
    GradeTrackingComponent.prototype.fetchData = function () {
        this.isLoading = true;
        console.log('in fetchData for LatestMentorReports');
        // this.sqlReports.getLatestMentorReports()
        //   .subscribe(
        //     data => {this.latestMentorReports = data;},
        //     err => console.error('Subscribe error: ' + err),
        //     () => { console.log('done'); console.log(this.latestMentorReports[0]); this.isLoading = false;}
        //   );
    };
    return GradeTrackingComponent;
}());
GradeTrackingComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: 'grade-tracking.component.html'
    }),
    __metadata("design:paramtypes", [Router,
        SessionService])
], GradeTrackingComponent);
export { GradeTrackingComponent };
//# sourceMappingURL=grade-tracking.component.js.map