import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GradesGivenEntryDTO } from '../models/grades-given-entryDTO';
import { StudentGrades } from '../models/student-grades';
import { UrlService } from '../services/url.service';

@Injectable({ providedIn: 'root' })
export class BecaDataService {
  WebApiPrefix: string;

  constructor(private http: HttpClient, private webApiPrefixService: UrlService) {
    // console.log('data service constructor');
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

  /// ///////////////////////////////////////////////
  ///  BecasController
  /// ///////////////////////////////////////////////

  public getGradesListEntryDTOs(): Observable<GradesGivenEntryDTO[]> {
    const url = this.WebApiPrefix + 'becas/' + 'grades-list';
    console.log('sending AuthHttp get request for GradesList');
    return this.http.get<GradesGivenEntryDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getStudentGrades(studentGUId: string): Observable<StudentGrades[]> {
    const url = this.WebApiPrefix + 'becas/' + 'student-grades/' + studentGUId;
    console.log('sending AuthHttp get request for StudentGrades');
    return this.http.get<StudentGrades[]>(url).pipe(catchError(this.handleError));
  }

  public updateStudentGrades(studentGradeEntry: StudentGrades): Observable<any> {
    const url = this.WebApiPrefix + 'becas/' + 'student-grades/' + studentGradeEntry.studentGradeId;
    let body = JSON.stringify({ studentGradeEntry }); //
    // strip outer 'studentGradeEntry' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.studentGradeEntry);
    console.log('in updateStudentGradeEntry');
    const returnedToken =
    // eslint-disable-next-line max-len
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFVWTBOemxFTnpjMVJFUTJRMEZFTkVZNVJFSkVPVE5DUVVFMlJqYzRNRFJHTVRJd05qZ3hOQSJ9.eyJpc3MiOiJodHRwczovL2NrYXBpbGxhLmF1dGgwLmNvbS8iLCJzdWIiOiJVa3R5NEhhb0czc0UzeDJqWE1HMm1TOHo2dFM0R0JPUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9Kb3ZlbmVzQWRlbGFudGVXZWJBUEkiLCJpYXQiOjE1MDc4NTEzNzAsImV4cCI6MTUwNzkzNzc3MCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.U02NuYo1yguqjtV0gczSkC6UiiGV-QZEjE1k22UOGYI-SbjZQx9h1wkqa3PNiOIPlc3TLnBLW91c5Gz8apuIePnwugq2KApuupmhaS8eDLKFwRx5CZM0XPwYc6kHuxCkn3mk8Y_Siu8A0WpqAaVPhuUHv-szR0MABgBZ27B-KmeGJ-ub05bddwwS4ghpVu-OF7awelwZ74GJ-e7drhCHedwrsLp1bOgKUrzo9JUMs4tk4pmr7Sm4zX6HKqdQ7j53qys_A935m15aHwkNnnhNYWuul8LrbjDwvpTGdcQ55JxnR0logFL2XsYAFFeYykManb5EseXE7dsix_JrE82ICw';
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('authorization', returnedToken);
    console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }

  private handleError(error: any) {
    console.log('quarterly-data handlError');
    JSON.stringify(error);
    const errMsg = error.message
      ? error.message
      : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg.message);
    console.log(errMsg.statusText);
    console.error(errMsg); // log to console instead
    if (errMsg === 'No JWT present or has expired') {
      window.alert('Session has expired, please log in again.');
    }
    return throwError(errMsg);
  }
}
