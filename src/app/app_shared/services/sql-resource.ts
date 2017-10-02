import { Injectable, Inject, InjectionToken } from '@angular/core';
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
import { WebApiPrefixService } from './web-api-prefix.service';



@Injectable()
export class SqlResource {
  WebApiPrefix: string;

  constructor(private http: AuthHttp,
              private _http: Http,
              private webApiPrefixService: WebApiPrefixService) {
              // @Inject(WEBAPIPREFIX) public webApiPrefix: string) {
    console.log('sqlResource constructor');

    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();

    // console.log('window: ' + window.location.hostname);
    // if (window.location.hostname === 'privada.jovenesadelante.org'
    //           // && serverMode !== 'Prod') {
    //           // || serverMode === 'Prod') {
    //           ) {
    //   this.WebApiPrefix = 'https://jovenesadelantewebapi.azurewebsites.net/api/v1/';
    // } else {
    //   // this.WebApiPrefix = 'http://jovenesadelantewebapitest.azurewebsites.net/api/v1/' ;
    //   this.WebApiPrefix = 'http://192.168.1.69:45456/api/' ;
    // }

  }

//////////////////////////////////////////////////
///  StudentsController
//////////////////////////////////////////////////


public getStudent(studentId: Number): Observable<Student> {
  const url = this.WebApiPrefix + 'students/' + studentId;
  console.log('sending AuthHttp get request for Student');
  return this.http.get(url)
    .map((response: Response) => response.json())
    .catch(this.handleError
    );
}

public getStudentDTO(studentId: number): Observable<StudentDTO> {
  const url = this.WebApiPrefix  + 'students/DTO/' + studentId;
// statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
  console.log('sending AuthHttp get request for Students');
  return this.http.get(url)
    .map((response: Response) => response.json())
    .catch(this.handleError);
}

public getStudentDTOsByStatusAndYear(statusId: string, yearJoinedJA: string, gradYear: string): Observable<StudentDTO[]> {
  const url = this.WebApiPrefix
  + 'students'
  + '/' + statusId
  + '/' + yearJoinedJA
  + '/' + gradYear;
  console.log('sending AuthHttp get request for Students with url ' + url);
  return this.http.get(url)
    .map((response: Response) => response.json())
    .catch(this.handleError);
}

public getStudentsForMentor(mentorId: Number): Observable<RptStudentMentor[]> {
  const url = this.WebApiPrefix + 'students/for_mentor/' + mentorId;
  console.log('sending AuthHttp get request for StudentsForMentor');
  return this.http.get(url)
    .map((response: Response) => response.json())
    .catch(this.handleError);
}

public getSponsorsForStudent(studentId: number) {
  const url = this.WebApiPrefix + 'students/sponsors_for/' + studentId;
  console.log('sending AuthHttp get request ' +  url);
  return this.http.get(url)
    .map((response: Response) => response.json())
    .catch(this.handleError);
}

public updateStudent(student: Student): Observable<any> {

  const url = this.WebApiPrefix + 'students/' + student.studentId;

  let body = JSON.stringify({ student });
  // strip outer 'student' name
  const x = JSON.parse(body);
  body = JSON.stringify(x.student);
  // console.log('in updateStudent');
  const headers = new Headers({ 'Content-Type': 'application/json' });
  const options = new RequestOptions({ headers: headers });
  return this.http.put(url, body, options)
    .map(this.extractData)
    .catch(this.handleError);
}

//////////////////////////////////////////////////
///  MembersController
//////////////////////////////////////////////////

// public getMembers(id: Number): Observable<Member[]> {

//   const url = this.WebApiPrefix
//   + 'members/' + id;
//   console.log('sending AuthHttp get request for Member id ', id);
//   return this.http.get(url)
//   .map((response: Response) => response.json())
//   .catch(this.handleError);
//   }

  public getMember(memberId: Number): Observable<Member> {
  const url = this.WebApiPrefix + 'members/' + memberId;
  console.log('sending AuthHttp get request for Member');
  return this.http.get(url)
  .map((response: Response) => response.json())
  .catch(this.handleError);
  }



