(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"/JM1":function(t,e,o){"use strict";o.d(e,"a",(function(){return a}));var s=o("tk/3"),n=o("JIr8"),r=o("jEWH"),i=o("HS3z"),c=o("fXoL");let a=(()=>{class t extends r.a{constructor(t,e){super(t,e),this.http=t,this.webApiPrefixService=e}getMentorReport2(t){const e=this.WebApiPrefix+"mentor_reports2/"+t;return console.log("sending AuthHttp get request for MentorReport2 with "+e),this.http.get(e).pipe(Object(n.a)(this.handleError))}getMentorReport2RPTsViaGUID(t,e){const o=this.WebApiPrefix+"mentor_reports2/"+t+"/"+e;return console.log("sending AuthHttp get request for MentorReports2 with "+o),this.http.get(o).pipe(Object(n.a)(this.handleError))}updateMentorReport2(t){const e=this.WebApiPrefix+"mentor_reports2";let o=JSON.stringify({mentorReport:t});const n=JSON.parse(o);o=JSON.stringify(n.mentorReport);const r=(new s.c).set("Content-Type","application/json");return this.http.put(e,o,{headers:r})}addMentorReport2(t){const e=this.WebApiPrefix+"mentor_reports2";let o=JSON.stringify({mentorReport:t});const n=JSON.parse(o);o=JSON.stringify(n.mentorReport);const r=(new s.c).set("Content-Type","application/json");return this.http.post(e,o,{headers:r})}deleteMentorReport2(t){const e=this.WebApiPrefix+"mentor_reports2/"+t;return console.log("ready to delete mentorReport "+e),this.http.delete(e)}getMentorReportsByPeriod(t,e,o,s){const r=this.WebApiPrefix+"mentor_reports/by_period?year="+t+"&period="+e+"&reviewedStatusId="+o+"&studentGUId="+s;return console.log("sending AuthHttp get request for MentorReportsByPeriod with "+r),this.http.get(r).pipe(Object(n.a)(this.handleError))}getMentorReportsByMonth(t,e,o){const s=this.WebApiPrefix+"mentor_reports2/by_month?year="+t+"&month="+e+"&reviewedStatusId="+o;return console.log("sending AuthHttp get request for MentorReportsByMonth with "+s),this.http.get(s).pipe(Object(n.a)(this.handleError))}getMentorReportsStatusCounts(t,e){const o=this.WebApiPrefix+"mentor_reports2/status_counts?year="+t+"&month="+e;return console.log("sending AuthHttp get request for MentorReportsStatusCounts with "+o),this.http.get(o).pipe(Object(n.a)(this.handleError))}getMentorReportSubmittedCounts(){const t=this.WebApiPrefix+"reports/mentor_report_submitted_counts";return console.log("sending AuthHttp get request for MentorReportSubmittedCounts with "+t),this.http.get(t).pipe(Object(n.a)(this.handleError))}}return t.\u0275fac=function(e){return new(e||t)(c.Zb(s.a),c.Zb(i.a))},t.\u0275prov=c.Ib({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},"1w/L":function(t,e,o){"use strict";o.d(e,"a",(function(){return l}));var s=o("fXoL"),n=o("tyNb"),r=o("ofXK"),i=o("X8Ev"),c=o("JlJ6");function a(t,e){if(1&t){const t=s.Sb();s.Rb(0,"div",2),s.Rb(1,"div",3),s.Rb(2,"div",4),s.Rb(3,"span",5),s.Bc(4),s.fc(5,"truncateDate"),s.Qb(),s.Rb(6,"span",5),s.Bc(7),s.Qb(),s.Rb(8,"span",5),s.Bc(9," \xa0Student: [ "),s.Rb(10,"span",6),s.cc("click",(function(){s.sc(t);const o=e.$implicit;return s.ec().gotoStudent(o.studentGUId)})),s.Bc(11),s.Qb(),s.Bc(12," ] "),s.Qb(),s.Qb(),s.Rb(13,"div",7),s.Rb(14,"span",5),s.Bc(15),s.Qb(),s.Rb(16,"span",5),s.Bc(17),s.Qb(),s.Rb(18,"span",8),s.Rb(19,"span",9),s.cc("click",(function(){s.sc(t);const o=e.$implicit;return s.ec().viewAddDetails(o.followUpRequestId)})),s.Bc(20," Add Details "),s.Qb(),s.Qb(),s.Qb(),s.Rb(21,"div",10),s.Rb(22,"div",5),s.Bc(23," \xa0Description / Descripci\xf3n: "),s.Qb(),s.Rb(24,"div",11),s.Bc(25),s.Qb(),s.Rb(26,"div",11),s.Bc(27),s.Qb(),s.Qb(),s.Rb(28,"div",12),s.Rb(29,"div",5),s.Bc(30),s.fc(31,"truncateDate"),s.Qb(),s.Rb(32,"div",13),s.Bc(33),s.Qb(),s.Rb(34,"div",11),s.Bc(35),s.Qb(),s.Qb(),s.Rb(36,"div",14),s.Rb(37,"div",5),s.Bc(38," \xa0Comment History / Historial de comentarios: "),s.Qb(),s.Nb(39,"app-follow-up-events",15),s.Qb(),s.Qb(),s.Qb()}if(2&t){const t=e.$implicit,o=s.ec();s.zb(2),s.kc("id","id"+t.followUpRequestId),s.zb(2),s.Dc(" \xa0Request Date: [ ",s.gc(5,16,t.requestDateTime)," ] "),s.zb(3),s.Dc(" \xa0Request Status: [",t.requestStatus,"] "),s.zb(4),s.Dc(" ",t.studentName," "),s.zb(4),s.Ec(" \xa0 Requested By: [ ",t.requestorName," (",t.requestorRole,") ] "),s.zb(2),s.Dc(" \xa0Assigned To: [ ",t.assignedTo," ] "),s.zb(1),s.jc("hidden",!o.showAddDetails),s.zb(7),s.Dc(" ",t.description_English," "),s.zb(2),s.Dc(" ",t.description_Spanish," "),s.zb(1),s.jc("hidden",o.displayCompleteHistory),s.zb(2),s.Dc(" \xa0Latest Comments / \xdaltimos Comentarios:\xa0\xa0\xa0\xa0\xa0\xa0 \xa0\xa0\xa0\xa0\xa0\xa0Update Date: [",s.gc(31,18,t.eventDateTime),"] "),s.zb(3),s.Dc(" ",t.comments_English," "),s.zb(2),s.Dc(" ",t.comments_Spanish," "),s.zb(1),s.jc("hidden",!o.displayCompleteHistory),s.zb(3),s.jc("followUpRequestId",t.followUpRequestId)}}let l=(()=>{class t{constructor(t){this.router=t,console.log("FollowUpRequestsListComponent constructor")}monthlyReportEdit(t){console.log("in monthly-reports: monthlyReportEdit, ready to navigate"),null!==this.studentId&&this.router.navigateByUrl("/mentors/monthly-reports-edit/"+t)}followUpRequestAdd(){console.log("in follow-up-requests: FollowUpRequestAdd, ready to navigate"),this.router.navigateByUrl("/admins/follow-up-requests-add")}viewAddDetails(t){const e="/admins/follow-up-events-add/"+t;console.log("navigating to "+e),this.router.navigateByUrl(e)}gotoStudent(t){if(t&&t.length>0){const e=["admins/students/student",{guid:t}];console.log("navigating to "+e),this.router.navigate(e)}}}return t.\u0275fac=function(e){return new(e||t)(s.Mb(n.b))},t.\u0275cmp=s.Gb({type:t,selectors:[["app-follow-up-requests-list"]],inputs:{followUpRequests:"followUpRequests",displayCompleteHistory:"displayCompleteHistory",showAddDetails:"showAddDetails"},decls:2,vars:1,consts:[[1,"card-body","bg-white"],["class","row","style","border-bottom: 4px solid #aaa; margin-top: 2px;",4,"ngFor","ngForOf"],[1,"row",2,"border-bottom","4px solid #aaa","margin-top","2px"],[1,"col-md-12"],[1,"row",3,"id"],[1,"padded"],[1,"link",3,"click"],[1,"row"],[1,"padded",3,"hidden"],[1,"btn","btn-primary",2,"margin-left","10px",3,"click"],[1,"row",2,"border-bottom","2px solid #ccc","margin-top","1px"],[1,"col-md-10"],[1,"row",3,"hidden"],[1,"col-md-10",2,"border-bottom","1px solid #ccc"],[3,"hidden"],[3,"followUpRequestId"]],template:function(t,e){1&t&&(s.Rb(0,"div",0),s.zc(1,a,40,20,"div",1),s.Qb()),2&t&&(s.zb(1),s.jc("ngForOf",e.followUpRequests))},directives:[r.k,i.a],pipes:[c.a],encapsulation:2}),t})()},JlJ6:function(t,e,o){"use strict";o.d(e,"a",(function(){return n}));var s=o("fXoL");let n=(()=>{class t{transform(t){const e=null!=t?t.indexOf("T"):0;return t="1900-01-01T00:00:00"===t?"":t,e>0?t.substring(0,e):""}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=s.Lb({name:"truncateDate",type:t,pure:!0}),t})()},LkS6:function(t,e,o){"use strict";o.d(e,"a",(function(){return s}));class s{constructor(t,e,o,s,n,r,i){this.followUpRequestId=t,this.requestorId=e,this.requestorRoleId=o,this.description_English=s,this.description_Spanish=n,this.requestDateTime=r,this.studentGUId=i}}},MEvh:function(t,e,o){"use strict";o.d(e,"a",(function(){return n}));var s=o("fXoL");let n=(()=>{class t{constructor(){this.months=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}transform(t){return t>""?this.months[+t]:"[NO MONTH!]"}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=s.Lb({name:"alphaMonth",type:t,pure:!0}),t})()},NJKB:function(t,e,o){"use strict";o.d(e,"a",(function(){return a}));var s=o("tk/3"),n=o("JIr8"),r=o("jEWH"),i=o("HS3z"),c=o("fXoL");let a=(()=>{class t extends r.a{constructor(t,e){super(t,e),this.http=t,this.webApiPrefixService=e}getFollowUpRequestsForStudent(t){let e=this.WebApiPrefix+"follow_up_requests";return t&&(e=e+"?studentId="+t),console.log("sending AuthHttp get request with "+e),this.http.get(e).pipe(Object(n.a)(this.handleError))}getFollowUpRequestsForStudentByGUID(t){let e=this.WebApiPrefix+"follow_up_requests";return t&&(e=e+"?studentGUId="+t),console.log("sending AuthHttp get request with "+e),this.http.get(e).pipe(Object(n.a)(this.handleError))}getFollowUpRequests(t){let e=this.WebApiPrefix+"follow_up_requests";return t&&(e=e+"?statusId="+t),console.log("sending AuthHttp get request with "+e),this.http.get(e).pipe(Object(n.a)(this.handleError))}postFollowUpRequest(t){const e=this.WebApiPrefix+"follow_up_requests";console.log("in postFollowUpRequest with url "+e);let o=JSON.stringify({followUpRequest:t});const n=JSON.parse(o);o=JSON.stringify(n.followUpRequest);const r=(new s.c).set("Content-Type","application/json");return console.log("ready to post "+e+" body: "+o+" options "+r),this.http.post(e,o,{headers:r})}getFollowUpEvents(t){const e=this.WebApiPrefix+"follow_up_events/"+t;return console.log("sending AuthHttp get request with "+e),this.http.get(e).pipe(Object(n.a)(this.handleError))}postFollowUpEvent(t){const e=this.WebApiPrefix+"follow_up_events";console.log("in postFollowUpEvent with url "+e);let o=JSON.stringify({followUpEvent:t});const n=JSON.parse(o);o=JSON.stringify(n.followUpEvent),console.log("and final body "+o);const r=(new s.c).set("Content-Type","application/json");return console.log("ready to post "+e+" body: "+o+" options "+r),this.http.post(e,o,{headers:r})}}return t.\u0275fac=function(e){return new(e||t)(c.Zb(s.a),c.Zb(i.a))},t.\u0275prov=c.Ib({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},WhHa:function(t,e,o){"use strict";o.d(e,"a",(function(){return i}));var s=o("tk/3"),n=o("HDdC"),r=o("fXoL");let i=(()=>{class t{constructor(t){this.http=t,this.xlateEndpoint="https://westus.api.cognitive.microsoft.com/text/analytics/v2.0",this.azureKey1="7a6a2fee9e1d44f69a0808557fa06207",this.azureKey2="1d1a0b9335004a6d843aaafb053c8569"}translateFromSpanish(t){const e=this.xlateEndpoint+"/translate";console.log("in TranslationService translateFromSpanish");let o=JSON.stringify({textIn:t});const n=JSON.parse(o);o=JSON.stringify(n.followUpEvent),console.log("and final body "+o);const r=(new s.c).set("Content-Type","application/json");r.append("Ocp-Apim-Subscription-Key",this.azureKey1),console.log("ready to post "+e+" body: "+o+" options "+r);const i=this.http.post(e,o,{headers:r});return console.log(i),i}handleError(t){console.log("data service handle error");const e=t.message?t.message:t.status?`${t.status} - ${t.statusText}`:"Server error";return console.log(e.message),console.log(e.statusText),console.error(e),"No JWT present or has expired"===e&&window.alert("Session has expired, please log in again."),n.a.throw(e)}}return t.\u0275fac=function(e){return new(e||t)(r.Zb(s.a))},t.\u0275prov=r.Ib({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},X8Ev:function(t,e,o){"use strict";o.d(e,"a",(function(){return p}));var s=o("NJKB"),n=o("Dn1Q"),r=o("fXoL"),i=o("tyNb"),c=o("ofXK"),a=o("JlJ6");function l(t,e){if(1&t&&(r.Rb(0,"div",2),r.Rb(1,"div",3),r.Rb(2,"div",4),r.Rb(3,"span",5),r.Bc(4),r.fc(5,"truncateDate"),r.Qb(),r.Rb(6,"span",5),r.Bc(7),r.Qb(),r.Rb(8,"span",5),r.Bc(9),r.Qb(),r.Qb(),r.Rb(10,"div",6),r.Rb(11,"div",7),r.Bc(12),r.Qb(),r.Rb(13,"div",8),r.Bc(14),r.Qb(),r.Qb(),r.Qb(),r.Qb()),2&t){const t=e.$implicit;r.zb(2),r.kc("id","id"+t.followUpEventId),r.zb(2),r.Dc(" \xa0Date: [ ",r.gc(5,6,t.eventDateTime)," ] "),r.zb(3),r.Dc(" \xa0Request Status: [",t.requestStatus,"] "),r.zb(2),r.Dc(" \xa0Assigned To: [",t.assignedTo,"] "),r.zb(3),r.Dc(" ",t.comments_English," "),r.zb(2),r.Dc(" ",t.comments_Spanish," ")}}let p=(()=>{class t{constructor(t,e,o){this.followUpData=t,this.router=e,this.session=o}ngOnInit(){this.fetchData()}fetchData(){this.isLoading=!0,console.log("in fetchData for FollowUpEvents with RequestId "+this.followUpRequestId),this.followUpData.getFollowUpEvents(this.followUpRequestId).subscribe(t=>{this.followUpEvents=t},t=>console.error("Subscribe error: "+t),()=>{console.log("done >>"),console.log(this.followUpEvents[0]),console.log("<<"),this.isLoading=!1})}followUpEventAdd(t){console.log("in follow-up-events: FollowUpEventAdd, ready to navigate"),this.router.navigateByUrl("/admins/follow-up-events-add/"+t)}}return t.\u0275fac=function(e){return new(e||t)(r.Mb(s.a),r.Mb(i.b),r.Mb(n.a))},t.\u0275cmp=r.Gb({type:t,selectors:[["app-follow-up-events"]],inputs:{followUpRequestId:"followUpRequestId"},decls:2,vars:1,consts:[[1,"card-body","bg-white"],["class","row","style","border-bottom: 3px solid #ccc; margin-top: 2px;",4,"ngFor","ngForOf"],[1,"row",2,"border-bottom","3px solid #ccc","margin-top","2px"],[1,"col-md-12"],[1,"row",3,"id"],[1,"padded"],[1,"row"],[1,"col-md-10",2,"border-bottom","1px solid #ccc"],[1,"col-md-10"]],template:function(t,e){1&t&&(r.Rb(0,"div",0),r.zc(1,l,15,8,"div",1),r.Qb()),2&t&&(r.zb(1),r.jc("ngForOf",e.followUpEvents))},directives:[c.k],pipes:[a.a],styles:[""]}),t})()},Y1Yw:function(t,e,o){"use strict";o.d(e,"a",(function(){return a}));var s=o("JIr8"),n=o("HS3z"),r=o("jEWH"),i=o("fXoL"),c=o("tk/3");let a=(()=>{class t extends r.a{constructor(t,e){super(t,e),this.http=t,this.webApiPrefixService=e}getStudentsForMentorByGUId(t){const e=this.WebApiPrefix+"mentors/students_for/"+t;console.log("sending AuthHttp get request for StudentsForMentor with url "+e);const o=this.http.get(e).pipe(Object(s.a)(this.handleError));return console.log(o),o}}return t.\u0275fac=function(e){return new(e||t)(i.Zb(c.a),i.Zb(n.a))},t.\u0275prov=i.Ib({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},aNuS:function(t,e,o){"use strict";o.d(e,"a",(function(){return r}));var s=o("fXoL"),n=o("jhN1");let r=(()=>{class t{constructor(t){this.sanitizer=t}transform(t){return this.sanitizer.bypassSecurityTrustHtml(t)}}return t.\u0275fac=function(e){return new(e||t)(s.Mb(n.b))},t.\u0275pipe=s.Lb({name:"unsafeHtml",type:t,pure:!1}),t})()},"fPB/":function(t,e,o){"use strict";o.d(e,"a",(function(){return s}));class s{constructor(t,e,o,s,n,r,i,c,a){this.followUpEventId=t,this.followUpRequestId=e,this.enteredById=o,this.assignedToRoleId=s,this.assignedToId=n,this.requestStatusId=r,this.comments_English=i,this.comments_Spanish=c,this.eventDateTime=a}}},gExv:function(t,e,o){"use strict";o.d(e,"a",(function(){return s}));class s{constructor(t,e,o,s,n,r,i,c,a,l,p,d,u,h,b,f,g,m,v){this.mentorReportId=t,this.mentorId=e,this.studentId=o,this.mentorName=s,this.studentName=n,this.reportDateTime=r,this.lastContactYear=i,this.lastContactMonth=c,this.emoji=a,this.narrative_English=l,this.narrative_Spanish=p,this.reviewedStatusId=d,this.reviewedStatus=u,this.sponsorGroupName=h,this.originalLanguageId=b,this.sponsorRequiredLanguageId=f,this.sponsorPreferredLanguageId=g,this.studentGUId=m,this.mentorGUId=v}}},j5sF:function(t,e,o){"use strict";o.d(e,"a",(function(){return s}));class s{constructor(t,e,o,s,n,r,i,c,a,l,p,d,u,h,b,f,g,m,v,w,R,y,I,S,U,q,E,x,D,A,Q,M){this.memberId=t,this.lastNames=e,this.firstNames=o,this.email=s,this.smA_Phone=n,this.nonSMA_Phone=r,this.mentorStatusId=i,this.sponsorStatusId=c,this.adminStatusId=a,this.employeeStatusId=l,this.donorStatusId=p,this.volunteerStatusId=d,this.presidentStatusId=u,this.boardMemberStatusId=h,this.yearJoinedJa=b,this.monthsinSma=f,this.nonSma_CountryId=g,this.bestWayToContactId=m,this.countryOfResidenceId=v,this.spanishSkillLevelId=w,this.englishSkillLevelId=R,this.preferredLanguageId=y,this.lastLoginDateTime=I,this.numberOfLogins=S,this.careerBackground=U,this.otherRelevantExperience=q,this.comments=E,this.personGUId=x,this.photoUrl=D,this.studentRecordGUId=A,this.memberGUId=Q,this.lastMentorMeeting=M}}},joA1:function(t,e,o){"use strict";o.d(e,"a",(function(){return u}));var s=o("WYmY"),n=o("fXoL"),r=o("tyNb"),i=o("ofXK"),c=o("JlJ6"),a=o("MEvh"),l=o("aNuS");function p(t,e){if(1&t){const t=n.Sb();n.Rb(0,"span",5),n.Rb(1,"span",10),n.cc("click",(function(){n.sc(t);const e=n.ec().$implicit;return n.ec().monthlyReportEdit(e.mentorReportId)})),n.Bc(2," Edit Report / Editar informe "),n.Qb(),n.Qb()}}function d(t,e){if(1&t&&(n.Rb(0,"div",2),n.Rb(1,"div",3),n.Rb(2,"div",4),n.Rb(3,"span",5),n.Bc(4),n.fc(5,"truncateDate"),n.Qb(),n.Rb(6,"span",5),n.Bc(7),n.fc(8,"alphaMonth"),n.Qb(),n.Rb(9,"span",5),n.Bc(10," \xa0Emoji: "),n.Nb(11,"img",6),n.Qb(),n.zc(12,p,3,0,"span",7),n.Qb(),n.Rb(13,"div",4),n.Rb(14,"div",8),n.Bc(15," \xa0Narrative (English): "),n.Qb(),n.Nb(16,"div",9),n.fc(17,"unsafeHtml"),n.Qb(),n.Rb(18,"div",4),n.Rb(19,"div",8),n.Bc(20," \xa0Narrative (Spanish): "),n.Qb(),n.Nb(21,"div",9),n.fc(22,"unsafeHtml"),n.Qb(),n.Qb(),n.Qb()),2&t){const t=e.$implicit,o=n.ec();n.zb(4),n.Dc(" \xa0Report Date: ",n.gc(5,7,t.reportDateTime)," "),n.zb(3),n.Ec(" \xa0Last Contact Month: ",n.gc(8,9,t.lastContactMonth),"-",t.lastContactYear," "),n.zb(4),n.kc("src",o.smileys[t.emoji+1],n.uc),n.zb(1),n.jc("ngIf",2087==t.reviewedStatusId),n.zb(4),n.jc("innerHTML",n.gc(17,11,t.narrative_English),n.tc),n.zb(5),n.jc("innerHTML",n.gc(22,13,t.narrative_Spanish),n.tc)}}let u=(()=>{class t{constructor(t){this.router=t,console.log("###MentorReportsList constructor"),this.smileys=s.a.smileys}monthlyReportEdit(t){console.log("in monthly-reports2: monthlyReportEdit, ready to navigate"),null!==this.studentId&&this.router.navigateByUrl("/mentors/monthly-reports-edit/"+t)}}return t.\u0275fac=function(e){return new(e||t)(n.Mb(r.b))},t.\u0275cmp=n.Gb({type:t,selectors:[["app-mentor-reports2-list"]],inputs:{mentorReports2:"mentorReports2"},decls:2,vars:1,consts:[[1,"card-body","bg-white"],["class","row","style","border-bottom: 3px solid #ccc; margin-top: 2px;",4,"ngFor","ngForOf"],[1,"row",2,"border-bottom","3px solid #ccc","margin-top","2px"],[1,"col-md-12"],[1,"row"],[1,"padded"],["width","28px",3,"src"],["class","padded",4,"ngIf"],[1,"col-md2","padded"],[1,"col-md-10",3,"innerHTML"],[1,"btn","btn-primary",2,"margin-left","10px",3,"click"]],template:function(t,e){1&t&&(n.Rb(0,"div",0),n.zc(1,d,23,15,"div",1),n.Qb()),2&t&&(n.zb(1),n.jc("ngForOf",e.mentorReports2))},directives:[i.k,i.l],pipes:[c.a,a.a,l.a],encapsulation:2}),t})()}}]);