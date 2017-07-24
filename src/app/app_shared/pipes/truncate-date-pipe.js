var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var TruncateDatePipe = (function () {
    function TruncateDatePipe() {
    }
    TruncateDatePipe.prototype.transform = function (value) {
        console.log('TruncateDatePipe has value ' + value);
        var x = (value !== undefined && value !== null) ? value.indexOf('T') : 0;
        console.log('TruncateDatePipe has index of ' + x);
        return (x > 0) ? value.substring(0, (x)) : '[NO DATE!]';
    };
    return TruncateDatePipe;
}());
TruncateDatePipe = __decorate([
    Pipe({
        name: 'truncateDate'
    })
], TruncateDatePipe);
export { TruncateDatePipe };
//# sourceMappingURL=truncate-date-pipe.js.map