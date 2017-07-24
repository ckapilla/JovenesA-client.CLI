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
var StudentsStudentStatusComponent = (function () {
    function StudentsStudentStatusComponent(currRoute, sqlResource, router, session) {
        this.currRoute = currRoute;
        this.sqlResource = sqlResource;
        this.router = router;
        this.session = session;
        console.log('Hi from student List Ctrl controller function');
        this.smileys = ['/assets/images/frownSmiley.jpg',
            '/assets/images/neutralSmiley.jpg',
            '/assets/images/greenSmiley.jpg',
            '/assets/images/NA.jpg'
        ];
        this.isLoading = false;
    }
    StudentsStudentStatusComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ngOnInit');
        //et id = this.currRoute.snapshot.params['id'];
        var id = this.session.getStudentId();
        console.log('stdudentStatus with studentId: ' + id);
        this.isLoading = true;
        this.sqlResource.getStudentDTO(id)
            .subscribe(function (data) { _this.studentDTOs = data; }, function (err) { return console.error('Subscribe error: ' + err); }, function () { console.log('done'); _this.isLoading = false; });
    };
    return StudentsStudentStatusComponent;
}());
StudentsStudentStatusComponent = __decorate([
    Component({
        moduleId: module.id,
        templateUrl: './students-student-status.component.html',
        styleUrls: ['./students-student-status.component.css'],
    }),
    __metadata("design:paramtypes", [ActivatedRoute,
        SqlResource,
        Router,
        SessionService])
], StudentsStudentStatusComponent);
export { StudentsStudentStatusComponent };
//# sourceMappingURL=students-student-status.component.js.map