/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '../../../assets/css/forms.css.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '../../app_shared/components/loading-container.component.ngfactory';
import * as i3 from '../../../../../src/app/app_shared/components/loading-container.component';
import * as i4 from '@angular/forms';
import * as i5 from '@angular/common';
import * as i6 from '../../app_shared/components/display-errors.component.ngfactory';
import * as i7 from '../../../../../src/app/app_shared/components/display-errors.component';
import * as i8 from '../../../../../src/app/+admins/mr-summary-updates/mr-summary-updates.component';
import * as i9 from '@angular/router';
import * as i10 from '../../../../../src/app/app_shared/services/sql-resource';
const styles_MentorReportSummaryUpdatesComponent:any[] = [i0.styles];
export const RenderType_MentorReportSummaryUpdatesComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_MentorReportSummaryUpdatesComponent,data:{}});
function View_MentorReportSummaryUpdatesComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'alert alert-danger']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['','']))],(null as any),(_ck,
      _v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.errorMessage;
    _ck(_v,1,0,currVal_0);
  });
}
function View_MentorReportSummaryUpdatesComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'div',[['class',
      'alert alert-success']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['','']))],(null as any),(_ck,
      _v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.successMessage;
    _ck(_v,1,0,currVal_0);
  });
}
function View_MentorReportSummaryUpdatesComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),5,'div',[['class',
      'text-center col-md-4 col-md-offset-4']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n        '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),2,'loading-container',([] as any[]),
          (null as any),(null as any),(null as any),i2.View_LoadingContainerComponent_0,
          i2.RenderType_LoadingContainerComponent)),i1.ɵdid(49152,(null as any),0,
          i3.LoadingContainerComponent,([] as any[]),(null as any),(null as any)),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵted((null as any),
          ['\n      ']))],(null as any),(null as any));
}
function View_MentorReportSummaryUpdatesComponent_5(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),3,'option',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),i1.ɵdid(147456,
      (null as any),0,i4.NgSelectOption,[i1.ElementRef,i1.Renderer,[2,i4.SelectControlValueAccessor]],
      {value:[0,'value']},(null as any)),i1.ɵdid(147456,(null as any),0,i4.ɵq,[i1.ElementRef,
      i1.Renderer,[8,(null as any)]],{value:[0,'value']},(null as any)),(_l()(),i1.ɵted((null as any),
      ['','']))],(_ck,_v) => {
    const currVal_0:any = _v.context.$implicit.value;
    _ck(_v,1,0,currVal_0);
    const currVal_1:any = _v.context.$implicit.value;
    _ck(_v,2,0,currVal_1);
  },(_ck,_v) => {
    const currVal_2:any = _v.context.$implicit.label;
    _ck(_v,3,0,currVal_2);
  });
}
function View_MentorReportSummaryUpdatesComponent_6(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),3,'option',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),i1.ɵdid(147456,
      (null as any),0,i4.NgSelectOption,[i1.ElementRef,i1.Renderer,[2,i4.SelectControlValueAccessor]],
      {value:[0,'value']},(null as any)),i1.ɵdid(147456,(null as any),0,i4.ɵq,[i1.ElementRef,
      i1.Renderer,[8,(null as any)]],{value:[0,'value']},(null as any)),(_l()(),i1.ɵted((null as any),
      ['','']))],(_ck,_v) => {
    const currVal_0:any = _v.context.$implicit.value;
    _ck(_v,1,0,currVal_0);
    const currVal_1:any = _v.context.$implicit.value;
    _ck(_v,2,0,currVal_1);
  },(_ck,_v) => {
    const currVal_2:any = _v.context.$implicit.label;
    _ck(_v,3,0,currVal_2);
  });
}
function View_MentorReportSummaryUpdatesComponent_4(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),83,'div',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n\n\n        '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      80,'form',[['novalidate','']],[[2,'ng-untouched',(null as any)],[2,'ng-touched',
          (null as any)],[2,'ng-pristine',(null as any)],[2,'ng-dirty',(null as any)],
          [2,'ng-valid',(null as any)],[2,'ng-invalid',(null as any)],[2,'ng-pending',
              (null as any)]],[[(null as any),'submit'],[(null as any),'reset']],(_v,
          en,$event) => {
        var ad:boolean = true;
        if (('submit' === en)) {
          const pd_0:any = ((<any>i1.ɵnov(_v,4).onSubmit($event)) !== false);
          ad = (pd_0 && ad);
        }
        if (('reset' === en)) {
          const pd_1:any = ((<any>i1.ɵnov(_v,4).onReset()) !== false);
          ad = (pd_1 && ad);
        }
        return ad;
      },(null as any),(null as any))),i1.ɵdid(16384,(null as any),0,i4.ɵbh,([] as any[]),
      (null as any),(null as any)),i1.ɵdid(540672,(null as any),0,i4.FormGroupDirective,
      [[8,(null as any)],[8,(null as any)]],{form:[0,'form']},(null as any)),i1.ɵprd(2048,
      (null as any),i4.ControlContainer,(null as any),[i4.FormGroupDirective]),i1.ɵdid(16384,
      (null as any),0,i4.NgControlStatusGroup,[i4.ControlContainer],(null as any),
      (null as any)),(_l()(),i1.ɵted((null as any),['\n\n\n          '])),(_l()(),
      i1.ɵeld(0,(null as any),(null as any),1,'div',[['class','form-group']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
      ['\n\n          '])),(_l()(),i1.ɵted((null as any),['\n\n          '])),(_l()(),
      i1.ɵeld(0,(null as any),(null as any),19,'div',[['class','controls']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
      ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'label',
      [['for','summaryStatusSelector']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['Sponsor Summary Status:'])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),9,'select',[['class','form-control input-sm'],['formControlName',
              'summaryStatusSelector']],[[2,'ng-untouched',(null as any)],[2,'ng-touched',
              (null as any)],[2,'ng-pristine',(null as any)],[2,'ng-dirty',(null as any)],
              [2,'ng-valid',(null as any)],[2,'ng-invalid',(null as any)],[2,'ng-pending',
                  (null as any)]],[[(null as any),'ngModelChange'],[(null as any),
              'change'],[(null as any),'blur']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('change' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,17).onChange($event.target.value)) !== false);
              ad = (pd_0 && ad);
            }
            if (('blur' === en)) {
              const pd_1:any = ((<any>i1.ɵnov(_v,17).onTouched()) !== false);
              ad = (pd_1 && ad);
            }
            if (('ngModelChange' === en)) {
              const pd_2:any = ((<any>(_co.mentorReport.sponsorSummaryStatusId = $event)) !== false);
              ad = (pd_2 && ad);
            }
            return ad;
          },(null as any),(null as any))),i1.ɵdid(16384,(null as any),0,i4.SelectControlValueAccessor,
          [i1.Renderer,i1.ElementRef],(null as any),(null as any)),i1.ɵprd(1024,(null as any),
          i4.NG_VALUE_ACCESSOR,(p0_0:any) => {
            return [p0_0];
          },[i4.SelectControlValueAccessor]),i1.ɵdid(671744,(null as any),0,i4.FormControlName,
          [[3,i4.ControlContainer],[8,(null as any)],[8,(null as any)],[2,i4.NG_VALUE_ACCESSOR]],
          {name:[0,'name'],model:[1,'model']},{update:'ngModelChange'}),i1.ɵprd(2048,
          (null as any),i4.NgControl,(null as any),[i4.FormControlName]),i1.ɵdid(16384,
          (null as any),0,i4.NgControlStatus,[i4.NgControl],(null as any),(null as any)),
      (_l()(),i1.ɵted((null as any),['\n              '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_MentorReportSummaryUpdatesComponent_5)),
      i1.ɵdid(802816,(null as any),0,i5.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,
          i1.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),2,'display-errors',[['class','red'],
          ['control','summaryStatusSelector']],(null as any),(null as any),(null as any),
          i6.View_DisplayErrorsComponent_0,i6.RenderType_DisplayErrorsComponent)),
      i1.ɵdid(49152,(null as any),0,i7.DisplayErrorsComponent,[i4.FormGroupDirective],
          {errors:[0,'errors'],control:[1,'control']},(null as any)),i1.ɵpod(['required']),
      (_l()(),i1.ɵted((null as any),['\n          '])),(_l()(),i1.ɵted((null as any),
          ['\n\n          '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),15,'div',
          [['class','controls']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),1,'label',[['for','highlightStatusSelector']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['Highlight Status:'])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),9,'select',
          [['class','form-control input-sm'],['formControlName','highlightStatusSelector']],
          [[2,'ng-untouched',(null as any)],[2,'ng-touched',(null as any)],[2,'ng-pristine',
              (null as any)],[2,'ng-dirty',(null as any)],[2,'ng-valid',(null as any)],
              [2,'ng-invalid',(null as any)],[2,'ng-pending',(null as any)]],[[(null as any),
              'ngModelChange'],[(null as any),'change'],[(null as any),'blur']],(_v,
              en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('change' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,38).onChange($event.target.value)) !== false);
              ad = (pd_0 && ad);
            }
            if (('blur' === en)) {
              const pd_1:any = ((<any>i1.ɵnov(_v,38).onTouched()) !== false);
              ad = (pd_1 && ad);
            }
            if (('ngModelChange' === en)) {
              const pd_2:any = ((<any>(_co.mentorReport.highlightStatusId = $event)) !== false);
              ad = (pd_2 && ad);
            }
            return ad;
          },(null as any),(null as any))),i1.ɵdid(16384,(null as any),0,i4.SelectControlValueAccessor,
          [i1.Renderer,i1.ElementRef],(null as any),(null as any)),i1.ɵprd(1024,(null as any),
          i4.NG_VALUE_ACCESSOR,(p0_0:any) => {
            return [p0_0];
          },[i4.SelectControlValueAccessor]),i1.ɵdid(671744,(null as any),0,i4.FormControlName,
          [[3,i4.ControlContainer],[8,(null as any)],[8,(null as any)],[2,i4.NG_VALUE_ACCESSOR]],
          {name:[0,'name'],model:[1,'model']},{update:'ngModelChange'}),i1.ɵprd(2048,
          (null as any),i4.NgControl,(null as any),[i4.FormControlName]),i1.ɵdid(16384,
          (null as any),0,i4.NgControlStatus,[i4.NgControl],(null as any),(null as any)),
      (_l()(),i1.ɵted((null as any),['\n              '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_MentorReportSummaryUpdatesComponent_6)),
      i1.ɵdid(802816,(null as any),0,i5.NgForOf,[i1.ViewContainerRef,i1.TemplateRef,
          i1.IterableDiffers],{ngForOf:[0,'ngForOf']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵted((null as any),['\n          '])),(_l()(),
          i1.ɵted((null as any),['\n\n          '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),16,'div',[['class','controls']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'label',
          [['for','inputSummary']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['Sponsor Summary'])),(_l()(),
          i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,[['summary',
          1]],(null as any),6,'textarea',[['class','form-control input-sm'],['formControlName',
          'inputSummary'],['id','inputSummary'],['placeholder','Summary from Above'],
          ['type','text']],[[2,'ng-untouched',(null as any)],[2,'ng-touched',(null as any)],
          [2,'ng-pristine',(null as any)],[2,'ng-dirty',(null as any)],[2,'ng-valid',
              (null as any)],[2,'ng-invalid',(null as any)],[2,'ng-pending',(null as any)]],
          [[(null as any),'ngModelChange'],[(null as any),'input'],[(null as any),
              'blur'],[(null as any),'compositionstart'],[(null as any),'compositionend']],
          (_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('input' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,55)._handleInput($event.target.value)) !== false);
              ad = (pd_0 && ad);
            }
            if (('blur' === en)) {
              const pd_1:any = ((<any>i1.ɵnov(_v,55).onTouched()) !== false);
              ad = (pd_1 && ad);
            }
            if (('compositionstart' === en)) {
              const pd_2:any = ((<any>i1.ɵnov(_v,55)._compositionStart()) !== false);
              ad = (pd_2 && ad);
            }
            if (('compositionend' === en)) {
              const pd_3:any = ((<any>i1.ɵnov(_v,55)._compositionEnd($event.target.value)) !== false);
              ad = (pd_3 && ad);
            }
            if (('ngModelChange' === en)) {
              const pd_4:any = ((<any>(_co.mentorReport.sponsorSummary = $event)) !== false);
              ad = (pd_4 && ad);
            }
            return ad;
          },(null as any),(null as any))),i1.ɵdid(16384,(null as any),0,i4.DefaultValueAccessor,
          [i1.Renderer,i1.ElementRef,[2,i4.COMPOSITION_BUFFER_MODE]],(null as any),
          (null as any)),i1.ɵprd(1024,(null as any),i4.NG_VALUE_ACCESSOR,(p0_0:any) => {
        return [p0_0];
      },[i4.DefaultValueAccessor]),i1.ɵdid(671744,(null as any),0,i4.FormControlName,
          [[3,i4.ControlContainer],[8,(null as any)],[8,(null as any)],[2,i4.NG_VALUE_ACCESSOR]],
          {name:[0,'name'],model:[1,'model']},{update:'ngModelChange'}),i1.ɵprd(2048,
          (null as any),i4.NgControl,(null as any),[i4.FormControlName]),i1.ɵdid(16384,
          (null as any),0,i4.NgControlStatus,[i4.NgControl],(null as any),(null as any)),
      (_l()(),i1.ɵted((null as any),['          '])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),2,'display-errors',
          [['class','red'],['control','inputSummary']],(null as any),(null as any),
          (null as any),i6.View_DisplayErrorsComponent_0,i6.RenderType_DisplayErrorsComponent)),
      i1.ɵdid(49152,(null as any),0,i7.DisplayErrorsComponent,[i4.FormGroupDirective],
          {errors:[0,'errors'],control:[1,'control']},(null as any)),i1.ɵpod(['required',
          'maxlength']),(_l()(),i1.ɵted((null as any),['\n          '])),(_l()(),i1.ɵted((null as any),
          ['\n\n          '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),14,'div',
          [['class','col-md-6 col-md-offset-1']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),4,'span',([] as any[]),(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n                  '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          1,'button',[['class','btn btn-primary'],['style','width:80px;margin-right:10px']],
          (null as any),[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.onSubmit()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            Save\n                  '])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          [' \n            '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),5,'span',
          ([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n                '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),1,'button',[['class','btn btn-default'],['style','width:70px']],
          (null as any),[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            var _co:any = _v.component;
            if (('click' === en)) {
              const pd_0:any = ((<any>_co.onCancel()) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n            Cancel\n                  '])),
      (_l()(),i1.ɵted((null as any),['\n              '])),(_l()(),i1.ɵted((null as any),
          ['\n            '])),(_l()(),i1.ɵted((null as any),['\n          '])),(_l()(),
          i1.ɵted((null as any),['\n\n        '])),(_l()(),i1.ɵted((null as any),['\n      ']))],
      (_ck,_v) => {
        var _co:any = _v.component;
        const currVal_7:any = _co.frmUpdate;
        _ck(_v,4,0,currVal_7);
        const currVal_15:any = 'summaryStatusSelector';
        const currVal_16:any = _co.mentorReport.sponsorSummaryStatusId;
        _ck(_v,19,0,currVal_15,currVal_16);
        const currVal_17:any = _co.sponsorSummaryStatuses;
        _ck(_v,24,0,currVal_17);
        const currVal_18:any = _ck(_v,29,0,'Summary Status is required');
        const currVal_19:any = 'summaryStatusSelector';
        _ck(_v,28,0,currVal_18,currVal_19);
        const currVal_27:any = 'highlightStatusSelector';
        const currVal_28:any = _co.mentorReport.highlightStatusId;
        _ck(_v,40,0,currVal_27,currVal_28);
        const currVal_29:any = _co.highlightStatuses;
        _ck(_v,45,0,currVal_29);
        const currVal_37:any = 'inputSummary';
        const currVal_38:any = _co.mentorReport.sponsorSummary;
        _ck(_v,57,0,currVal_37,currVal_38);
        const currVal_39:any = _ck(_v,64,0,'An entry is required, even if it is just N/A',
            'Entry cannot exceed 2000 characters in length.');
        const currVal_40:any = 'inputSummary';
        _ck(_v,63,0,currVal_39,currVal_40);
      },(_ck,_v) => {
        const currVal_0:any = i1.ɵnov(_v,6).ngClassUntouched;
        const currVal_1:any = i1.ɵnov(_v,6).ngClassTouched;
        const currVal_2:any = i1.ɵnov(_v,6).ngClassPristine;
        const currVal_3:any = i1.ɵnov(_v,6).ngClassDirty;
        const currVal_4:any = i1.ɵnov(_v,6).ngClassValid;
        const currVal_5:any = i1.ɵnov(_v,6).ngClassInvalid;
        const currVal_6:any = i1.ɵnov(_v,6).ngClassPending;
        _ck(_v,2,0,currVal_0,currVal_1,currVal_2,currVal_3,currVal_4,currVal_5,currVal_6);
        const currVal_8:any = i1.ɵnov(_v,21).ngClassUntouched;
        const currVal_9:any = i1.ɵnov(_v,21).ngClassTouched;
        const currVal_10:any = i1.ɵnov(_v,21).ngClassPristine;
        const currVal_11:any = i1.ɵnov(_v,21).ngClassDirty;
        const currVal_12:any = i1.ɵnov(_v,21).ngClassValid;
        const currVal_13:any = i1.ɵnov(_v,21).ngClassInvalid;
        const currVal_14:any = i1.ɵnov(_v,21).ngClassPending;
        _ck(_v,16,0,currVal_8,currVal_9,currVal_10,currVal_11,currVal_12,currVal_13,
            currVal_14);
        const currVal_20:any = i1.ɵnov(_v,42).ngClassUntouched;
        const currVal_21:any = i1.ɵnov(_v,42).ngClassTouched;
        const currVal_22:any = i1.ɵnov(_v,42).ngClassPristine;
        const currVal_23:any = i1.ɵnov(_v,42).ngClassDirty;
        const currVal_24:any = i1.ɵnov(_v,42).ngClassValid;
        const currVal_25:any = i1.ɵnov(_v,42).ngClassInvalid;
        const currVal_26:any = i1.ɵnov(_v,42).ngClassPending;
        _ck(_v,37,0,currVal_20,currVal_21,currVal_22,currVal_23,currVal_24,currVal_25,
            currVal_26);
        const currVal_30:any = i1.ɵnov(_v,59).ngClassUntouched;
        const currVal_31:any = i1.ɵnov(_v,59).ngClassTouched;
        const currVal_32:any = i1.ɵnov(_v,59).ngClassPristine;
        const currVal_33:any = i1.ɵnov(_v,59).ngClassDirty;
        const currVal_34:any = i1.ɵnov(_v,59).ngClassValid;
        const currVal_35:any = i1.ɵnov(_v,59).ngClassInvalid;
        const currVal_36:any = i1.ɵnov(_v,59).ngClassPending;
        _ck(_v,54,0,currVal_30,currVal_31,currVal_32,currVal_33,currVal_34,currVal_35,
            currVal_36);
      });
}
export function View_MentorReportSummaryUpdatesComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),23,'div',[['class',
      'panel panel-primary']],(null as any),(null as any),(null as any),(null as any),
      (null as any))),(_l()(),i1.ɵted((null as any),['\n  '])),(_l()(),i1.ɵeld(0,(null as any),
      (null as any),1,'div',[['class','panel-heading'],['style','font-size:large']],
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['\n    Review Sponsor Summary for ','\n  '])),(_l()(),
      i1.ɵted((null as any),['\n  '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      17,'div',[['class','panel-body']],(null as any),(null as any),(null as any),
      (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
      i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_MentorReportSummaryUpdatesComponent_1)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
          i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_MentorReportSummaryUpdatesComponent_2)),
      i1.ɵdid(16384,(null as any),0,i5.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),8,'div',([] as any[]),(null as any),
              (null as any),(null as any),(null as any),(null as any))),i1.ɵdid(16384,
          (null as any),0,i5.NgSwitch,([] as any[]),{ngSwitch:[0,'ngSwitch']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n      '])),(_l()(),i1.ɵand(16777216,(null as any),
          (null as any),1,(null as any),View_MentorReportSummaryUpdatesComponent_3)),
      i1.ɵdid(278528,(null as any),0,i5.NgSwitchCase,[i1.ViewContainerRef,i1.TemplateRef,
          i5.NgSwitch],{ngSwitchCase:[0,'ngSwitchCase']},(null as any)),(_l()(),i1.ɵted((null as any),
          ['\n      '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),
          View_MentorReportSummaryUpdatesComponent_4)),i1.ɵdid(278528,(null as any),
          0,i5.NgSwitchCase,[i1.ViewContainerRef,i1.TemplateRef,i5.NgSwitch],{ngSwitchCase:[0,
              'ngSwitchCase']},(null as any)),(_l()(),i1.ɵted((null as any),['\n    '])),
      (_l()(),i1.ɵted((null as any),['\n  '])),(_l()(),i1.ɵted((null as any),['\n']))],
      (_ck,_v) => {
        var _co:i8.MentorReportSummaryUpdatesComponent = _v.component;
        const currVal_1:any = _co.errorMessage;
        _ck(_v,8,0,currVal_1);
        const currVal_2:any = _co.successMessage;
        _ck(_v,11,0,currVal_2);
        const currVal_3:any = _co.isLoading;
        _ck(_v,14,0,currVal_3);
        const currVal_4:any = true;
        _ck(_v,17,0,currVal_4);
        const currVal_5:any = false;
        _ck(_v,20,0,currVal_5);
      },(_ck,_v) => {
        var _co:i8.MentorReportSummaryUpdatesComponent = _v.component;
        const currVal_0:any = _co.mentorReport.studentName;
        _ck(_v,3,0,currVal_0);
      });
}
export function View_MentorReportSummaryUpdatesComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'ng-component',
      ([] as any[]),(null as any),(null as any),(null as any),View_MentorReportSummaryUpdatesComponent_0,
      RenderType_MentorReportSummaryUpdatesComponent)),i1.ɵdid(114688,(null as any),
      0,i8.MentorReportSummaryUpdatesComponent,[i9.ActivatedRoute,i9.Router,i10.SqlResource,
          i4.FormBuilder],(null as any),(null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const MentorReportSummaryUpdatesComponentNgFactory:i1.ComponentFactory<i8.MentorReportSummaryUpdatesComponent> = i1.ɵccf('ng-component',
    i8.MentorReportSummaryUpdatesComponent,View_MentorReportSummaryUpdatesComponent_Host_0,
    {},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvY2thcGlsbGEvRGV2L0pvdmVuZXNBLWNsaWVudC5DTEkvc3JjL2FwcC8rYWRtaW5zL21yLXN1bW1hcnktdXBkYXRlcy9tci1zdW1tYXJ5LXVwZGF0ZXMuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL2hvbWUvY2thcGlsbGEvRGV2L0pvdmVuZXNBLWNsaWVudC5DTEkvc3JjL2FwcC8rYWRtaW5zL21yLXN1bW1hcnktdXBkYXRlcy9tci1zdW1tYXJ5LXVwZGF0ZXMuY29tcG9uZW50LnRzIiwibmc6Ly8vaG9tZS9ja2FwaWxsYS9EZXYvSm92ZW5lc0EtY2xpZW50LkNMSS9zcmMvYXBwLythZG1pbnMvbXItc3VtbWFyeS11cGRhdGVzL21yLXN1bW1hcnktdXBkYXRlcy5jb21wb25lbnQuaHRtbCIsIm5nOi8vL2hvbWUvY2thcGlsbGEvRGV2L0pvdmVuZXNBLWNsaWVudC5DTEkvc3JjL2FwcC8rYWRtaW5zL21yLXN1bW1hcnktdXBkYXRlcy9tci1zdW1tYXJ5LXVwZGF0ZXMuY29tcG9uZW50LnRzLk1lbnRvclJlcG9ydFN1bW1hcnlVcGRhdGVzQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLXByaW1hcnlcIj5cbiAgPGRpdiBjbGFzcz1cInBhbmVsLWhlYWRpbmdcIiBzdHlsZT1cImZvbnQtc2l6ZTpsYXJnZVwiPlxuICAgIFJldmlldyBTcG9uc29yIFN1bW1hcnkgZm9yIHt7bWVudG9yUmVwb3J0LnN0dWRlbnROYW1lfX1cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJwYW5lbC1ib2R5XCI+XG4gICAgPGRpdiAqbmdJZj1cImVycm9yTWVzc2FnZVwiIGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+e3tlcnJvck1lc3NhZ2V9fTwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJzdWNjZXNzTWVzc2FnZVwiIGNsYXNzPVwiYWxlcnQgYWxlcnQtc3VjY2Vzc1wiPnt7c3VjY2Vzc01lc3NhZ2V9fTwvZGl2PlxuICAgIDxkaXYgW25nU3dpdGNoXT1cImlzTG9hZGluZ1wiPlxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiIGNsYXNzPVwidGV4dC1jZW50ZXIgY29sLW1kLTQgY29sLW1kLW9mZnNldC00XCI+XG4gICAgICAgIDxsb2FkaW5nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9sb2FkaW5nLWNvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj5cblxuXG4gICAgICAgIDxmb3JtIFtmb3JtR3JvdXBdPVwiZnJtVXBkYXRlXCI+XG5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sc1wiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInN1bW1hcnlTdGF0dXNTZWxlY3RvclwiPlNwb25zb3IgU3VtbWFyeSBTdGF0dXM6PC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3QgZm9ybUNvbnRyb2xOYW1lPVwic3VtbWFyeVN0YXR1c1NlbGVjdG9yXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgaW5wdXQtc21cIiBbKG5nTW9kZWwpXT1cIm1lbnRvclJlcG9ydC5zcG9uc29yU3VtbWFyeVN0YXR1c0lkXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IHN0YXR1cyBvZiBzcG9uc29yU3VtbWFyeVN0YXR1c2VzXCIgW3ZhbHVlXT1cInN0YXR1cy52YWx1ZVwiPnt7c3RhdHVzLmxhYmVsfX08L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPGRpc3BsYXktZXJyb3JzIGNvbnRyb2w9XCJzdW1tYXJ5U3RhdHVzU2VsZWN0b3JcIiBjbGFzcz1cInJlZFwiIFtlcnJvcnNdPVwie1xuICAgICAgICAgICAgICAgICAgJ3JlcXVpcmVkJzogJ1N1bW1hcnkgU3RhdHVzIGlzIHJlcXVpcmVkJ1xuICAgICAgICAgICAgICAgIH1cIj48L2Rpc3BsYXktZXJyb3JzPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xzXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiaGlnaGxpZ2h0U3RhdHVzU2VsZWN0b3JcIj5IaWdobGlnaHQgU3RhdHVzOjwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0IGZvcm1Db250cm9sTmFtZT1cImhpZ2hsaWdodFN0YXR1c1NlbGVjdG9yXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgaW5wdXQtc21cIiBbKG5nTW9kZWwpXT1cIm1lbnRvclJlcG9ydC5oaWdobGlnaHRTdGF0dXNJZFwiPlxuICAgICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBzdGF0dXMgb2YgaGlnaGxpZ2h0U3RhdHVzZXNcIiBbdmFsdWVdPVwic3RhdHVzLnZhbHVlXCI+e3tzdGF0dXMubGFiZWx9fTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbHNcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJpbnB1dFN1bW1hcnlcIj5TcG9uc29yIFN1bW1hcnk8L2xhYmVsPlxuICAgICAgICAgICAgPHRleHRhcmVhIGlkPVwiaW5wdXRTdW1tYXJ5XCIgI3N1bW1hcnkgZm9ybUNvbnRyb2xOYW1lPVwiaW5wdXRTdW1tYXJ5XCIgWyhuZ01vZGVsKV09XCJtZW50b3JSZXBvcnQuc3BvbnNvclN1bW1hcnlcIiB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGlucHV0LXNtXCIgcGxhY2Vob2xkZXI9XCJTdW1tYXJ5IGZyb20gQWJvdmVcIj5cbiAgICAgICAgICA8L3RleHRhcmVhPlxuICAgICAgICAgICAgPGRpc3BsYXktZXJyb3JzIGNvbnRyb2w9XCJpbnB1dFN1bW1hcnlcIiBjbGFzcz1cInJlZFwiIFtlcnJvcnNdPVwieydyZXF1aXJlZCc6ICdBbiBlbnRyeSBpcyByZXF1aXJlZCwgZXZlbiBpZiBpdCBpcyBqdXN0IE4vQScsXG4gICAgICAgICAgICAgICAgJ21heGxlbmd0aCc6ICdFbnRyeSBjYW5ub3QgZXhjZWVkIDIwMDAgY2hhcmFjdGVycyBpbiBsZW5ndGguJ1xuICAgICAgICAgICAgICAgIH1cIj48L2Rpc3BsYXktZXJyb3JzPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC02IGNvbC1tZC1vZmZzZXQtMVwiPlxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6ODBweDttYXJnaW4tcmlnaHQ6MTBweFwiXG4gICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25TdWJtaXQoKVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICBTYXZlXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvc3Bhbj4mbmJzcDtcbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDo3MHB4XCJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkNhbmNlbCgpXCI+XG4gICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInJlZFwiIFtoaWRkZW5dPVwiZnJtVXBkYXRlLnZhbGlkXCI+U3R1ZGVudCBTdW1tYXJ5IG11c3QgYmUgZmlsbGVkIGluIGJlZm9yZSBzYXZpbmcuXG4gICAgICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiIsIjxuZy1jb21wb25lbnQ+PC9uZy1jb21wb25lbnQ+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDS0k7TUFBQTtNQUFBLGdCQUFxRDs7O0lBQUE7SUFBQTs7OztvQkFDckQ7TUFBQTtNQUFBLGdCQUF3RDs7O0lBQUE7SUFBQTs7OztvQkFFdEQ7TUFBQTtNQUFBLDhCQUF1RTtNQUNyRTtVQUFBO2lEQUFBLFVBQUE7dUNBQUE7TUFBbUIsK0NBQ0M7VUFBQTs7O29CQWVkO01BQUEsK0VBQUE7TUFBQTtNQUFBLDBDQUFBO2tCQUFBLHNEQUE2RTtNQUFBO0lBQXZCO0lBQXRELFdBQXNELFNBQXREO0lBQXNEO0lBQXRELFdBQXNELFNBQXREOztJQUE2RTtJQUFBOzs7O29CQVU3RTtNQUFBLCtFQUFBO01BQUE7TUFBQSwwQ0FBQTtrQkFBQSxzREFBd0U7TUFBQTtJQUF2QjtJQUFqRCxXQUFpRCxTQUFqRDtJQUFpRDtJQUFqRCxXQUFpRCxTQUFqRDs7SUFBd0U7SUFBQTs7OztvQkF2QmhGO01BQUEsd0VBQTJCO2FBQUEsb0NBR3pCO01BQUE7VUFBQTtVQUFBO2NBQUE7bUJBQUE7UUFBQTtRQUFBO1VBQUE7VUFBQTtRQUFBO1FBQUE7VUFBQTtVQUFBO1FBQUE7UUFBQTtNQUFBLHVDQUFBO01BQUEsb0NBQUE7TUFBQSw4RUFBQTtNQUFBLGdGQUFBO01BQUE7TUFBQSxlQUE4QixxREFHNUI7YUFBQTtVQUFBLDBEQUF3QjtNQUFBLHFCQUVsQixtREFFTjthQUFBO1VBQUEsMERBQXNCO01BQUEscUJBQ3BCO01BQUE7TUFBQSw4QkFBbUM7TUFBK0IsbURBQ2xFO1VBQUE7Y0FBQTtjQUFBO2NBQUE7a0JBQUE7Y0FBQTtZQUFBO1lBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQThFO2NBQUE7Y0FBQTtZQUFBO1lBQTlFO1VBQUEsdUNBQUE7VUFBQSxnRUFBQTsrQkFBQTtZQUFBO1VBQUEsMENBQUE7VUFBQTtVQUFBLHFFQUFBO1VBQUEsc0VBQUE7VUFBQTtNQUFnSSxxREFDOUg7VUFBQTthQUFBOzRCQUFBLHlDQUFzRztVQUFBLHFCQUMvRjtNQUNUO1VBQUE7K0VBQUE7YUFBQTtVQUFBLGtFQUE0RDtNQUVwQyxpREFDcEI7VUFBQSxxQkFFTjtVQUFBO1VBQUEsZ0JBQXNCLG1EQUNwQjtpQkFBQTtjQUFBO01BQXFDLHNEQUF5QjtVQUFBLHFCQUM5RDtVQUFBO1VBQUE7Y0FBQTtjQUFBO2NBQUE7dUJBQUE7WUFBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFnRjtjQUFBO2NBQUE7WUFBQTtZQUFoRjtVQUFBLHVDQUFBO1VBQUEsZ0VBQUE7K0JBQUE7WUFBQTtVQUFBLDBDQUFBO1VBQUE7VUFBQSxxRUFBQTtVQUFBLHNFQUFBO1VBQUE7TUFBNkgscURBQzNIO1VBQUE7YUFBQTs0QkFBQSx5Q0FBaUc7VUFBQSxxQkFDMUYsaURBQ0w7aUJBQUEsb0NBRU47VUFBQTtVQUFBLDRDQUFzQjtVQUFBLHFCQUNwQjtVQUFBO1VBQUEsZ0JBQTBCLG9EQUF1QjtpQkFBQSxvQ0FDakQ7VUFBQTtVQUFBO1VBQUE7VUFBQTtjQUFBO1VBQUE7Y0FBQTtVQUFBO1lBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQUE7Y0FBQTtjQUFBO1lBQUE7WUFBQTtjQUFBO2NBQUE7WUFBQTtZQUFBO2NBQUE7Y0FBQTtZQUFBO1lBQW9FO2NBQUE7Y0FBQTtZQUFBO1lBQXBFO1VBQUEsdUNBQUE7VUFBQTtVQUFBLHNCQUFBO1FBQUE7TUFBQSxvQ0FBQTtVQUFBO1VBQUEscUVBQUE7VUFBQSxzRUFBQTtVQUFBO01BQ2lFLCtDQUN4RDtVQUFBLHFCQUNUO1VBQUE7VUFBQTthQUFBO1VBQUEsa0VBQW1EO1VBQUEsY0FFM0IsaURBQ3BCO1VBQUEscUJBRU47VUFBQTtVQUFBLDhCQUFzQztNQUNwQztVQUFBLDBEQUFNO1VBQUEsMkJBQ0E7VUFBQTtVQUFBO1lBQUE7WUFBQTtZQUVBO2NBQUE7Y0FBQTtZQUFBO1lBRkE7VUFBQSxnQ0FHQztNQUVRLG1EQUNSO1VBQUEsc0JBQ1A7VUFBQTtNQUFNLHVEQUNGO1VBQUE7VUFBQTtZQUFBO1lBQUE7WUFFRTtjQUFBO2NBQUE7WUFBQTtZQUZGO1VBQUEsZ0NBRXVCO01BRVoscURBRUo7VUFBQSxxQkFDSixpREFDSDtpQkFBQSxrQ0FFRDs7O1FBdEREO1FBQU4sV0FBTSxTQUFOO1FBU1k7UUFBc0U7UUFBOUUsWUFBUSxXQUFzRSxVQUE5RTtRQUNVO1FBQVIsWUFBUSxVQUFSO1FBRTBEO1FBQTVDO1FBQWhCLFlBQTRELFdBQTVDLFVBQWhCO1FBT1E7UUFBd0U7UUFBaEYsWUFBUSxXQUF3RSxVQUFoRjtRQUNVO1FBQVIsWUFBUSxVQUFSO1FBTW1DO1FBQStCO1FBQXBFLFlBQXFDLFdBQStCLFVBQXBFO1FBR21EO1lBQUE7UUFBbkM7UUFBaEIsWUFBbUQsV0FBbkMsVUFBaEI7O1FBN0JKO1FBQUE7UUFBQTtRQUFBO1FBQUE7UUFBQTtRQUFBO1FBQUEsV0FBQSxxRUFBQTtRQVNJO1FBQUE7UUFBQTtRQUFBO1FBQUE7UUFBQTtRQUFBO1FBQUEsWUFBQTtZQUFBLFVBQUE7UUFVQTtRQUFBO1FBQUE7UUFBQTtRQUFBO1FBQUE7UUFBQTtRQUFBLFlBQUE7WUFBQSxVQUFBO1FBT0E7UUFBQTtRQUFBO1FBQUE7UUFBQTtRQUFBO1FBQUE7UUFBQSxZQUFBO1lBQUEsVUFBQTs7OztvQkF6Q1o7TUFBQTtNQUFBLGdCQUFpQyx5Q0FDL0I7TUFBQTtNQUFBLHdFQUFtRDthQUFBLDhEQUU3QzthQUFBLDBCQUNOO01BQUE7TUFBQSw4QkFBd0IsMkNBQ3RCO2FBQUE7YUFBQTtVQUFBLHdCQUEyRSwyQ0FDM0U7aUJBQUE7YUFBQTtVQUFBLHdCQUFnRiwyQ0FDaEY7aUJBQUE7Y0FBQSxpRUFBQTtVQUFBO01BQTRCLDZDQUMxQjtVQUFBO2FBQUE7cUJBQUEsbURBR007VUFBQSxlQUNOO1VBQUEsb0RBQUE7VUFBQTtjQUFBLGdDQTBETTtNQUNGLHlDQUNGOzs7UUFuRUM7UUFBTCxXQUFLLFNBQUw7UUFDSztRQUFMLFlBQUssU0FBTDtRQUNLO1FBQUwsWUFBSyxTQUFMO1FBQ087UUFBTCxZQUFLLFNBQUw7UUFJSztRQUFMLFlBQUssU0FBTDs7O1FBWCtDO1FBQUE7Ozs7b0JDRHJEO01BQUE7b0RBQUEsVUFBQTtNQUFBO3dCQUFBO0lBQUE7Ozs7OyJ9
