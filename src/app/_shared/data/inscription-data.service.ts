import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inscription } from '../models/inscription';
import { UrlService } from '../services/url.service';

@Injectable({ providedIn: 'root' })
export class InscriptionDataService {
  WebApiPrefix: string;

  constructor(private http: HttpClient, private webApiPrefixService: UrlService) {
    // console.log('data service constructor');
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

  /// ///////////////////////////////////////////////
  ///  InscriptionController
  /// ///////////////////////////////////////////////

  // public getInscriptionsListDTOs(): Observable<Inscription[]> {
  //   const url = this.WebApiPrefix + 'becas/inscriptions/' + 'inscriptions-list';
  //   console.log('sending AuthHttp get request for InscriptionsList');
  //   return this.http.get<Inscription[]>(url).pipe(catchError(this.handleError));
  // }

  public getInscriptionsForPeriod(gradesProcessingPeriodId: number): Observable<Inscription[]> {
    const url = this.WebApiPrefix + 'becas/inscriptions/' + 'for-period/' + gradesProcessingPeriodId;
    console.log('sending AuthHttp get request for Inscriptions for Period with url ' + url);
    return this.http.get<Inscription[]>(url).pipe(catchError(this.handleError));
  }

  public getInscriptionsForStudent(studentGUId: string): Observable<Inscription[]> {
    const url = this.WebApiPrefix + 'becas/inscriptions/' + 'for-student/' + studentGUId;
    console.log('sending AuthHttp get request for Inscription ' + url);
    return this.http.get<Inscription[]>(url).pipe(catchError(this.handleError));
  }


  public updateInscriptions(inscriptionEntry: Inscription): Observable<any> {
    const url = this.WebApiPrefix + 'becas/' + 'inscriptions/' + inscriptionEntry.inscriptionId;
    let body = JSON.stringify({ inscriptionEntry: inscriptionEntry }); //
    // strip outer 'inscriptionEntry' name

    const x = JSON.parse(body);
    body = JSON.stringify(x.inscriptionEntry);
    console.log('in updateInscriptions');

    const returnedToken =
      // eslint-disable-next-line max-len
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFVWTBOemxFTnpjMVJFUTJRMEZFTkVZNVJFSkVPVE5DUVVFMlJqYzRNRFJHTVRJd05qZ3hOQSJ9.eyJpc3MiOiJodHRwczovL2NrYXBpbGxhLmF1dGgwLmNvbS8iLCJzdWIiOiJVa3R5NEhhb0czc0UzeDJqWE1HMm1TOHo2dFM0R0JPUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9Kb3ZlbmVzQWRlbGFudGVXZWJBUEkiLCJpYXQiOjE1MDc4NTEzNzAsImV4cCI6MTUwNzkzNzc3MCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.U02NuYo1yguqjtV0gczSkC6UiiGV-QZEjE1k22UOGYI-SbjZQx9h1wkqa3PNiOIPlc3TLnBLW91c5Gz8apuIePnwugq2KApuupmhaS8eDLKFwRx5CZM0XPwYc6kHuxCkn3mk8Y_Siu8A0WpqAaVPhuUHv-szR0MABgBZ27B-KmeGJ-ub05bddwwS4ghpVu-OF7awelwZ74GJ-e7drhCHedwrsLp1bOgKUrzo9JUMs4tk4pmr7Sm4zX6HKqdQ7j53qys_A935m15aHwkNnnhNYWuul8LrbjDwvpTGdcQ55JxnR0logFL2XsYAFFeYykManb5EseXE7dsix_JrE82ICw';
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('authorization', returnedToken);
    console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }

  public uploadStudentGradesImage(frmData: FormData,
    studentGUId: string,
    studentGradeId: number,
    gradesProcessingPeriodId: number,
    receivedDate: string
    ): Observable<any> {
    const url = this.WebApiPrefix + 'becas/' + 'student-grades-report' + '?studentGUId=' + studentGUId + '&studentGradeId='+ studentGradeId  + '&gradesProcessingPeriodId='+ gradesProcessingPeriodId + '&receivedDate=' + receivedDate;

    if (frmData) {
      const file: any = frmData.get('file');
      console.log('ready to post ' + url + ' filename: ' + file.name); // + ' options ' + headers);
      // console.log('with frmData.fileName = ' + frmData.get('fileName'));
      // console.log('with frmData.studentGUID = ' + frmData.get('studentGUID'));
      return this.http.post(url, frmData);
    }
  }


  public uploadInscriptionImage(frmData: FormData,
    studentGUId: string,
    inscriptionId: number,
    gradesProcessingPeriodId: number,
    receivedDate: string
    ): Observable<any>{
    const url = this.WebApiPrefix + 'becas/inscriptions/' + 'inscription' + '?studentGUId=' + studentGUId + 'InscriptionId='+ inscriptionId  + '&gradesProcessingPeriodId='+ gradesProcessingPeriodId ;

    if (frmData) {
      const file: any = frmData.get('file');
      console.log('ready to post ' + url + ' filename: ' + file.name); // + ' options ' + headers);
      // console.log('with frmData.fileName = ' + frmData.get('fileName'));
      // console.log('with frmData.studentGUID = ' + frmData.get('studentGUID'));
      return this.http.post(url, frmData);
    }
  }

  private handleError(error: any) {
    console.log('becas-inscriptions-data handlError');
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
}
