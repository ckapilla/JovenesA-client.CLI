import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SELECTITEM } from '../interfaces/SELECTITEM';
import { Admin } from '../models/admin';
import { Communication } from '../models/communication';
import { FollowUpEvent } from '../models/follow-up-event';
import { FollowUpEventRPT } from '../models/follow-up-eventRPT';
import { FollowUpRequest } from '../models/follow-up-request';
import { FollowUpRequestRPT } from '../models/follow-up-requestRPT';
import { Member } from '../models/member';
import { MemberWithAnyRelatedStudent } from '../models/member-with-any-related-student';
import { Mentor } from '../models/mentor';
import { MentorReportRPT } from '../models/mentor-report';
import { MentorReport2RPT } from '../models/mentor-report2';
import { MentorReportsStatusCount } from '../models/mentor-reports-status-count';
import { SponsorGroup } from '../models/sponsor-group';
import { SponsorGroupMemberDTO } from '../models/sponsor-group-memberDTO';
import { SponsorLetter } from '../models/sponsor-letter';
import { Student } from '../models/student';
import { StudentSelfReport } from '../models/student-self-report';
import { StudentSponsorXRef } from '../models/student-sponsor-xref';
import { UrlService } from './url.service';



@Injectable({ providedIn: 'root' })
export class SqlResource {
  WebApiPrefix: string;

  constructor(private http: HttpClient,
    private webApiPrefixService: UrlService) {
    // console.log('sqlResource constructor');
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

  public getMentorsForStudent(studentId: number): Observable<Mentor[]> {
    const url = this.WebApiPrefix + 'students/mentors_for/' + studentId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<Mentor[]>(url).pipe(catchError(this.handleError));
  }


  // list of sponsors for assigned SponsorGroup on student page
  public getMembersForSponsorGroup(sponsorGroupId: Number): Observable<SponsorGroupMemberDTO[]> {
    const url = this.WebApiPrefix + 'sponsor_groups/members/' + sponsorGroupId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SponsorGroupMemberDTO[]>(url).pipe(catchError(this.handleError));
  }
  public getSponsorGroupsWithMembers(): Observable<SponsorGroupMemberDTO[]> {
    const url = this.WebApiPrefix + 'sponsor_groups/members/0';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SponsorGroupMemberDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getSponsorGroup(id: number): Observable<SponsorGroup> {
    const url = this.WebApiPrefix + 'sponsor_groups/' + id;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SponsorGroup>(url).pipe(catchError(this.handleError));
  }

  public getSponsorGroupMembersForStudent(studentId: number): Observable<StudentSponsorXRef[]> {
    const url = this.WebApiPrefix + 'students/sponsor_group_members_for/' + studentId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<StudentSponsorXRef[]>(url).pipe(catchError(this.handleError));
  }

  public getSponsorGroupForStudent(studentId: number): Observable<StudentSponsorXRef> {
    const url = this.WebApiPrefix + 'students/sponsor_group_for/' + studentId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<StudentSponsorXRef>(url).pipe(catchError(this.handleError));
  }


  // public getSponsorGroupsForStudent(sponsorGroupId: number): Observable<SponsorGroup[]> {
  //   const url = this.WebApiPrefix + '/sponsor_groups_with_members/' + sponsorGroupId;
  //   console.log('sending AuthHttp get request ' + url);
  //   return this.http.get<SponsorGroup[]>(url).pipe(catchError(this.handleError));
  // }

  public addNewSponsorGroup(sponsorGroup: SponsorGroup): Observable<SponsorGroup> {
    const url = this.WebApiPrefix + 'sponsor_groups/';
    let body = JSON.stringify({ sponsorGroup });
    // strip outer 'sponsorGroup'
    const x = JSON.parse(body);
    body = JSON.stringify(x.sponsorGroup);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post new sponsorGroup ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });
  }


