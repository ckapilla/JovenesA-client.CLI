import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseDataService } from '../data/base-data.service';
import { Student } from '../models/student';
import { StudentSponsorXRef } from '../models/student-sponsor-xref';
import { StudentDTO } from '../models/studentDTO';
import { StudentHeaderDTO } from '../models/studentHeaderDTO';
import { StudentMiniDTO } from '../models/studentMiniDTO';
import { UrlService } from '../services/url.service';

@Injectable({ providedIn: 'root' })
export class StudentDataService extends BaseDataService {
  // WebApiPrefix: string;

  constructor(public http: HttpClient, public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

  /// ///////////////////////////////////////////////
  ///  StudentsController
  /// ///////////////////////////////////////////////

  public getStudent(studentId: number): Observable<Student> {
    const url = this.WebApiPrefix + 'students/' + studentId;
    console.log('sending AuthHttp get request for Student');
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getStudentViaGUID(studentGUId: string): Observable<Student> {
    const url = this.WebApiPrefix + 'students/' + studentGUId;
    console.log('sending AuthHttp get request for Student by GUID');
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  public getStudentDTO(studentId: number): Observable<StudentDTO> {
    const url = this.WebApiPrefix + 'students/DTO/' + studentId;
    console.log('sending AuthHttp get request for Students');
    return this.http.get<StudentDTO>(url);
  }

  public getStudentDTOViaGUID(studentGUId: string): Observable<StudentDTO> {
    const url = this.WebApiPrefix + 'students/DTO/' + studentGUId;
    console.log('sending AuthHttp get request for Students');
    return this.http.get<StudentDTO>(url);
  }

  public getStudentHeaderDTO(studentGUId: string): Observable<StudentHeaderDTO> {
    const url = this.WebApiPrefix + 'students/headerDTO/' + studentGUId;
    console.log('sending AuthHttp get request for Students');
    return this.http.get<StudentHeaderDTO>(url);
  }

  public getStudentDTOsByStatusAndYear(
    activeStatus: string,
    statusId: string,
    yearJoinedJA: string,
    gradYear: string
  ): Observable<StudentDTO[]> {
    const url =
      this.WebApiPrefix + 'students' + '/' + activeStatus + '/' + statusId + '/' + yearJoinedJA + '/' + gradYear;
    console.log('sending AuthHttp get request for Students with url ' + url);
    return this.http.get<StudentDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getCurrentStudentMiniDTO(guid: string): Observable<StudentMiniDTO> {
    const url = this.WebApiPrefix + 'students/name/' + guid;
    console.log('sending AuthHttp get request for StudentMini with url ' + url);
    return this.http.get<StudentMiniDTO>(url).pipe(catchError(this.handleError));
  }

  public getCurrentStudentMiniDTOs(searchStr: string): Observable<StudentMiniDTO[]> {
    const url = this.WebApiPrefix + 'students/names/' + (searchStr > '' ? searchStr : '-') + '/' + 1005;
    console.log('sending AuthHttp get request for StudentMini with url ' + url);
    return this.http.get<StudentMiniDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getStudentsForMentorByGUId(mentorGUId: string): Observable<StudentDTO[]> {
    const url = this.WebApiPrefix + 'students/for_mentor/' + mentorGUId;
    console.log('sending AuthHttp get request for StudentsForMentor with url ' + url);
    const xx = this.http.get<StudentDTO[]>(url).pipe(catchError(this.handleError));
    console.log(xx);
    return xx;
  }

  public getStudentsForSponsorByGUId(sponsorGUId: string): Observable<StudentSponsorXRef[]> {
    const url = this.WebApiPrefix + 'students/for_sponsor/' + sponsorGUId;
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<StudentSponsorXRef[]>(url).pipe(catchError(this.handleError));
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

  public updateStudent(student: Student): Observable<any> {
    const url = this.WebApiPrefix + 'students/' + student.studentId;
    let body = JSON.stringify({ student }); //
    // strip outer 'student' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.student);
    // console.log('in updateStudent');

    const returnedToken =
      // eslint-disable-next-line max-len
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFVWTBOemxFTnpjMVJFUTJRMEZFTkVZNVJFSkVPVE5DUVVFMlJqYzRNRFJHTVRJd05qZ3hOQSJ9.eyJpc3MiOiJodHRwczovL2NrYXBpbGxhLmF1dGgwLmNvbS8iLCJzdWIiOiJVa3R5NEhhb0czc0UzeDJqWE1HMm1TOHo2dFM0R0JPUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9Kb3ZlbmVzQWRlbGFudGVXZWJBUEkiLCJpYXQiOjE1MDc4NTEzNzAsImV4cCI6MTUwNzkzNzc3MCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.U02NuYo1yguqjtV0gczSkC6UiiGV-QZEjE1k22UOGYI-SbjZQx9h1wkqa3PNiOIPlc3TLnBLW91c5Gz8apuIePnwugq2KApuupmhaS8eDLKFwRx5CZM0XPwYc6kHuxCkn3mk8Y_Siu8A0WpqAaVPhuUHv-szR0MABgBZ27B-KmeGJ-ub05bddwwS4ghpVu-OF7awelwZ74GJ-e7drhCHedwrsLp1bOgKUrzo9JUMs4tk4pmr7Sm4zX6HKqdQ7j53qys_A935m15aHwkNnnhNYWuul8LrbjDwvpTGdcQ55JxnR0logFL2XsYAFFeYykManb5EseXE7dsix_JrE82ICw';

    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('authorization', returnedToken);
    console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }
}
