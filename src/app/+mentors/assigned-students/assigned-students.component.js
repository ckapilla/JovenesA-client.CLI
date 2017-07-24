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
var AssignedStudentsComponent = (function () {
    //@Output() onNoAssignedStudents = new EventEmitter();
    function AssignedStudentsComponent(session, sqlResource) {
        this.session = session;
        this.sqlResource = sqlResource;
        this.smileys = [];
        this.errorMessage = '';
        this.onSelectedStudentName = new EventEmitter();
        this.onSelectedStudentId = new EventEmitter();
        this.smileys[0] = 'frownSmiley.jpg';
        this.smileys[1] = 'neutralSmiley.jpg';
        this.smileys[2] = 'greenSmiley.jpg';
        this.smileys[3] = 'NA.jpg';
        console.log('in AssignedStudentsComponent constructor');
        //session.setAssignedStudentId(223);
    }
    AssignedStudentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sqlResource.getStudentsForMentor(this.session.getUserId())
            .subscribe(function (data) { _this.studentMentors = data; console.log(_this.studentMentors); }, function (err) { return console.error('Subscribe error: ' + err); }, function () {
            console.log('assigned-students loaded ' + _this.studentMentors.length + ' rows');
            if (_this.studentMentors.length > 0) {
                _this.selectFirstRow();
            }
            else {
                _this.errorMessage = 'No Assigned Students for this mentor.';
                //this.onNoAssignedStudents.emit();
            }
        });
    };
    AssignedStudentsComponent.prototype.selectFirstRow = function () {
        console.log('First row Id is ' + this.studentMentors[0].studentId + ' ' +
            this.studentMentors[0].studentFirstNames + ' ' + this.studentMentors[0].studentLastNames);
        this.setRowClasses(+this.studentMentors[0].studentId);
        this.selectStudent(+this.studentMentors[0].studentId, 0);
    };
    AssignedStudentsComponent.prototype.selectStudent = function (studentId, idx) {
        console.log('student selected studentId: ' + studentId + 'idx: ' + idx);
        var studentName = this.studentMentors[idx].studentLastNames + ', ' + this.studentMentors[idx].studentFirstNames;
        this.studentId = studentId;
        this.onSelectedStudentId.emit(studentId);
        this.onSelectedStudentName.emit(studentName);
    };
    AssignedStudentsComponent.prototype.setRowClasses = function (studentId) {
        //console.log('row StudentID is ' + studentId);
        //console.log('session Assigned student ID is ' + this.session.getAssignedStudentId());
        var classes = {
            'success': studentId === this.studentId,
            'student-row': true,
            'clickable': true
        };
        return classes;
    };
    return AssignedStudentsComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], AssignedStudentsComponent.prototype, "onSelectedStudentName", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], AssignedStudentsComponent.prototype, "onSelectedStudentId", void 0);
AssignedStudentsComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'assigned-students',
        templateUrl: './assigned-students.component.html'
    }),
    __metadata("design:paramtypes", [SessionService,
        SqlResource])
], AssignedStudentsComponent);
export { AssignedStudentsComponent };
//# sourceMappingURL=assigned-students.component.js.map