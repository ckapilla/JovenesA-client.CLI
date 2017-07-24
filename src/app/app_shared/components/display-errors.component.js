var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Input, Host } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
var DisplayErrorsComponent = (function () {
    // constructor(@Host() private formDir: NgForm) {}
    function DisplayErrorsComponent(myFormGroupDirective) {
        this.myFormGroupDirective = myFormGroupDirective;
    }
    Object.defineProperty(DisplayErrorsComponent.prototype, "currentError", {
        get: function () {
            var _this = this;
            this.myFormGroup = this.myFormGroupDirective.control;
            var control = this.myFormGroup.controls[this.control];
            //console.log(control);
            var errorMessages = [];
            if (control && (control.touched || !control.pristine)) {
                // console.log(Object.keys(this.errors));
                //   // [key1, key2]
                // console.log(Object.keys(this.errors)
                //   .map(k => control.hasError(k) ? (<any> this.errors)[k] : null));
                //   // [text of msg1 (has error), null (no error)]
                // console.log(Object.keys(this.errors)
                //   .map(k => control.hasError(k) ? (<any> this.errors)[k] : null)
                //   .filter(error => !!error));
                //   // [text of msg1 ]
                errorMessages = Object.keys(this.errors)
                    .map(function (k) { return control.hasError(k) ? _this.errors[k] : null; })
                    .filter(function (error) { return !!error; });
            }
            return errorMessages.pop();
        },
        enumerable: true,
        configurable: true
    });
    return DisplayErrorsComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], DisplayErrorsComponent.prototype, "errors", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], DisplayErrorsComponent.prototype, "control", void 0);
DisplayErrorsComponent = __decorate([
    Component({
        template: "<div>{{currentError}}</div>",
        selector: 'display-errors'
    }),
    __param(0, Host()),
    __metadata("design:paramtypes", [FormGroupDirective])
], DisplayErrorsComponent);
export { DisplayErrorsComponent };
//# sourceMappingURL=display-errors.component.js.map