  public updateSponsorGroup(sponsorGroup: SponsorGroup): Observable<SponsorGroup> {
    const url = this.WebApiPrefix + 'sponsor_groups/';
    let body = JSON.stringify({ sponsorGroup });
    // strip outer 'sponsorGroup'
    const x = JSON.parse(body);
    body = JSON.stringify(x.sponsorGroup);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to put updated sponsorGroup ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });

  }




  public updateStudent(student: Student): Observable<any> {
    const url = this.WebApiPrefix + 'students/' + student.studentId;
    let body = JSON.stringify({ student });
    // strip outer 'student' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.student);
    // console.log('in updateStudent');

    // tslint:disable-next-line:max-line-length
    const returnedToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFVWTBOemxFTnpjMVJFUTJRMEZFTkVZNVJFSkVPVE5DUVVFMlJqYzRNRFJHTVRJd05qZ3hOQSJ9.eyJpc3MiOiJodHRwczovL2NrYXBpbGxhLmF1dGgwLmNvbS8iLCJzdWIiOiJVa3R5NEhhb0czc0UzeDJqWE1HMm1TOHo2dFM0R0JPUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9Kb3ZlbmVzQWRlbGFudGVXZWJBUEkiLCJpYXQiOjE1MDc4NTEzNzAsImV4cCI6MTUwNzkzNzc3MCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.U02NuYo1yguqjtV0gczSkC6UiiGV-QZEjE1k22UOGYI-SbjZQx9h1wkqa3PNiOIPlc3TLnBLW91c5Gz8apuIePnwugq2KApuupmhaS8eDLKFwRx5CZM0XPwYc6kHuxCkn3mk8Y_Siu8A0WpqAaVPhuUHv-szR0MABgBZ27B-KmeGJ-ub05bddwwS4ghpVu-OF7awelwZ74GJ-e7drhCHedwrsLp1bOgKUrzo9JUMs4tk4pmr7Sm4zX6HKqdQ7j53qys_A935m15aHwkNnnhNYWuul8LrbjDwvpTGdcQ55JxnR0logFL2XsYAFFeYykManb5EseXE7dsix_JrE82ICw';

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('authorization', returnedToken);
    console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }

  //////////////////////////////////////////////////
  ///  MembersController
  //////////////////////////////////////////////////

  // public getMembers(id: Number): Observable<Member[]> {

  //   const url = this.WebApiPrefix
  //   + 'members/' + id;
  //   console.log('sending AuthHttp get request for Member id ', id);
  //   return this.http.get(url).pipe(catchError(this.handleError));
  // ///////  .map((response: Response) => response.json())
  //   .catch(this.handleError);
  //   }

  public getMember(memberId: Number): Observable<Member> {
    const url = this.WebApiPrefix + 'members/' + memberId;
    console.log('sending AuthHttp get request for Member');
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getMemberByGUId(memberGUId: string): Observable<Member> {
    const url = this.WebApiPrefix + 'members/guid/' + memberGUId;
    console.log('sending AuthHttp get request for Member data');
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getCommunicationsForMember(memberId: Number): Observable<Communication[]> {
    const url = this.WebApiPrefix + 'members/communications/' + memberId;
    console.log('sending AuthHttp get request for Communications For Member with url', url);
    return this.http.get<Communication[]>(url).pipe(catchError(this.handleError));
  }

  public getMemberWithAnyRelatedStudent(type: string, status: number): Observable<MemberWithAnyRelatedStudent[]> {

    const url = this.WebApiPrefix
      + 'members/student_relations/' + type + '/' + status;
    // statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
    console.log('sending AuthHttp get request with url ' + url);
    return this.http.get<MemberWithAnyRelatedStudent[]>(url).pipe(catchError(this.handleError));
  }

  public updateMember(member: Member): Observable<Member> {

    const url = this.WebApiPrefix + 'members';

    let body = JSON.stringify({ member });
    // strip outer 'member' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.member);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('put member with url ' + url);
    return this.http.put(url, body, { headers: headers });
  }


  public UpdateLastLogin(userId: number): Observable<any> {
    const url = this.WebApiPrefix + 'members' + '/LastLogin/' + userId;
    console.log('sending AuthHttp put request to set LastLogin datetime');
    return this.http.put(url, null).pipe(
      map(
        (response: Response) => {
          console.log('updateLastLogin success; no json expected ');
        },
        catchError(this.handleError))
    );
  }

  ///////////////////////////////////////////////////// admins
  public getAdmin(adminId: Number): Observable<Admin> {
    const url = this.WebApiPrefix + 'admins/' + adminId;
    console.log('sending AuthHttp get request for Admin to ' + url);
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public updateAdmin(admin: Admin): Observable<Admin> {

    const url = this.WebApiPrefix + 'admins/' + admin.adminId;

    let body = JSON.stringify({ admin });
    // strip outer 'admin' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.admin);
    console.log('in putAdmin');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, body, { headers: headers });
  }

  ////////////////////////////// lookups

  public getMentorNames(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/mentors';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }
  public getMentorNamesByGUId(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/mentors/guid';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }

  public getSponsorGroups(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/sponsorgroups';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }

  public getUniversityNames(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/universities';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }

  public getPrepaNames(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/prepas';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }

  ////////////////////////////// mentors



  public getMentor(mentorId: Number): Observable<Mentor> {
    const url = this.WebApiPrefix + 'mentors/' + mentorId;
    console.log('sending AuthHttp get request for Mentor');
    return this.http.get(url).pipe(catchError(this.handleError));
  }


  public updateMentor(mentor: Mentor): Observable<Mentor> {

    const url = this.WebApiPrefix + 'mentors/' + mentor.mentorId;

    let body = JSON.stringify({ mentor });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.mentor);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('put mentor with url ' + url);
    return this.http.put(url, body, { headers: headers });

  }




  //////////////////////////////////////////////////
  ///  MentorReportsController
  //////////////////////////////////////////////////

  public getMentorReport2(mentorReportId: number): Observable<MentorReport2RPT> {
    const url = this.WebApiPrefix + 'mentor_reports2/' + mentorReportId;
    console.log('sending AuthHttp get request for MentorReport2 with ' + url);
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getMentorReport2RPTs(mentorId: number, studentId: number): Observable<MentorReport2RPT[]> {
    const url = this.WebApiPrefix + 'mentor_reports2/' + mentorId + '/' + studentId;
    console.log('sending AuthHttp get request for MentorReports2 with ' + url);
    return this.http.get<MentorReport2RPT[]>(url).pipe(catchError(this.handleError));
  }

  public getMentorReport2RPTsViaGUID(mentorId: number, studentGUId: string): Observable<MentorReport2RPT[]> {
    const url = this.WebApiPrefix + 'mentor_reports2/' + mentorId + '/' + studentGUId;
    console.log('sending AuthHttp get request for MentorReports2 with ' + url);
    return this.http.get<MentorReport2RPT[]>(url).pipe(catchError(this.handleError));
  }

  public updateMentorReport2(mentorReport: MentorReport2RPT): Observable<MentorReportRPT> {

    const url = this.WebApiPrefix + 'mentor_reports2'; // + mentorReport.mentorReportId ;
    let body = JSON.stringify({ mentorReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.mentorReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }


  public addMentorReport2(mentorReport: MentorReport2RPT): Observable<MentorReport2RPT> {

    const url = this.WebApiPrefix + 'mentor_reports2';
    let body = JSON.stringify({ mentorReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.mentorReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });
  }

  public getMentorReportsByPeriod(year: string, period: string,
    reviewedStatusId: string, studentGUId: string): Observable<MentorReport2RPT[]> {
    const url = this.WebApiPrefix + 'mentor_reports/by_period'
      + '?year=' + year
      + '&period=' + period
      + '&reviewedStatusId=' + reviewedStatusId
      + '&studentGUId=' + studentGUId;
    console.log('sending AuthHttp get request for MentorReportsByPeriod with ' + url);
    return this.http.get<MentorReport2RPT[]>(url).pipe(catchError(this.handleError));
  }

  public getMentorReportsByMonth(year: string, month: string,
    reviewedStatusId: string): Observable<MentorReport2RPT[]> {
    const url = this.WebApiPrefix + 'mentor_reports2/by_month'
      + '?year=' + year
      + '&month=' + month
      + '&reviewedStatusId=' + reviewedStatusId;
    console.log('sending AuthHttp get request for MentorReportsByMonth with ' + url);
    return this.http.get<MentorReport2RPT[]>(url).pipe(catchError(this.handleError));

  }

  public getMentorReportsStatusCounts(year: string, month: string): Observable<MentorReportsStatusCount[]> {
    const url = this.WebApiPrefix + 'mentor_reports2/status_counts'
      + '?year=' + year
      + '&month=' + month;
    // + '&summaryStatusId=' + summaryStatusId
    // + '&highlightStatusId=' + highlightStatusId;
    console.log('sending AuthHttp get request for MentorReportsStatusCounts with ' + url);
    return this.http.get<MentorReportsStatusCount[]>(url).pipe(catchError(this.handleError));
  }


  //////////////////////////////////////////////////
  ///  StudentSelfReportsController
  //////////////////////////////////////////////////

  public getStudentSelfReportsStatusCounts(year: string, period: string): Observable<MentorReportsStatusCount[]> {
    const url = this.WebApiPrefix + 'student_self_reports/status_counts'
      + '?year=' + year
      + '&period=' + period;
    console.log('sending AuthHttp get request for MentorReportsStatusCounts with ' + url);
    return this.http.get<MentorReportsStatusCount[]>(url).pipe(catchError(this.handleError));
  }


  public getStudentSelfReports(studentId: number, sponsorId: number): Observable<StudentSelfReport[]> {
    const url = this.WebApiPrefix + 'student_self_reports/' + studentId + '/' + sponsorId;
    console.log('sending AuthHttp get request for StudentSelfReports with ' + url);
    return this.http.get<StudentSelfReport[]>(url).pipe(catchError(this.handleError));
  }

  public getStudentSelfReport(selfReportId: number): Observable<StudentSelfReport> {
    const url = this.WebApiPrefix + 'student_self_reports/' + selfReportId;
    console.log('sending AuthHttp get request for StudentSelfReports with ' + url);
    return this.http.get<StudentSelfReport>(url).pipe(catchError(this.handleError));
  }

  public getStudentSelfReportsByPeriod(year: string, period: string,
    reviewedStatusId: string, studentGUId: string): Observable<StudentSelfReport[]> {
    const url = this.WebApiPrefix + 'student_self_reports/by_period'
      + '?year=' + year
      + '&period=' + period
      + '&reviewedStatusId=' + reviewedStatusId
      + '&studentGUId=' + studentGUId;
    console.log('sending AuthHttp get request for StudentSelfReportsByMonth with ' + url);
    return this.http.get<StudentSelfReport[]>(url).pipe(catchError(this.handleError));
  }

  public postStudentSelfReport(selfReport: StudentSelfReport): Observable<MentorReportRPT> {

    const url = this.WebApiPrefix + 'student_self_reports';
    console.log('in postSelfReport with url ' + url);
    let body = JSON.stringify({ selfReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.selfReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });
  }

  // public postStudentSelfReport(selfReport: StudentSelfReport,
  //   studentId: number,
  //   sponsorGroupId: number): Observable<MentorReportRPT> {

  //   const url = this.WebApiPrefix + 'student_self_reports/' + studentId + '/' + sponsorGroupId;
  //   console.log('in postSelfReport with url ' + url);
  //   let body = JSON.stringify({ selfReport });
  //   // strip outer 'mentor' name
  //   const x = JSON.parse(body);
  //   body = JSON.stringify(x.selfReport);
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
  //   return this.http.post(url, body, { headers: headers });
  // }

  public putStudentSelfReport(selfReport: StudentSelfReport): Observable<MentorReportRPT> {

    const url = this.WebApiPrefix + 'student_self_reports';
    console.log('in putSelfReport with url ' + url);
    let body = JSON.stringify({ selfReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.selfReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to putt ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }
  // public putStudentSelfReport(selfReport: StudentSelfReport, studentId: number): Observable<MentorReportRPT> {

  //   const url = this.WebApiPrefix + 'student_self_reports/' + studentId;
  //   console.log('in putSelfReport with url ' + url);
  //   let body = JSON.stringify({ selfReport });
  //   // strip outer 'mentor' name
  //   const x = JSON.parse(body);
  //   body = JSON.stringify(x.selfReport);
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
  //   return this.http.put(url, body, { headers: headers });
  // }


  //////////////////////////////////////////////////
  ///  SponsorReportsController
  //////////////////////////////////////////////////


  public getSponsorLetters(studentId: number, sponsorId: number): Observable<SponsorLetter[]> {
    const url = this.WebApiPrefix + 'student_sponsor_letters/' + studentId + '/' + sponsorId;
    console.log('sending AuthHttp get request for SponsorLetters with ' + url);
    return this.http.get<SponsorLetter[]>(url).pipe(catchError(this.handleError));
  }

  public postSponsorLetter(sponsorLetter: SponsorLetter,
    studentId: number,
    sponsorGroupId: number): Observable<MentorReportRPT> {

    const url = this.WebApiPrefix + 'student_sponsor_letters/' + studentId + '/' + sponsorGroupId;
    console.log('in postSponsorLetter with url ' + url);
    let body = JSON.stringify({ sponsorLetter });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.sponsorLetter);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });

  }
  //////////////////////////////////////////////////
  ///  FollowUpController
  //////////////////////////////////////////////////


  public getFollowUpRequestsForStudent(studentId?: number): Observable<FollowUpRequestRPT[]> {
    let url = this.WebApiPrefix + 'follow_up_requests';
    if (studentId) {
      url = url + '?studentId=' + studentId;
    }
    console.log('sending AuthHttp get request with ' + url);
    return this.http.get<FollowUpRequestRPT[]>(url).pipe(catchError(this.handleError));
  }
  public getFollowUpRequests(statusId: string): Observable<FollowUpRequestRPT[]> {
    let url = this.WebApiPrefix + 'follow_up_requests';
    if (statusId) {
      url = url + '?statusId=' + statusId;
    }
    console.log('sending AuthHttp get request with ' + url);
    return this.http.get<FollowUpRequestRPT[]>(url).pipe(catchError(this.handleError));
  }


  public postFollowUpRequest(followUpRequest: FollowUpRequest): Observable<any> {
    const url = this.WebApiPrefix + 'follow_up_requests';
    console.log('in postFollowUpRequest with url ' + url);
    let body = JSON.stringify({ followUpRequest });
    // strip outer key name
    const x = JSON.parse(body);
    body = JSON.stringify(x.followUpRequest);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });
  }

  public getFollowUpEvents(followUpRequestId: number): Observable<FollowUpEventRPT[]> {
    const url = this.WebApiPrefix + 'follow_up_events/' + followUpRequestId;
    console.log('sending AuthHttp get request with ' + url);
    return this.http.get<FollowUpEventRPT[]>(url).pipe(catchError(this.handleError));
  }

  public postFollowUpEvent(followUpEvent: FollowUpEvent): Observable<FollowUpEvent> {
    const url = this.WebApiPrefix + 'follow_up_events';
    console.log('in postFollowUpEvent with url ' + url);
    let body = JSON.stringify({ followUpEvent: followUpEvent });
    // strip outer key name
    const x = JSON.parse(body);
    body = JSON.stringify(x.followUpEvent);
    console.log('and final body ' + body);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });
  }

  //////////////////////////////////////////////////
  /// Utilities
  //////////////////////////////////////////////////


  private handleError(error: any) {
    console.log('sqlResource handle error');
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg.message);
    console.log(errMsg.statusText);
    console.error(errMsg); // log to console instead
    if (errMsg === 'No JWT present or has expired') {
      window.alert('Session has expired, please log in again.');
    }
    return throwError(errMsg);
  }
}
