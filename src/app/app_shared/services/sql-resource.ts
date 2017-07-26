import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Admin } from '../models/admin';
import { Mentor } from '../models/mentor';
import { Member } from '../models/member';
import { Student } from '../models/student';
import { StudentDTO } from '../models/studentDTO';
import { MemberStudentRelations } from '../models/member-student-relations';

import { Communication } from '../models/communication';
import { RptMentorReport } from '../models/mentor-report';
import { RptStudentMentor } from '../models/student-mentor';
import { RptSponsorLetter } from '../models/sponsor-letter';
import { MentorReportByMonth } from '../models/mentor-report-by-month';
import { MentorReportFollowUp } from '../models/mentor-report-follow-up';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';

@Injectable()
export class SqlResource {
  WebApiPrefix: string;

  constructor(private http: AuthHttp,
              private _http: Http) {
    console.log('sqlResource constructor');

    const serverMode = 'Prod';

    console.log('window: ' + window.location.hostname);
    if (window.location.hostname === 'privada.jovenesadelante.org'
              || serverMode === 'Prod') {
      this.WebApiPrefix = 'https://jovenesadelantewebapi.azurewebsites.net/api/v1/';
    } else {
      // this.WebApiPrefix = 'http://jovenesadelantewebapitest.azurewebsites.net/api/v1/' ;
      this.WebApiPrefix = 'https://192.168.1.68:45455/api/v1/' ;
    }

  }

