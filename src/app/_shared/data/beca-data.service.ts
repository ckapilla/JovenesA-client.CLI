import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BecaPayment } from '../models/beca-payment';
import { BecaPaymentDTO } from '../models/beca-paymentDTO';
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


  public getBecaPaymentsByMonth(
    year: string,
    month: string,
    paymentStatusId: string
  ): Observable<BecaPaymentDTO[]> {
    const url =
      this.WebApiPrefix +
      'becas/payments/by_month' +
      '?year=' +
      year +
      '&month=' +
      month +
      '&paymentStatusId=' +
      paymentStatusId;
    console.log('sending AuthHttp get request for BecaPaymentsByMonth with ' + url);
    return this.http.get<BecaPaymentDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getBecaPaymentsForStudent(studentGUId: string): Observable<BecaPaymentDTO[]> {
    const url = this.WebApiPrefix + 'becas/' + 'payments/' + studentGUId;
    console.log('sending AuthHttp get request for BecaPayments');
    return this.http.get<BecaPaymentDTO[]>(url).pipe(catchError(this.handleError));
  }

  public updateBecaPayments(becaPayment: BecaPayment): Observable<any> {
    const url = this.WebApiPrefix + 'becas/' + 'payments/' + becaPayment.becaPaymentId;
    let body = JSON.stringify({ becaPayment }); //
    // strip outer 'studentGradeEntry' name

    const x = JSON.parse(body);
    body = JSON.stringify(x.becaPayment);
    console.log('in updateSBecaPayments');

    const returnedToken =
      // eslint-disable-next-line max-len
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVWTBOemxFTnpjMVJFUTJRMEZFTkVZNVJFSkVPVE5DUVVFMlJqYzRNRFJHTVRJd05qZ3hOQSJ9.eyJpc3MiOiJodHRwczovL2NrYXBpbGxhLmF1dGgwLmNvbS8iLCJzdWIiOiJVa3R5NEhhb0czc0UzeDJqWE1HMm1TOHo2dFM0R0JPUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9Kb3ZlbmVzQWRlbGFudGVXZWJBUEkiLCJpYXQiOjE3MzQ1MzY4MDQsImV4cCI6MTczNDYyMzIwNCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiVWt0eTRIYW9HM3NFM3gyalhNRzJtUzh6NnRTNEdCT1AifQ.WAm2OZ3dgowpFn73_G4KKBqe9FhXRCz1uGmiNaz6ZupufSZXJsXoFkz6_NVlM6Ke2COFEQtNcdWpFzWnj_PjPZ5neBoBdSfnHsjpAzIO1ysqiN4T0m_L32lQEeljEU2kAIR-plDZdEsGy0lOCnhHL_VbpGMwXrooekr4wXqPssuQofXBQcFLmmXaDSEqz7PjGEZjQcbzmrMsDiUBA0WE9-q6OUMxIs2ofVxA9qN3ePYol1h751_wi5PNCeLQckmXNE4mOQgdi-7B2R4X39o8w4RZVnignJ4pzgEJznXow6s1s6GDPvhCytHO92Fl_2-ifysbxJQCVgwF97li-S0uHQ';
      const headers = new HttpHeaders().set('Content-Type', 'application/json').set('authorization', returnedToken);
    console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }

  ////////////////////////////////////////////
  ////////////////////////////////////////////

  public getGradesListEntryDTOs(): Observable<GradesGivenEntryDTO[]> {
    const url = this.WebApiPrefix + 'becas/' + 'grades-list';
    console.log('sending AuthHttp get request for GradesList');
    return this.http.get<GradesGivenEntryDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getGradesListForPeriod(academicTermId: number): Observable<GradesGivenEntryDTO[]> {
    const url = this.WebApiPrefix + 'becas/' + 'grades-list/period/' + academicTermId;
    console.log('sending AuthHttp get request for GradesList with url ' + url);
    return this.http.get<GradesGivenEntryDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getStudentGradesForStudent(studentGUId: string): Observable<StudentGrades[]> {
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
    console.log('in updateStudentGrades');

    const returnedToken =
      // eslint-disable-next-line max-len
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVWTBOemxFTnpjMVJFUTJRMEZFTkVZNVJFSkVPVE5DUVVFMlJqYzRNRFJHTVRJd05qZ3hOQSJ9.eyJpc3MiOiJodHRwczovL2NrYXBpbGxhLmF1dGgwLmNvbS8iLCJzdWIiOiJVa3R5NEhhb0czc0UzeDJqWE1HMm1TOHo2dFM0R0JPUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9Kb3ZlbmVzQWRlbGFudGVXZWJBUEkiLCJpYXQiOjE3MzQ1MzY4MDQsImV4cCI6MTczNDYyMzIwNCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiVWt0eTRIYW9HM3NFM3gyalhNRzJtUzh6NnRTNEdCT1AifQ.WAm2OZ3dgowpFn73_G4KKBqe9FhXRCz1uGmiNaz6ZupufSZXJsXoFkz6_NVlM6Ke2COFEQtNcdWpFzWnj_PjPZ5neBoBdSfnHsjpAzIO1ysqiN4T0m_L32lQEeljEU2kAIR-plDZdEsGy0lOCnhHL_VbpGMwXrooekr4wXqPssuQofXBQcFLmmXaDSEqz7PjGEZjQcbzmrMsDiUBA0WE9-q6OUMxIs2ofVxA9qN3ePYol1h751_wi5PNCeLQckmXNE4mOQgdi-7B2R4X39o8w4RZVnignJ4pzgEJznXow6s1s6GDPvhCytHO92Fl_2-ifysbxJQCVgwF97li-S0uHQ';
      const headers = new HttpHeaders().set('Content-Type', 'application/json').set('authorization', returnedToken);
    console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }

  public uploadStudentGradesReport(frmData: FormData,
    studentGUId: string,
    studentGradeId: number,
    academicTermId: number,
    receivedDate: string
    ): Observable<any> {
    const url = this.WebApiPrefix + 'becas/' + 'student-grades-report' + '?studentGUId=' + studentGUId + '&studentGradeId='+ studentGradeId  + '&academicTermId='+ academicTermId + '&receivedDate=' + receivedDate;

    if (frmData) {
      const file: any = frmData.get('file');
      console.log('ready to post ' + url + ' filename: ' + file.name); // + ' options ' + headers);
      // console.log('with frmData.fileName = ' + frmData.get('fileName'));
      // console.log('with frmData.studentGUID = ' + frmData.get('studentGUID'));
      return this.http.post(url, frmData);
    }
  }

  private handleError(error: any) {
    console.log('beca-data handlError');
    JSON.stringify(error);
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';
    console.log(errMsg.message);
    console.log(errMsg.statusText);
    console.error(errMsg); // log to console instead
    if (errMsg === 'No JWT present or has expired') {
      window.alert('Session has expired, please log in again.');
    }
    return throwError(errMsg);
  }

  public setReviewedStatusId(becaPaymentId: number, reviewedStatusId: number): Observable<any> {
    const url = this.WebApiPrefix + 'becas/' + becaPaymentId + '/' + reviewedStatusId;
    console.log('sending AuthHttp put request to set reviewedStatusId ' + reviewedStatusId);
    return this.http
      .put(url, null)
      .pipe(tap(() => console.log('set reviewedStatus returned')), catchError(this.handleError));
  }
}
