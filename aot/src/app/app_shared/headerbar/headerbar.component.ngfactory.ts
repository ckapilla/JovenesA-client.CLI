/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from './headerbar.component.css.shim.ngstyle';
import * as i1 from '@angular/core';
import * as i2 from '@angular/common';
import * as i3 from '@angular/router';
import * as i4 from '../../../../../src/app/app_shared/headerbar/headerbar.component';
import * as i5 from '../../../../../src/app/app_shared/services/auth.service';
import * as i6 from '../../../../../src/app/app_shared/services/session.service';
const styles_HeaderbarComponent:any[] = [i0.styles];
export const RenderType_HeaderbarComponent:i1.RendererType2 = i1.ɵcrt({encapsulation:0,
    styles:styles_HeaderbarComponent,data:{}});
function View_HeaderbarComponent_1(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'button',[['class',
      'btn btn-primary btn-sm']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.auth.login()) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['Log In / Iniciar sesión']))],
      (null as any),(null as any));
}
function View_HeaderbarComponent_2(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),2,'span',([] as any[]),
      (null as any),(null as any),(null as any),(null as any),(null as any))),(_l()(),
      i1.ɵted((null as any),['Welcome ',' '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
      0,'br',([] as any[]),(null as any),(null as any),(null as any),(null as any),
      (null as any)))],(null as any),(_ck,_v) => {
    var _co:any = _v.component;
    const currVal_0:any = _co.auth.nickname;
    _ck(_v,1,0,currVal_0);
  });
}
function View_HeaderbarComponent_3(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'span',[['class',
      'link']],(null as any),[[(null as any),'click']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:any = _v.component;
    if (('click' === en)) {
      const pd_0:any = ((<any>_co.auth.logout()) !== false);
      ad = (pd_0 && ad);
    }
    return ad;
  },(null as any),(null as any))),(_l()(),i1.ɵted((null as any),['Log Out']))],(null as any),
      (null as any));
}
export function View_HeaderbarComponent_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),89,'div',[['class',
      'fixedbar']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n  '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),
          86,'div',[['class','container']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n    '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),83,'div',[['class','row']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n      '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),80,'div',[['class',
          'span12']],(null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),77,'div',[['class','logo']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n          '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),7,'div',[['class','pull-left']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),4,'h3',([] as any[]),(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i1.ɵted((null as any),['\n              '])),
      (_l()(),i1.ɵeld(0,(null as any),(null as any),1,'a',[['href','#']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵeld(0,
          (null as any),(null as any),0,'img',[['src','../../../assets/images/JAPrivadaLogo.png']],
          (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n          '])),(_l()(),i1.ɵted((null as any),['\n          '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),13,'div',[['class','pull-right']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),10,'section',[['id','login']],(null as any),(null as any),
          (null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n              '])),(_l()(),i1.ɵand(16777216,(null as any),(null as any),
          1,(null as any),View_HeaderbarComponent_1)),i1.ɵdid(16384,(null as any),
          0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,'ngIf']},(null as any)),
      (_l()(),i1.ɵted((null as any),['\n              '])),(_l()(),i1.ɵand(16777216,
          (null as any),(null as any),1,(null as any),View_HeaderbarComponent_2)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n              '])),
      (_l()(),i1.ɵand(16777216,(null as any),(null as any),1,(null as any),View_HeaderbarComponent_3)),
      i1.ɵdid(16384,(null as any),0,i2.NgIf,[i1.ViewContainerRef,i1.TemplateRef],{ngIf:[0,
          'ngIf']},(null as any)),(_l()(),i1.ɵted((null as any),['\n            '])),
      (_l()(),i1.ɵted((null as any),['\n          '])),(_l()(),i1.ɵted((null as any),
          ['\n          '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),50,'div',
          [['class','navi']],(null as any),(null as any),(null as any),(null as any),
          (null as any))),(_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),
          i1.ɵeld(0,(null as any),(null as any),47,'nav',([] as any[]),(null as any),
              (null as any),(null as any),(null as any),(null as any))),(_l()(),i1.ɵted((null as any),
          ['\n              '])),(_l()(),i1.ɵeld(0,(null as any),(null as any),8,'a',
          ([] as any[]),[[1,'target',0],[8,'href',4]],[[(null as any),'click']],(_v,
              en,$event) => {
            var ad:boolean = true;
            if (('click' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,39).onClick($event.button,$event.ctrlKey,
                  $event.metaKey,$event.shiftKey)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),i1.ɵdid(671744,[[2,4]],0,i3.RouterLinkWithHref,
          [i3.Router,i3.ActivatedRoute,i2.LocationStrategy],{routerLink:[0,'routerLink']},
          (null as any)),i1.ɵpad(1),i1.ɵdid(1720320,(null as any),2,i3.RouterLinkActive,
          [i3.Router,i1.ElementRef,i1.Renderer,i1.ChangeDetectorRef],{routerLinkActiveOptions:[0,
              'routerLinkActiveOptions'],routerLinkActive:[1,'routerLinkActive']},
          (null as any)),i1.ɵqud(603979776,1,{links:1}),i1.ɵqud(603979776,2,{linksWithHrefs:1}),
      i1.ɵpod(['exact']),i1.ɵpad(1),(_l()(),i1.ɵted((null as any),['Home'])),(_l()(),
          i1.ɵted((null as any),['\n              '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),7,'a',([] as any[]),[[8,'hidden',0],[1,'target',0],[8,'href',
              4]],[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            if (('click' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,49).onClick($event.button,$event.ctrlKey,
                  $event.metaKey,$event.shiftKey)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),i1.ɵdid(671744,[[4,4]],0,i3.RouterLinkWithHref,
          [i3.Router,i3.ActivatedRoute,i2.LocationStrategy],{routerLink:[0,'routerLink']},
          (null as any)),i1.ɵpad(1),i1.ɵdid(1720320,(null as any),2,i3.RouterLinkActive,
          [i3.Router,i1.ElementRef,i1.Renderer,i1.ChangeDetectorRef],{routerLinkActive:[0,
              'routerLinkActive']},(null as any)),i1.ɵqud(603979776,3,{links:1}),i1.ɵqud(603979776,
          4,{linksWithHrefs:1}),i1.ɵpad(1),(_l()(),i1.ɵted((null as any),['Admins'])),
      (_l()(),i1.ɵted((null as any),['\n              '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),7,'a',([] as any[]),[[8,'hidden',0],[1,'target',0],[8,'href',
              4]],[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            if (('click' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,58).onClick($event.button,$event.ctrlKey,
                  $event.metaKey,$event.shiftKey)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),i1.ɵdid(671744,[[6,4]],0,i3.RouterLinkWithHref,
          [i3.Router,i3.ActivatedRoute,i2.LocationStrategy],{routerLink:[0,'routerLink']},
          (null as any)),i1.ɵpad(1),i1.ɵdid(1720320,(null as any),2,i3.RouterLinkActive,
          [i3.Router,i1.ElementRef,i1.Renderer,i1.ChangeDetectorRef],{routerLinkActive:[0,
              'routerLinkActive']},(null as any)),i1.ɵqud(603979776,5,{links:1}),i1.ɵqud(603979776,
          6,{linksWithHrefs:1}),i1.ɵpad(1),(_l()(),i1.ɵted((null as any),['Mentors'])),
      (_l()(),i1.ɵted((null as any),['\n              '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),7,'a',([] as any[]),[[8,'hidden',0],[1,'target',0],[8,'href',
              4]],[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            if (('click' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,67).onClick($event.button,$event.ctrlKey,
                  $event.metaKey,$event.shiftKey)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),i1.ɵdid(671744,[[8,4]],0,i3.RouterLinkWithHref,
          [i3.Router,i3.ActivatedRoute,i2.LocationStrategy],{routerLink:[0,'routerLink']},
          (null as any)),i1.ɵpad(1),i1.ɵdid(1720320,(null as any),2,i3.RouterLinkActive,
          [i3.Router,i1.ElementRef,i1.Renderer,i1.ChangeDetectorRef],{routerLinkActive:[0,
              'routerLinkActive']},(null as any)),i1.ɵqud(603979776,7,{links:1}),i1.ɵqud(603979776,
          8,{linksWithHrefs:1}),i1.ɵpad(1),(_l()(),i1.ɵted((null as any),['Estudiantes'])),
      (_l()(),i1.ɵted((null as any),['\n              '])),(_l()(),i1.ɵeld(0,(null as any),
          (null as any),7,'a',([] as any[]),[[8,'hidden',0],[1,'target',0],[8,'href',
              4]],[[(null as any),'click']],(_v,en,$event) => {
            var ad:boolean = true;
            if (('click' === en)) {
              const pd_0:any = ((<any>i1.ɵnov(_v,76).onClick($event.button,$event.ctrlKey,
                  $event.metaKey,$event.shiftKey)) !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },(null as any),(null as any))),i1.ɵdid(671744,[[10,4]],0,i3.RouterLinkWithHref,
          [i3.Router,i3.ActivatedRoute,i2.LocationStrategy],{routerLink:[0,'routerLink']},
          (null as any)),i1.ɵpad(1),i1.ɵdid(1720320,(null as any),2,i3.RouterLinkActive,
          [i3.Router,i1.ElementRef,i1.Renderer,i1.ChangeDetectorRef],{routerLinkActive:[0,
              'routerLinkActive']},(null as any)),i1.ɵqud(603979776,9,{links:1}),i1.ɵqud(603979776,
          10,{linksWithHrefs:1}),i1.ɵpad(1),(_l()(),i1.ɵted((null as any),['Reports'])),
      (_l()(),i1.ɵted((null as any),['\n            '])),(_l()(),i1.ɵted((null as any),
          ['\n          '])),(_l()(),i1.ɵted((null as any),['\n        '])),(_l()(),
          i1.ɵted((null as any),['\n      '])),(_l()(),i1.ɵted((null as any),['\n    '])),
      (_l()(),i1.ɵted((null as any),['\n  '])),(_l()(),i1.ɵted((null as any),['\n'])),
      (_l()(),i1.ɵted((null as any),['\n']))],(_ck,_v) => {
    var _co:i4.HeaderbarComponent = _v.component;
    const currVal_0:boolean = !_co.auth.isAuthenticated();
    _ck(_v,24,0,currVal_0);
    const currVal_1:any = _co.auth.isAuthenticated();
    _ck(_v,27,0,currVal_1);
    const currVal_2:any = _co.auth.isAuthenticated();
    _ck(_v,30,0,currVal_2);
    const currVal_5:any = _ck(_v,40,0,'');
    _ck(_v,39,0,currVal_5);
    const currVal_6:any = _ck(_v,44,0,true);
    const currVal_7:any = _ck(_v,45,0,'active');
    _ck(_v,41,0,currVal_6,currVal_7);
    const currVal_11:any = _ck(_v,50,0,'admins');
    _ck(_v,49,0,currVal_11);
    const currVal_12:any = _ck(_v,54,0,'active');
    _ck(_v,51,0,currVal_12);
    const currVal_16:any = _ck(_v,59,0,'mentors');
    _ck(_v,58,0,currVal_16);
    const currVal_17:any = _ck(_v,63,0,'active');
    _ck(_v,60,0,currVal_17);
    const currVal_21:any = _ck(_v,68,0,'students');
    _ck(_v,67,0,currVal_21);
    const currVal_22:any = _ck(_v,72,0,'active');
    _ck(_v,69,0,currVal_22);
    const currVal_26:any = _ck(_v,77,0,'reports');
    _ck(_v,76,0,currVal_26);
    const currVal_27:any = _ck(_v,81,0,'active');
    _ck(_v,78,0,currVal_27);
  },(_ck,_v) => {
    var _co:i4.HeaderbarComponent = _v.component;
    const currVal_3:any = i1.ɵnov(_v,39).target;
    const currVal_4:any = i1.ɵnov(_v,39).href;
    _ck(_v,38,0,currVal_3,currVal_4);
    const currVal_8:boolean = !_co.isAdminWithValidToken();
    const currVal_9:any = i1.ɵnov(_v,49).target;
    const currVal_10:any = i1.ɵnov(_v,49).href;
    _ck(_v,48,0,currVal_8,currVal_9,currVal_10);
    const currVal_13:boolean = !_co.isMentorWithValidToken();
    const currVal_14:any = i1.ɵnov(_v,58).target;
    const currVal_15:any = i1.ɵnov(_v,58).href;
    _ck(_v,57,0,currVal_13,currVal_14,currVal_15);
    const currVal_18:boolean = !_co.isStudentWithValidToken();
    const currVal_19:any = i1.ɵnov(_v,67).target;
    const currVal_20:any = i1.ɵnov(_v,67).href;
    _ck(_v,66,0,currVal_18,currVal_19,currVal_20);
    const currVal_23:boolean = !_co.isAdminWithValidToken();
    const currVal_24:any = i1.ɵnov(_v,76).target;
    const currVal_25:any = i1.ɵnov(_v,76).href;
    _ck(_v,75,0,currVal_23,currVal_24,currVal_25);
  });
}
export function View_HeaderbarComponent_Host_0(_l:any):i1.ɵViewDefinition {
  return i1.ɵvid(0,[(_l()(),i1.ɵeld(0,(null as any),(null as any),1,'ja-headerbar',
      ([] as any[]),(null as any),(null as any),(null as any),View_HeaderbarComponent_0,
      RenderType_HeaderbarComponent)),i1.ɵdid(49152,(null as any),0,i4.HeaderbarComponent,
      [i5.Auth,i6.SessionService],(null as any),(null as any))],(null as any),(null as any));
}
export const HeaderbarComponentNgFactory:i1.ComponentFactory<i4.HeaderbarComponent> = i1.ɵccf('ja-headerbar',
    i4.HeaderbarComponent,View_HeaderbarComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL2hvbWUvY2thcGlsbGEvRGV2L0pvdmVuZXNBLWNsaWVudC5DTEkvc3JjL2FwcC9hcHBfc2hhcmVkL2hlYWRlcmJhci9oZWFkZXJiYXIuY29tcG9uZW50Lm5nZmFjdG9yeS50cyIsInZlcnNpb24iOjMsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5nOi8vL2hvbWUvY2thcGlsbGEvRGV2L0pvdmVuZXNBLWNsaWVudC5DTEkvc3JjL2FwcC9hcHBfc2hhcmVkL2hlYWRlcmJhci9oZWFkZXJiYXIuY29tcG9uZW50LnRzIiwibmc6Ly8vaG9tZS9ja2FwaWxsYS9EZXYvSm92ZW5lc0EtY2xpZW50LkNMSS9zcmMvYXBwL2FwcF9zaGFyZWQvaGVhZGVyYmFyL2hlYWRlcmJhci5jb21wb25lbnQuaHRtbCIsIm5nOi8vL2hvbWUvY2thcGlsbGEvRGV2L0pvdmVuZXNBLWNsaWVudC5DTEkvc3JjL2FwcC9hcHBfc2hhcmVkL2hlYWRlcmJhci9oZWFkZXJiYXIuY29tcG9uZW50LnRzLkhlYWRlcmJhckNvbXBvbmVudF9Ib3N0Lmh0bWwiXSwic291cmNlc0NvbnRlbnQiOlsiICIsIjxkaXYgY2xhc3M9XCJmaXhlZGJhclwiPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInNwYW4xMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibG9nb1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwdWxsLWxlZnRcIj5cbiAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIj48aW1nIHNyYz1cIi4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvSkFQcml2YWRhTG9nby5wbmdcIiAgLz48L2E+XG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwdWxsLXJpZ2h0XCI+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZD1cImxvZ2luXCI+XG4gICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtXCIgKGNsaWNrKT1cImF1dGgubG9naW4oKVwiICpuZ0lmPVwiIWF1dGguaXNBdXRoZW50aWNhdGVkKClcIj5Mb2cgSW4gLyBJbmljaWFyIHNlc2nDs248L2J1dHRvbj5cbiAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhdXRoLmlzQXV0aGVudGljYXRlZCgpXCI+V2VsY29tZSB7e2F1dGgubmlja25hbWV9fSA8YnIvPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsaW5rXCIgKGNsaWNrKT1cImF1dGgubG9nb3V0KClcIiAqbmdJZj1cImF1dGguaXNBdXRoZW50aWNhdGVkKClcIj5Mb2cgT3V0PC9zcGFuPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYXZpXCI+XG4gICAgICAgICAgICA8bmF2PlxuICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua0FjdGl2ZV09XCJbJ2FjdGl2ZSddXCIgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cInsgZXhhY3Q6IHRydWUgfVwiIFtyb3V0ZXJMaW5rXT1cIlsnJ11cIj5Ib21lPC9hPlxuICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua0FjdGl2ZV09XCJbJ2FjdGl2ZSddXCIgW3JvdXRlckxpbmtdPVwiWydhZG1pbnMnXVwiIFtoaWRkZW5dPSFpc0FkbWluV2l0aFZhbGlkVG9rZW4oKT5BZG1pbnM8L2E+XG4gICAgICAgICAgICAgIDxhIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIlsnYWN0aXZlJ11cIiBbcm91dGVyTGlua109XCJbJ21lbnRvcnMnXVwiIFtoaWRkZW5dPSFpc01lbnRvcldpdGhWYWxpZFRva2VuKCk+TWVudG9yczwvYT5cbiAgICAgICAgICAgICAgPGEgW3JvdXRlckxpbmtBY3RpdmVdPVwiWydhY3RpdmUnXVwiIFtyb3V0ZXJMaW5rXT1cIlsnc3R1ZGVudHMnXVwiIFtoaWRkZW5dPSFpc1N0dWRlbnRXaXRoVmFsaWRUb2tlbigpPkVzdHVkaWFudGVzPC9hPlxuICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua0FjdGl2ZV09XCJbJ2FjdGl2ZSddXCIgW3JvdXRlckxpbmtdPVwiWydyZXBvcnRzJ11cIiBbaGlkZGVuXT0haXNBZG1pbldpdGhWYWxpZFRva2VuKCk+UmVwb3J0czwvYT5cbiAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIiwiPGphLWhlYWRlcmJhcj48L2phLWhlYWRlcmJhcj4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ1ljO01BQUE7SUFBQTtJQUFBO0lBQXVDO01BQUE7TUFBQTtJQUFBO0lBQXZDO0VBQUEsZ0NBQThGOzs7O29CQUM5RjtNQUFBLHdFQUFxQzthQUFBLGtDQUEwQjtNQUFBO01BQUE7O0lBQTFCO0lBQUE7Ozs7b0JBQ3JDO01BQUE7SUFBQTtJQUFBO0lBQW1CO01BQUE7TUFBQTtJQUFBO0lBQW5CO0VBQUEsZ0NBQTBFOzs7O29CQWR4RjtNQUFBO01BQXNCLHlDQUNwQjtVQUFBO1VBQUEsOEJBQXVCO01BQ3JCO1VBQUEsMERBQWlCO1VBQUEsZUFDZjtVQUFBO01BQW9CLCtDQUNsQjtVQUFBO1VBQUEsOEJBQWtCO01BQ2hCO1VBQUE7TUFBdUIsbURBQ3JCO1VBQUE7VUFBQSw4QkFBSTtNQUNGO1VBQUEsMERBQVk7VUFBQTtVQUFBO01BQTJELG1EQUNwRTtVQUFBLG1CQUNELGlEQUNOO2lCQUFBO2NBQUE7TUFBd0IsbURBQ3RCO1VBQUE7VUFBQSw0Q0FBb0I7VUFBQSx1QkFDbEI7VUFBQSxtREFBQTtVQUFBO01BQThILHFEQUM5SDtVQUFBO2FBQUE7VUFBQSx3QkFBMkU7TUFDM0U7YUFBQTtVQUFBLHdCQUF3RjtNQUNoRixpREFDTjtVQUFBLG1CQUNOO1VBQUE7VUFBQSxnQkFBa0IsbURBQ2hCO2lCQUFBO2NBQUEsMERBQUs7VUFBQSx1QkFDSDtVQUFBO3VCQUFBO1lBQUE7WUFBQTtjQUFBO2tCQUFBO2NBQUE7WUFBQTtZQUFBO1VBQUEsdUNBQUE7VUFBQTtVQUFBLHNCQUErRSxXQUEvRTtVQUFBO2NBQUE7VUFBQTthQUFtQyxtQkFBaEMsSUFBZ0cseUNBQVE7aUJBQUEsc0NBQzNHO1VBQUE7Y0FBQTtZQUFBO1lBQUE7Y0FBQTtrQkFBQTtjQUFBO1lBQUE7WUFBQTtVQUFBLHVDQUFBO1VBQUE7VUFBQSxzQkFBbUMsV0FBbkM7VUFBQTtjQUFBO1VBQUEsNkJBQUcsSUFBNEY7TUFBVSxxREFDekc7VUFBQTtjQUFBO1lBQUE7WUFBQTtjQUFBO2tCQUFBO2NBQUE7WUFBQTtZQUFBO1VBQUEsdUNBQUE7VUFBQTtVQUFBLHNCQUFtQyxXQUFuQztVQUFBO2NBQUE7VUFBQSw2QkFBRyxJQUE4RjtNQUFXLHFEQUM1RztVQUFBO2NBQUE7WUFBQTtZQUFBO2NBQUE7a0JBQUE7Y0FBQTtZQUFBO1lBQUE7VUFBQSx1Q0FBQTtVQUFBO1VBQUEsc0JBQW1DLFdBQW5DO1VBQUE7Y0FBQTtVQUFBLDZCQUFHLElBQWdHO01BQWUscURBQ2xIO1VBQUE7Y0FBQTtZQUFBO1lBQUE7Y0FBQTtrQkFBQTtjQUFBO1lBQUE7WUFBQTtVQUFBLHVDQUFBO1VBQUE7VUFBQSxzQkFBbUMsV0FBbkM7VUFBQTtjQUFBO1VBQUEsOEJBQUcsSUFBNkY7TUFBVyxtREFDdkc7VUFBQSxtQkFDRiwrQ0FDRjtpQkFBQSw4QkFDRjtNQUNGLHlDQUNGO01BQ0Y7O0lBbEJzRTtJQUE5RCxZQUE4RCxTQUE5RDtJQUNNO0lBQU4sWUFBTSxTQUFOO0lBQzJDO0lBQTNDLFlBQTJDLFNBQTNDO0lBSytFO0lBQS9FLFlBQStFLFNBQS9FO0lBQW1DO0lBQWhDO0lBQUgsWUFBbUMsVUFBaEMsU0FBSDtJQUNtQztJQUFuQyxZQUFtQyxVQUFuQztJQUFHO0lBQUgsWUFBRyxVQUFIO0lBQ21DO0lBQW5DLFlBQW1DLFVBQW5DO0lBQUc7SUFBSCxZQUFHLFVBQUg7SUFDbUM7SUFBbkMsWUFBbUMsVUFBbkM7SUFBRztJQUFILFlBQUcsVUFBSDtJQUNtQztJQUFuQyxZQUFtQyxVQUFuQztJQUFHO0lBQUgsWUFBRyxVQUFIOzs7SUFKQTtJQUFBO0lBQUEsWUFBQSxtQkFBQTtJQUM2RDtJQUE3RDtJQUFBO0lBQUEsWUFBNkQsVUFBN0Qsb0JBQUE7SUFDOEQ7SUFBOUQ7SUFBQTtJQUFBLFlBQThELFdBQTlELHFCQUFBO0lBQytEO0lBQS9EO0lBQUE7SUFBQSxZQUErRCxXQUEvRCxxQkFBQTtJQUM4RDtJQUE5RDtJQUFBO0lBQUEsWUFBOEQsV0FBOUQscUJBQUE7Ozs7b0JDdkJkO01BQUE7bUNBQUEsVUFBQTtNQUFBOzs7In0=