  public getMentorReport(mentorReportId: number): Observable <RptMentorReport[]>  {
    const url = this.WebApiPrefix + 'mentorReport/' + mentorReportId;
    console.log('sending AuthHttp get request for MentorReport with ' + url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getMentorReports(mentorId: number, studentId: number): Observable <RptMentorReport[]>  {
    const url = this.WebApiPrefix + 'mentorreports/' + mentorId + '/' + studentId;
    console.log('sending AuthHttp get request for MentorReports with ' + url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getMentorReportsFollowUpStatus(): Observable <MentorReportFollowUp[]>  {
    const url = this.WebApiPrefix + 'mentorReportsFollowUpNeeded';
    console.log('sending AuthHttp get request for MentorReportsFollowUpNeeded with ' + url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getSponsorLetters(studentId: number, sponsorId: number): Observable <RptSponsorLetter[]>  {
    const url = this.WebApiPrefix + 'studentsponsorletters/' + studentId + '/' + sponsorId;
    console.log('sending AuthHttp get request for SponsorLetters with ' + url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public postMentorReport(mentorReport: RptMentorReport,
                          operation: string,
                          mentorId: number,
                          studentId: number): Observable<RptMentorReport> {

    console.log('operation is' + operation);
    const url = this.WebApiPrefix + 'mentorReports/' + operation;
    console.log('sending AuthHttp get request for PostMentoReport with ' + url);
    let body = JSON.stringify({ mentorReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.mentorReport);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + options);
    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }


  public postSponsorLetter(sponsorLetter: RptSponsorLetter,
                          studentId: number,
                          sponsorId: number): Observable<RptMentorReport> {

    const url = this.WebApiPrefix + 'studentsponsorletters/' + studentId; // + '/' + sponsorId;
    console.log('in postSponsorLetter with url ' + url );
    let body = JSON.stringify({ sponsorLetter });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.sponsorLetter);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log('ready to post ' + url + 'body: ' + body + ' options ' + options);
    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }



  public getStudentsForMentor(mentorId: Number): Observable<RptStudentMentor[]> {
    const url = this.WebApiPrefix + 'studentsForMentors/' + mentorId;
    console.log('sending AuthHttp get request for StudentsForMentor');
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getSponsorsForStudent(studentId: number) {
    const url = this.WebApiPrefix + 'sponsorsForStudent/' + studentId;
    console.log('sending AuthHttp get request ' +  url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getStudentDTO(studentId: number): Observable<StudentDTO> {
    const url = this.WebApiPrefix  + 'studentDTO/' + studentId;
// statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
    console.log('sending AuthHttp get request for Students');
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getStudentDTOs(statusId: string, gradYear: string, yearJoinedJA: string): Observable<StudentDTO[]> {
    const url = this.WebApiPrefix
    + 'studentDTOs/statusId/gradYear/yearJoinedJA'
    + '?statusId=' + statusId
    + '&gradYear=' + gradYear
    + '&yearJoinedJA=' + yearJoinedJA;
// statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
    console.log('sending AuthHttp get request for Students');
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  public getMentorReportsByMonth(year: string, month: string,
            summaryStatusId: string, highlightStatusId: string): Observable <MentorReportByMonth[]>  {
    const url = this.WebApiPrefix + 'mentorReportsByMonth'
              + '?year=' + year
              + '&month=' + month
              + '&summaryStatusId=' + summaryStatusId
              + '&highlightStatusId=' + highlightStatusId;
    console.log('sending AuthHttp get request for MentorReportsByMonth with ' + url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getMembers(id: Number): Observable<Member[]> {

    const url = this.WebApiPrefix
    + 'members/' + id;
    console.log('sending AuthHttp get request for Member id ', id);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getMember(memberId: Number): Observable<Member> {
    const url = this.WebApiPrefix + 'members/' + memberId;
    console.log('sending AuthHttp get request for Member');
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getCommunicationsForMember(memberId: Number): Observable<Communication[]> {
    const url = this.WebApiPrefix + 'communications/' + memberId;
    console.log('sending AuthHttp get request for Communications For Member with url', url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  public getMemberStudentRelations(type: string): Observable<MemberStudentRelations[]> {

    const url = this.WebApiPrefix
    + 'memberstudentrelations/type/' + type;
// statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
    console.log('sending AuthHttp get request for Members of type ', type);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getMentor(mentorId: Number): Observable<Mentor> {
    const url = this.WebApiPrefix + 'mentors/' + mentorId;
    console.log('sending AuthHttp get request for Mentor');
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  public postMentor(mentor: Mentor): Observable<Mentor> {

    const url = this.WebApiPrefix + 'mentors/';

    let body = JSON.stringify({ mentor });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.mentor);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public postMember(member: Member): Observable<Member> {

    const url = this.WebApiPrefix + 'members/';

    let body = JSON.stringify({ member });
    // strip outer 'member' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.member);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

 public getAdmin(adminId: Number): Observable<Admin> {
    const url = this.WebApiPrefix + 'admins/' + adminId;
    // console.log('sending AuthHttp get request for Admin');
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError
      );
  }

  public postAdmin(admin: Admin): Observable<Admin> {

    const url = this.WebApiPrefix + 'admins/';

    let body = JSON.stringify({ admin });
    // strip outer 'admin' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.admin);
    console.log('in postAdmin');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

 public getStudent(studentId: Number): Observable<Student> {
    const url = this.WebApiPrefix + 'students/' + studentId;
    console.log('sending AuthHttp get request for Student');
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError
      );
  }

//   public getStudentDTO(studentId: Number): Observable<StudentDTO> {
//     const url = this.WebApiPrefix + 'studentDTOs/' + studentId;
// // statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
//     console.log('sending AuthHttp get request for Students');
//     return this.http.get(url)
//       .map((response: Response) => response.json())
//       .catch(this.handleError);
//   }


  public postStudent(student: Student): Observable<any> {

    const url = this.WebApiPrefix + 'students/';

    let body = JSON.stringify({ student });
    // strip outer 'student' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.student);
    // console.log('in postStudent');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // public UpdateLastLogin(userId: number): Observable<any> {
  //   const url = this.WebApiPrefix + 'updateLastLogin/' + userId + '/true';
  //   console.log('sending AuthHttp get request to set LastLogin datetime');
  //   return this._http.get(url)
  //     .map(
  //         (response: Response) => {
  //           console.log('updateLastLogin success: ');
  //           console.log(response.json());
  //           })
  //     .catch(this.handleError
  //     );
  // }

  public UpdateLastLogin(userId: number): Observable<any> {
    const url = this.WebApiPrefix + 'updates' + '/LastLoginTime/' + userId;
    console.log('sending AuthHttp get request to set LastLogin datetime');
    return this._http.get(url)
      .map(
          (response: Response) => {
            console.log('updateLastLogin success; no json expected ');
            })
      .catch(this.handleError
      );
  }

  private extractData(res: Response) {
    console.log('sqlResource extractData');
    const body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    console.log('sqlResource handle error');
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg.message);
    console.log(errMsg.statusText);
    console.error(errMsg); // log to console instead
    if (errMsg === 'No JWT present or has expired') {
      window.alert('Session has expired, please log in again.');
    }
    return Observable.throw(errMsg);
  }
}



