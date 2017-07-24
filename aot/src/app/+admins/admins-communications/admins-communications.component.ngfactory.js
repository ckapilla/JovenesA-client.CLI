/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
/* tslint:disable */
import * as i0 from './admins-communications.component.css.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../app_shared/components/loading-container.component.ngfactory';
import * as i3 from '../../../../../src/app/app_shared/components/loading-container.component';
import * as i4 from '@angular/common';
import * as i5 from '../../../../../src/app/+admins/admins-communications/admins-communications.component';
import * as i6 from '@angular/forms';
import * as i7 from '@angular/router';
import * as i8 from '../../../../../src/app/app_shared/services/sql-resource';
import * as i9 from '../../../../../src/app/app_shared/services/session.service';
var styles_AdminsCommunicationsComponent = [i0.styles];
export var RenderType_AdminsCommunicationsComponent = i1.ɵcrt({ encapsulation: 0,
    styles: styles_AdminsCommunicationsComponent, data: {} });
function View_AdminsCommunicationsComponent_1(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, null, null, 1, 'span', [['class',
                'alert alert-danger']], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['', '']))], null, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.errorMessage;
        _ck(_v, 1, 0, currVal_0);
    });
}
function View_AdminsCommunicationsComponent_2(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, null, null, 1, 'span', [['class',
                'alert alert-success']], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['', '']))], null, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.successMessage;
        _ck(_v, 1, 0, currVal_0);
    });
}
function View_AdminsCommunicationsComponent_3(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, null, null, 5, 'div', [['class',
                'text-center col-md-4 col-md-offset-4']], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n        '])),
        (_l()(), i1.ɵeld(0, null, null, 2, 'loading-container', [], null, null, null, i2.View_LoadingContainerComponent_0, i2.RenderType_LoadingContainerComponent)), i1.ɵdid(49152, null, 0, i3.LoadingContainerComponent, [], null, null),
        (_l()(), i1.ɵted(null, ['\n        '])), (_l()(), i1.ɵted(null, ['\n      ']))], null, null);
}
function View_AdminsCommunicationsComponent_5(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, null, null, 22, 'tr', [], null, null, null, null, null)), (_l()(),
            i1.ɵted(null, ['\n              '])), (_l()(), i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n                ',
            '\n              '])), (_l()(), i1.ɵted(null, ['\n              '])), (_l()(),
            i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n                ', '\n              '])), (_l()(), i1.ɵted(null, ['\n              '])),
        (_l()(), i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n                ', '\n              '])), (_l()(), i1.ɵted(null, ['\n              '])), (_l()(), i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)),
        (_l()(), i1.ɵted(null, ['\n                ', '\n              '])), (_l()(),
            i1.ɵted(null, ['\n              '])), (_l()(), i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n                ',
            '\n              '])), (_l()(), i1.ɵted(null, ['\n              '])),
        (_l()(), i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n                ', '\n              '])), (_l()(), i1.ɵted(null, ['\n              '])), (_l()(), i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)),
        (_l()(), i1.ɵted(null, ['\n                ', '\n              '])), (_l()(),
            i1.ɵted(null, ['\n            ']))], null, function (_ck, _v) {
        var currVal_0 = (_v.context.index + 1);
        _ck(_v, 3, 0, currVal_0);
        var currVal_1 = _v.context.$implicit.communicationDateTime;
        _ck(_v, 6, 0, currVal_1);
        var currVal_2 = _v.context.$implicit.memberId;
        _ck(_v, 9, 0, currVal_2);
        var currVal_3 = _v.context.$implicit.methodId;
        _ck(_v, 12, 0, currVal_3);
        var currVal_4 = _v.context.$implicit.categoryId;
        _ck(_v, 15, 0, currVal_4);
        var currVal_5 = _v.context.$implicit.relatedStudentId;
        _ck(_v, 18, 0, currVal_5);
        var currVal_6 = _v.context.$implicit.comments;
        _ck(_v, 21, 0, currVal_6);
    });
}
function View_AdminsCommunicationsComponent_4(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, null, null, 40, 'div', [], null, null, null, null, null)), (_l()(),
            i1.ɵted(null, ['\n        '])), (_l()(), i1.ɵeld(0, null, null, 37, 'table', [['class', 'table']], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n\n          '])), (_l()(), i1.ɵeld(0, null, null, 28, 'thead', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n            '])),
        (_l()(), i1.ɵeld(0, null, null, 25, 'tr', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n              '])), (_l()(), i1.ɵted(null, ['\n              '])),
        (_l()(), i1.ɵeld(0, null, null, 0, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n              '])), (_l()(), i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)),
        (_l()(), i1.ɵted(null, ['Date/Time'])), (_l()(), i1.ɵted(null, ['\n              '])), (_l()(), i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)),
        (_l()(), i1.ɵted(null, ['Member'])), (_l()(), i1.ɵted(null, ['\n              '])),
        (_l()(), i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['Method'])), (_l()(), i1.ɵted(null, ['\n              '])), (_l()(),
            i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['Category'])), (_l()(), i1.ɵted(null, ['\n              '])), (_l()(),
            i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['Related Student'])), (_l()(), i1.ɵted(null, ['\n              '])),
        (_l()(), i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['Comments'])), (_l()(), i1.ɵted(null, ['\n              '])), (_l()(),
            i1.ɵeld(0, null, null, 1, 'td', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['Communication History'])), (_l()(), i1.ɵted(null, ['\n            '])),
        (_l()(), i1.ɵted(null, ['\n          '])), (_l()(), i1.ɵted(null, ['\n          '])), (_l()(), i1.ɵeld(0, null, null, 4, 'tbody', [], null, null, null, null, null)),
        (_l()(), i1.ɵted(null, ['\n            '])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_AdminsCommunicationsComponent_5)),
        i1.ɵdid(802816, null, 0, i4.NgForOf, [i1.ViewContainerRef, i1.TemplateRef,
            i1.IterableDiffers], { ngForOf: [0, 'ngForOf'] }, null), (_l()(), i1.ɵted(null, ['\n          '])), (_l()(), i1.ɵted(null, ['\n        '])), (_l()(),
            i1.ɵted(null, ['\n      ']))], function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.communications;
        _ck(_v, 37, 0, currVal_0);
    }, null);
}
export function View_AdminsCommunicationsComponent_0(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, null, null, 51, 'div', [['class',
                'panel panel-primary']], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n  '])), (_l()(), i1.ɵeld(0, null, null, 16, 'div', [['class', 'panel-heading'], ['style', 'font-size:large']], null, null, null, null, null)), (_l()(),
            i1.ɵted(null, ['\n    '])), (_l()(), i1.ɵeld(0, null, null, 1, 'span', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['Communications for'])), (_l()(),
            i1.ɵted(null, ['\n    '])), (_l()(), i1.ɵeld(0, null, null, 1, 'span', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['', ''])), (_l()(), i1.ɵted(null, ['\n    '])), (_l()(), i1.ɵeld(0, null, null, 7, 'span', [], null, null, null, null, null)), (_l()(),
            i1.ɵted(null, ['\n      '])), (_l()(), i1.ɵeld(0, null, null, 4, 'span', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n        '])), (_l()(), i1.ɵeld(0, null, null, 1, 'span', [['class', 'btn btn-default active'], ['style',
                'margin-left:10px']], null, [[null, 'click']], function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (('click' === en)) {
                var pd_0 = (_co.communicationAdd(1216) !== false);
                ad = (pd_0 && ad);
            }
            return ad;
        }, null, null)), (_l()(), i1.ɵted(null, ['\n            Add New Communication\n      '])),
        (_l()(), i1.ɵted(null, ['\n      '])), (_l()(), i1.ɵted(null, ['\n    '])),
        (_l()(), i1.ɵted(null, ['\n  '])), (_l()(), i1.ɵted(null, ['\n  '])),
        (_l()(), i1.ɵeld(0, null, null, 31, 'div', [['class', 'panel-body']], null, null, null, null, null)),
        (_l()(), i1.ɵted(null, ['\n  '])), (_l()(), i1.ɵeld(0, null, null, 28, 'div', [['class', 'panel-body']], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n    '])),
        (_l()(), i1.ɵand(16777216, null, null, 1, null, View_AdminsCommunicationsComponent_1)),
        i1.ɵdid(16384, null, 0, i4.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0,
                'ngIf'] }, null), (_l()(), i1.ɵted(null, ['\n    '])), (_l()(),
            i1.ɵand(16777216, null, null, 1, null, View_AdminsCommunicationsComponent_2)),
        i1.ɵdid(16384, null, 0, i4.NgIf, [i1.ViewContainerRef, i1.TemplateRef], { ngIf: [0,
                'ngIf'] }, null), (_l()(), i1.ɵted(null, ['\n\n    '])), (_l()(),
            i1.ɵeld(0, null, null, 9, 'div', [], null, null, null, null, null)), (_l()(), i1.ɵted(null, ['\n      '])), (_l()(), i1.ɵeld(0, null, null, 6, 'form', [['novalidate',
                '']], [[2, 'ng-untouched', null], [2, 'ng-touched', null], [2,
                'ng-pristine', null], [2, 'ng-dirty', null], [2, 'ng-valid',
                null], [2, 'ng-invalid', null], [2, 'ng-pending', null]], [[null, 'submit'], [null, 'reset']], function (_v, en, $event) {
            var ad = true;
            if (('submit' === en)) {
                var pd_0 = (i1.ɵnov(_v, 34).onSubmit($event) !== false);
                ad = (pd_0 && ad);
            }
            if (('reset' === en)) {
                var pd_1 = (i1.ɵnov(_v, 34).onReset() !== false);
                ad = (pd_1 && ad);
            }
            return ad;
        }, null, null)), i1.ɵdid(16384, null, 0, i6.ɵbh, [], null, null), i1.ɵdid(16384, null, 0, i6.NgForm, [[8,
                null], [8, null]], null, null), i1.ɵprd(2048, null, i6.ControlContainer, null, [i6.NgForm]), i1.ɵdid(16384, null, 0, i6.NgControlStatusGroup, [i6.ControlContainer], null, null), (_l()(), i1.ɵted(null, ['\n        '])), (_l()(), i1.ɵted(null, ['\n      '])), (_l()(), i1.ɵted(null, ['\n\n    '])), (_l()(), i1.ɵted(null, ['\n    '])), (_l()(), i1.ɵeld(0, null, null, 8, 'div', [], null, null, null, null, null)),
        i1.ɵdid(16384, null, 0, i4.NgSwitch, [], { ngSwitch: [0, 'ngSwitch'] }, null), (_l()(), i1.ɵted(null, ['\n      '])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_AdminsCommunicationsComponent_3)),
        i1.ɵdid(278528, null, 0, i4.NgSwitchCase, [i1.ViewContainerRef, i1.TemplateRef,
            i4.NgSwitch], { ngSwitchCase: [0, 'ngSwitchCase'] }, null), (_l()(), i1.ɵted(null, ['\n      '])), (_l()(), i1.ɵand(16777216, null, null, 1, null, View_AdminsCommunicationsComponent_4)), i1.ɵdid(278528, null, 0, i4.NgSwitchCase, [i1.ViewContainerRef, i1.TemplateRef, i4.NgSwitch], { ngSwitchCase: [0, 'ngSwitchCase'] }, null), (_l()(), i1.ɵted(null, ['\n    '])), (_l()(), i1.ɵted(null, ['\n  '])), (_l()(), i1.ɵted(null, ['\n\n\n  l\n']))], function (_ck, _v) {
        var _co = _v.component;
        var currVal_1 = _co.errorMessage;
        _ck(_v, 25, 0, currVal_1);
        var currVal_2 = _co.successMessage;
        _ck(_v, 28, 0, currVal_2);
        var currVal_10 = _co.isLoading;
        _ck(_v, 42, 0, currVal_10);
        var currVal_11 = true;
        _ck(_v, 45, 0, currVal_11);
        var currVal_12 = false;
        _ck(_v, 48, 0, currVal_12);
    }, function (_ck, _v) {
        var _co = _v.component;
        var currVal_0 = _co.memberId;
        _ck(_v, 8, 0, currVal_0);
        var currVal_3 = i1.ɵnov(_v, 36).ngClassUntouched;
        var currVal_4 = i1.ɵnov(_v, 36).ngClassTouched;
        var currVal_5 = i1.ɵnov(_v, 36).ngClassPristine;
        var currVal_6 = i1.ɵnov(_v, 36).ngClassDirty;
        var currVal_7 = i1.ɵnov(_v, 36).ngClassValid;
        var currVal_8 = i1.ɵnov(_v, 36).ngClassInvalid;
        var currVal_9 = i1.ɵnov(_v, 36).ngClassPending;
        _ck(_v, 32, 0, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9);
    });
}
export function View_AdminsCommunicationsComponent_Host_0(_l) {
    return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, null, null, 1, 'ng-component', [], null, null, null, View_AdminsCommunicationsComponent_0, RenderType_AdminsCommunicationsComponent)), i1.ɵdid(114688, null, 0, i5.AdminsCommunicationsComponent, [i7.ActivatedRoute, i8.SqlResource, i7.Router, i9.SessionService], null, null)], function (_ck, _v) {
        _ck(_v, 1, 0);
    }, null);
}
export var AdminsCommunicationsComponentNgFactory = i1.ɵccf('ng-component', i5.AdminsCommunicationsComponent, View_AdminsCommunicationsComponent_Host_0, {}, {}, []);
//# sourceMappingURL=admins-communications.component.ngfactory.js.map