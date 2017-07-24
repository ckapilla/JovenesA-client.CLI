var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by colinjlacy on 4/25/16.
 */
import { Component } from '@angular/core';
var LoadingContainerComponent = (function () {
    //@Input() isLoading: boolean;
    function LoadingContainerComponent() {
        //console.log("passed in isLoading is " + this.isLoading);
    }
    return LoadingContainerComponent;
}());
LoadingContainerComponent = __decorate([
    Component({
        selector: 'loading-container',
        template: "\n    <div>\n<style type='text/css'> width: 100%;\n@-webkit-keyframes uilsquare {\n  0% {\n    background-color: #047ab3;\n  }\n  1% {\n    background-color: #00cde8;\n  }\n  11% {\n    background-color: #00cde8;\n  }\n  21% {\n    background-color: #047ab3;\n  }\n  100% {\n    background-color: #047ab3;\n  }\n}\n@-webkit-keyframes uilsquare {\n  0% {\n    background-color: #047ab3;\n  }\n  1% {\n    background-color: #00cde8;\n  }\n  11% {\n    background-color: #00cde8;\n  }\n  21% {\n    background-color: #047ab3;\n  }\n  100% {\n    background-color: #047ab3;\n  }\n}\n@-moz-keyframes uilsquare {\n  0% {\n    background-color: #047ab3;\n  }\n  1% {\n    background-color: #00cde8;\n  }\n  11% {\n    background-color: #00cde8;\n  }\n  21% {\n    background-color: #047ab3;\n  }\n  100% {\n    background-color: #047ab3;\n  }\n}\n@-ms-keyframes uilsquare {\n  0% {\n    background-color: #047ab3;\n  }\n  1% {\n    background-color: #00cde8;\n  }\n  11% {\n    background-color: #00cde8;\n  }\n  21% {\n    background-color: #047ab3;\n  }\n  100% {\n    background-color: #047ab3;\n  }\n}\n@-moz-keyframes uilsquare {\n  0% {\n    background-color: #047ab3;\n  }\n  1% {\n    background-color: #00cde8;\n  }\n  11% {\n    background-color: #00cde8;\n  }\n  21% {\n    background-color: #047ab3;\n  }\n  100% {\n    background-color: #047ab3;\n  }\n}\n@-webkit-keyframes uilsquare {\n  0% {\n    background-color: #047ab3;\n  }\n  1% {\n    background-color: #00cde8;\n  }\n  11% {\n    background-color: #00cde8;\n  }\n  21% {\n    background-color: #047ab3;\n  }\n  100% {\n    background-color: #047ab3;\n  }\n}\n@-o-keyframes uilsquare {\n  0% {\n    background-color: #047ab3;\n  }\n  1% {\n    background-color: #00cde8;\n  }\n  11% {\n    background-color: #00cde8;\n  }\n  21% {\n    background-color: #047ab3;\n  }\n  100% {\n    background-color: #047ab3;\n  }\n}\n@keyframes uilsquare {\n  0% {\n    background-color: #047ab3;\n  }\n  1% {\n    background-color: #00cde8;\n  }\n  11% {\n    background-color: #00cde8;\n  }\n  21% {\n    background-color: #047ab3;\n  }\n  100% {\n    background-color: #047ab3;\n  }\n}\n.uil-squares-css {\n  background: none;\n  position: relative;\n  width: 200px;\n  height: 200px;\n}\n.uil-squares-css div {\n  position: absolute;\n  z-index: 1;\n  width: 40px;\n  height: 40px;\n  background-color: #047ab3;\n}\n.uil-squares-css div > div {\n  position: absolute;\n  top: 0;\n  left: 0;\n  -ms-animation: uilsquare 1s linear infinite;\n  -moz-animation: uilsquare 1s linear infinite;\n  -webkit-animation: uilsquare 1s linear infinite;\n  -o-animation: uilsquare 1s linear infinite;\n  animation: uilsquare 1s linear infinite;\n  width: 40px;\n  height: 40px;\n}\n.uil-squares-css > div:nth-of-type(1) {\n  top: 30px;\n  left: 30px;\n}\n.uil-squares-css > div:nth-of-type(1) > div {\n  -ms-animation-delay: 0s;\n  -moz-animation-delay: 0s;\n  -webkit-animation-delay: 0s;\n  -o-animation-delay: 0s;\n  animation-delay: 0s;\n}\n.uil-squares-css > div:nth-of-type(2) {\n  top: 30px;\n  left: 80px;\n}\n.uil-squares-css > div:nth-of-type(2) > div {\n  -ms-animation-delay: 0.125s;\n  -moz-animation-delay: 0.125s;\n  -webkit-animation-delay: 0.125s;\n  -o-animation-delay: 0.125s;\n  animation-delay: 0.125s;\n}\n.uil-squares-css > div:nth-of-type(3) {\n  top: 30px;\n  left: 130px;\n}\n.uil-squares-css > div:nth-of-type(3) > div {\n  -ms-animation-delay: 0.25s;\n  -moz-animation-delay: 0.25s;\n  -webkit-animation-delay: 0.25s;\n  -o-animation-delay: 0.25s;\n  animation-delay: 0.25s;\n}\n.uil-squares-css > div:nth-of-type(4) {\n  top: 80px;\n  left: 130px;\n}\n.uil-squares-css > div:nth-of-type(4) > div {\n  -ms-animation-delay: 0.375s;\n  -moz-animation-delay: 0.375s;\n  -webkit-animation-delay: 0.375s;\n  -o-animation-delay: 0.375s;\n  animation-delay: 0.375s;\n}\n.uil-squares-css > div:nth-of-type(5) {\n  top: 130px;\n  left: 130px;\n}\n.uil-squares-css > div:nth-of-type(5) > div {\n  -ms-animation-delay: 0.5s;\n  -moz-animation-delay: 0.5s;\n  -webkit-animation-delay: 0.5s;\n  -o-animation-delay: 0.5s;\n  animation-delay: 0.5s;\n}\n.uil-squares-css > div:nth-of-type(6) {\n  top: 130px;\n  left: 80px;\n}\n.uil-squares-css > div:nth-of-type(6) > div {\n  -ms-animation-delay: 0.625s;\n  -moz-animation-delay: 0.625s;\n  -webkit-animation-delay: 0.625s;\n  -o-animation-delay: 0.625s;\n  animation-delay: 0.625s;\n}\n.uil-squares-css > div:nth-of-type(7) {\n  top: 130px;\n  left: 30px;\n}\n.uil-squares-css > div:nth-of-type(7) > div {\n  -ms-animation-delay: 0.75s;\n  -moz-animation-delay: 0.75s;\n  -webkit-animation-delay: 0.75s;\n  -o-animation-delay: 0.75s;\n  animation-delay: 0.75s;\n}\n.uil-squares-css > div:nth-of-type(8) {\n  top: 80px;\n  left: 30px;\n}\n.uil-squares-css > div:nth-of-type(8) > div {\n  -ms-animation-delay: 0.875s;\n  -moz-animation-delay: 0.875s;\n  -webkit-animation-delay: 0.875s;\n  -o-animation-delay: 0.875s;\n  animation-delay: 0.875s;\n}\n </style> <div class='uil-squares-css' style='transform:scale(0.25);'><div><div></div></div><div><div></div></div><div><div></div></div>\n <div><div></div></div><div><div></div></div><div><div></div></div><div>\n <div></div></div><div><div></div></div></div>\n    </div>"
    }),
    __metadata("design:paramtypes", [])
], LoadingContainerComponent);
export { LoadingContainerComponent };
// export class LoadingPage {
//     public loading: boolean;
//     constructor(val: boolean) {
//         this.loading = val;
//     }
//     standby() {
//         this.loading = true;
//     }
//     ready() {
//         this.loading = false;
//     }
// }
//# sourceMappingURL=loading-container.component.js.map