  public getCommunicationsForMember(memberId: Number): Observable<Communication[]> {
    const url = this.WebApiPrefix + 'members/communications/' + memberId;
    console.log('sending AuthHttp get request for Communications For Member with url', url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }


  public getMemberStudentRelations(type: string): Observable<MemberStudentRelations[]> {

        const url = this.WebApiPrefix
        + 'members/student-relations/' + type + '/0';
    // statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
        console.log('sending AuthHttp get request with url ' + url);
        return this.http.get(url)
          .map((response: Response) => response.json())
          .catch(this.handleError);
      }

      public updateMember(member: Member): Observable<Member> {

        const url = this.WebApiPrefix + 'members/' + member.memberId;

        let body = JSON.stringify({ member });
        // strip outer 'member' name
        const x = JSON.parse(body);
        body = JSON.stringify(x.member);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        console.log('put member with url ' + url);
        return this.http.put(url, body, options)
          .map(this.extractData)
          .catch(this.handleError);
      }


      public UpdateLastLogin(userId: number): Observable<any> {
        const url = this.WebApiPrefix + 'members' + '/LastLogin/' + userId;
        // console.log('sending AuthHttp get request to set LastLogin datetime');
        return this._http.put(url, null)
          .map(
              (response: Response) => {
                ; // console.log('updateLastLogin success; no json expected ');
                })
          .catch(this.handleError
          );
      }

///////////////////////////////////////////////////// admins
      public getAdmin(adminId: Number): Observable<Admin> {
        const url = this.WebApiPrefix + 'admins/' + adminId;
        console.log('sending AuthHttp get request for Admin to ' + url);
        return this.http.get(url)
          .map((response: Response) => response.json())
          .catch(this.handleError
          );
      }

      public updateAdmin(admin: Admin): Observable<Admin> {

        const url = this.WebApiPrefix + 'admins/' + admin.adminId;

        let body = JSON.stringify({ admin });
        // strip outer 'admin' name
        const x = JSON.parse(body);
        body = JSON.stringify(x.admin);
        console.log('in putAdmin');
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.put(url, body, options)
          .map(this.extractData)
          .catch(this.handleError);
      }
////////////////////////////// mentors
      public getMentor(mentorId: Number): Observable<Mentor> {
        const url = this.WebApiPrefix + 'mentors/' + mentorId;
        console.log('sending AuthHttp get request for Mentor');
        return this.http.get(url)
          .map((response: Response) => response.json())
          .catch(this.handleError);
      }


      public updateMentor(mentor: Mentor): Observable<Mentor> {

        const url = this.WebApiPrefix + 'mentors/' + mentor.mentorId;

        let body = JSON.stringify({ mentor });
        // strip outer 'mentor' name
        const x = JSON.parse(body);
        body = JSON.stringify(x.mentor);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.put(url, body, options)
          .map(this.extractData)
          .catch(this.handleError);
      }




//////////////////////////////////////////////////
///  MentorReportsController
//////////////////////////////////////////////////


public getMentorReport(mentorReportId: number): Observable <RptMentorReport>  {
    const url = this.WebApiPrefix + 'mentor_reports/' + mentorReportId;
    console.log('sending AuthHttp get request for MentorReport with ' + url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getMentorReportDTOs(mentorId: number, studentId: number): Observable <RptMentorReport[]>  {
    const url = this.WebApiPrefix + 'mentor_reports/' + mentorId + '/' + studentId;
    console.log('sending AuthHttp get request for MentorReports with ' + url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getMentorReportsFollowUpStatus(): Observable <MentorReportFollowUp[]>  {
    const url = this.WebApiPrefix + 'mentor_reports/follow_up';
    console.log('sending AuthHttp get request with ' + url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public updateMentorReport(mentorReport: RptMentorReport,
                          mentorId: number,
                          studentId: number): Observable<RptMentorReport> {

    const url = this.WebApiPrefix + 'mentor_reports/' + mentorReport.mentorReportId ;
    let body = JSON.stringify({ mentorReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.mentorReport);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    console.log('ready to put ' + url + ' body: ' + body + ' options ' + options);
    return this.http.put(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);

  }


  public addMentorReport(mentorReport: RptMentorReport,
      mentorId: number,
      studentId: number): Observable<RptMentorReport> {

    const url = this.WebApiPrefix + 'mentor_reports';
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


  public getMentorReportsByMonth(year: string, month: string,
    summaryStatusId: string, highlightStatusId: string): Observable <MentorReportByMonth[]>  {
    const url = this.WebApiPrefix + 'mentor_reports/by_month'
                        + '?year=' + year
                        + '&month=' + month
                        + '&summaryStatusId=' + summaryStatusId
                        + '&highlightStatusId=' + highlightStatusId;
    console.log('sending AuthHttp get request for MentorReportsByMonth with ' + url);
    return this.http.get(url)
    .map((response: Response) => response.json())
    .catch(this.handleError);
}

//////////////////////////////////////////////////
///  SponsorReportsController
//////////////////////////////////////////////////


  public getSponsorLetters(studentId: number, sponsorId: number): Observable <RptSponsorLetter[]>  {
    const url = this.WebApiPrefix + 'studentsponsorletters/' + studentId + '/' + sponsorId;
    console.log('sending AuthHttp get request for SponsorLetters with ' + url);
    return this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public postSponsorLetter(sponsorLetter: RptSponsorLetter,
                          studentId: number): Observable<RptMentorReport> {

    const url = this.WebApiPrefix + 'student_sponsor_letters/' + studentId;
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


//////////////////////////////////////////////////
/// Utilities
//////////////////////////////////////////////////


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



