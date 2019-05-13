import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Admin } from '../models/admin';
import { Communication } from '../models/communication';
import { Member } from '../models/member';
import { MemberWithAnyRelatedStudent } from '../models/member-with-any-related-student';
import { Mentor } from '../models/mentor';
import { RptMentorReport } from '../models/mentor-report';
import { MentorReportByMonth } from '../models/mentor-report-by-month';
import { MentorReportFollowUp } from '../models/mentor-report-follow-up';
import { MentorReportsStatusCount } from '../models/mentor-reports-status-count';
import { SponsorLetter } from '../models/sponsor-letter';
import { Student } from '../models/student';
import { RptStudentMentor } from '../models/student-mentor';
import { RptStudentSponsor } from '../models/student-sponsor';
import { StudentDTO } from '../models/studentDTO';
import { UrlService } from './url.service';



@Injectable({ providedIn: 'root' })
export class SqlResource {
  WebApiPrefix: string;

  constructor(private http: HttpClient,
    private webApiPrefixService: UrlService) {
    // console.log('sqlResource constructor');
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

//////////////////////////////////////////////////
///  StudentsController
//////////////////////////////////////////////////


public getStudent(studentId: Number): Observable<Student> {
  const url = this.WebApiPrefix + 'students/' + studentId;
  console.log('sending AuthHttp get request for Student');
  return this.http.get(url).pipe(catchError(this.handleError));
}

public getStudentDTO(studentId: number): Observable<StudentDTO> {
  const url = this.WebApiPrefix  + 'students/DTO/' + studentId;
// statusId: vm.selectedStatus.statusId, gradYear: vm.selectedGradYear.year, yearJoinedJA: vm.selectedYearJoined.year },
  console.log('sending AuthHttp get request for Students');
  return this.http.get<StudentDTO>(url);
}

public getStudentDTOsByStatusAndYear(statusId: string, yearJoinedJA: string, gradYear: string): Observable<StudentDTO[]> {
  const url = this.WebApiPrefix
  + 'students'
  + '/' + statusId
  + '/' + yearJoinedJA
  + '/' + gradYear;
  console.log('sending AuthHttp get request for Students with url ' + url);
  return this.http.get<StudentDTO[]>(url).pipe(catchError(this.handleError));
}

public getStudentsForMentor(mentorId: Number): Observable<RptStudentMentor[]> {
  const url = this.WebApiPrefix + 'students/for_mentor/' + mentorId;
  console.log('sending AuthHttp get request for StudentsForMentor');
  return this.http.get<RptStudentMentor[]>(url).pipe(catchError(this.handleError));
}

public getSponsorsForStudent(studentId: number): Observable<RptStudentSponsor[]> {
  const url = this.WebApiPrefix + 'students/sponsors_for/' + studentId;
  console.log('sending AuthHttp get request ' +  url);
  return this.http.get<RptStudentSponsor[]>(url).pipe(catchError(this.handleError));
}

public updateStudent(student: Student): Observable<any> {
  const url = this.WebApiPrefix + 'students/' + student.studentId;
  let body = JSON.stringify({ student });
  // strip outer 'student' name
  const x = JSON.parse(body);
  body = JSON.stringify(x.student);
  // console.log('in updateStudent');

    // tslint:disable-next-line:max-line-length
  const returnedToken =  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFVWTBOemxFTnpjMVJFUTJRMEZFTkVZNVJFSkVPVE5DUVVFMlJqYzRNRFJHTVRJd05qZ3hOQSJ9.eyJpc3MiOiJodHRwczovL2NrYXBpbGxhLmF1dGgwLmNvbS8iLCJzdWIiOiJVa3R5NEhhb0czc0UzeDJqWE1HMm1TOHo2dFM0R0JPUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9Kb3ZlbmVzQWRlbGFudGVXZWJBUEkiLCJpYXQiOjE1MDc4NTEzNzAsImV4cCI6MTUwNzkzNzc3MCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.U02NuYo1yguqjtV0gczSkC6UiiGV-QZEjE1k22UOGYI-SbjZQx9h1wkqa3PNiOIPlc3TLnBLW91c5Gz8apuIePnwugq2KApuupmhaS8eDLKFwRx5CZM0XPwYc6kHuxCkn3mk8Y_Siu8A0WpqAaVPhuUHv-szR0MABgBZ27B-KmeGJ-ub05bddwwS4ghpVu-OF7awelwZ74GJ-e7drhCHedwrsLp1bOgKUrzo9JUMs4tk4pmr7Sm4zX6HKqdQ7j53qys_A935m15aHwkNnnhNYWuul8LrbjDwvpTGdcQ55JxnR0logFL2XsYAFFeYykManb5EseXE7dsix_JrE82ICw';

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

        const url = this.WebApiPrefix + 'members/' + member.memberId;

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


public getMentorReport(mentorReportId: number): Observable <RptMentorReport>  {
    const url = this.WebApiPrefix + 'mentor_reports/' + mentorReportId;
    console.log('sending AuthHttp get request for MentorReport with ' + url);
    return this.http.get(url).pipe(catchError(this.handleError));

  }

  public getMentorReportDTOs(mentorId: number, studentId: number): Observable <RptMentorReport[]>  {
    const url = this.WebApiPrefix + 'mentor_reports/' + mentorId + '/' + studentId;
    console.log('sending AuthHttp get request for MentorReports with ' + url);
    return this.http.get<RptMentorReport[]>(url).pipe(catchError(this.handleError));

  }

  public getMentorReportsFollowUpStatus(): Observable <MentorReportFollowUp[]>  {
    const url = this.WebApiPrefix + 'mentor_reports/follow_up';
    console.log('sending AuthHttp get request with ' + url);
    return this.http.get<MentorReportFollowUp[]>(url).pipe(catchError(this.handleError));

  }

  public updateMentorReport(mentorReport: RptMentorReport): Observable<RptMentorReport> {

    const url = this.WebApiPrefix + 'mentor_reports'; // + mentorReport.mentorReportId ;
    let body = JSON.stringify({ mentorReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.mentorReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }


  public addMentorReport(mentorReport: RptMentorReport,
      mentorId: number,
      studentId: number): Observable<RptMentorReport> {

    const url = this.WebApiPrefix + 'mentor_reports';
    let body = JSON.stringify({ mentorReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.mentorReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });
  }
//   public editMentorReport(mentorReport: RptMentorReport): Observable<RptMentorReport> {

//    const url = this.WebApiPrefix + 'mentor_reports';
//   console.log('editMentorReport ' + url);
//   let body = JSON.stringify({ mentorReport });
//   // strip outer 'mentor' name
//   const x = JSON.parse(body);
//   body = JSON.stringify(x.mentorReport);
//   const headers = new HttpHeaders().set('Content-Type', 'application/json');
//   // console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
//   return this.http.put(url, body, { headers: headers })
// }

  public getMentorReportsByMonth(year: string, month: string,
    summaryStatusId: string, highlightStatusId: string): Observable <MentorReportByMonth[]>  {
    const url = this.WebApiPrefix + 'mentor_reports/by_month'
                        + '?year=' + year
                        + '&month=' + month
                        + '&summaryStatusId=' + summaryStatusId
                        + '&highlightStatusId=' + highlightStatusId;
    console.log('sending AuthHttp get request for MentorReportsByMonth with ' + url);
    return this.http.get<MentorReportByMonth[]>(url).pipe(catchError(this.handleError));

}

public getMentorReportsStatusCounts(year: string, month: string): Observable <MentorReportsStatusCount[]>  {
  const url = this.WebApiPrefix + 'mentor_reports/status_counts'
                      + '?year=' + year
                      + '&month=' + month;
                      // + '&summaryStatusId=' + summaryStatusId
                      // + '&highlightStatusId=' + highlightStatusId;
  console.log('sending AuthHttp get request for MentorReportsStatusCounts with ' + url);
  return this.http.get<MentorReportsStatusCount[]>(url).pipe(catchError(this.handleError));

}

//////////////////////////////////////////////////
///  SponsorReportsController
//////////////////////////////////////////////////


  public getSponsorLetters(studentId: number, sponsorId: number): Observable <SponsorLetter[]>  {
    const url = this.WebApiPrefix + 'student_sponsor_letters/' + studentId + '/' + sponsorId;
    console.log('sending AuthHttp get request for SponsorLetters with ' + url);
    return this.http.get<SponsorLetter[]>(url).pipe(catchError(this.handleError));

  }

  public postSponsorLetter(sponsorLetter: SponsorLetter,
                          studentId: number,
                          sponsorGroupId: number): Observable<RptMentorReport> {

    const url = this.WebApiPrefix + 'student_sponsor_letters/' + studentId + '/' + sponsorGroupId;
    console.log('in postSponsorLetter with url ' + url );
    let body = JSON.stringify({ sponsorLetter });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.sponsorLetter);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });

  }


//////////////////////////////////////////////////
/// Utilities
//////////////////////////////////////////////////


  // private extractData(res: Response) {
  //   console.log('sqlResource extractData');
  //   const body = res.json();
  //   return body.data || { };
  // }

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


