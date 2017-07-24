var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var AlphaLanguagePipe = (function () {
    function AlphaLanguagePipe() {
    }
    AlphaLanguagePipe.prototype.transform = function (value) {
        //console.log('AlphaLanguagePipe has value [' + value + ']');
        if (value === undefined) {
            this.result = 'not set';
        }
        else if (value === 2100) {
            this.result = 'English';
        }
        else if (value === 2101) {
            this.result = 'Spanish';
        }
        else
            this.result = 'unkown';
        return this.result;
    };
    return AlphaLanguagePipe;
}());
AlphaLanguagePipe = __decorate([
    Pipe({
        name: 'alphaLanguage'
    })
], AlphaLanguagePipe);
export { AlphaLanguagePipe };
//# sourceMappingURL=alpha-language-pipe.js.map