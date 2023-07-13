import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Titulos } from '../models/titulos';
import { TitulosGivenEntryDTO } from '../models/titulos-given-entryDTO';
import { UrlService } from '../services/url.service';

@Injectable({ providedIn: 'root' })
export class TituloDataService {
  WebApiPrefix: string;

  constructor(private http: HttpClient, private webApiPrefixService: UrlService) {
    // console.log('data service constructor');
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

  /// ///////////////////////////////////////////////
  ///  TitulosController
  /// ///////////////////////////////////////////////

  public getTitulosListEntryDTOs(): Observable<TitulosGivenEntryDTO[]> {
    const url = this.WebApiPrefix + 'titulos/' + 'grades-list';
    console.log('sending AuthHttp get request for GradesList');
    return this.http.get<TitulosGivenEntryDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getTitulosListForYearJoined(yearJoined: number): Observable<TitulosGivenEntryDTO[]> {
    const url = this.WebApiPrefix + 'titulos/' + 'titulos-list/year-joined/' + yearJoined;
    console.log('sending AuthHttp get request for TitulosList with url ' + url);
    return this.http.get<TitulosGivenEntryDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getTitulos(studentGUId: string): Observable<Titulos[]> {
    const url = this.WebApiPrefix + 'titulos/' + 'student-grades/' + studentGUId;
    console.log('sending AuthHttp get request for Titulos');
    return this.http.get<Titulos[]>(url).pipe(catchError(this.handleError));
  }

  public updateTitulos(studentGradeEntry: Titulos): Observable<any> {
    const url = this.WebApiPrefix + 'titulos/' + 'student-grades/' + studentGradeEntry.tituloId;
    let body = JSON.stringify({ studentGradeEntry }); //
    // strip outer 'studentGradeEntry' name

    const x = JSON.parse(body);
    body = JSON.stringify(x.studentGradeEntry);
    console.log('in updateTitulos');

    const returnedToken =
      // eslint-disable-next-line max-len
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlFVWTBOemxFTnpjMVJFUTJRMEZFTkVZNVJFSkVPVE5DUVVFMlJqYzRNRFJHTVRJd05qZ3hOQSJ9.eyJpc3MiOiJodHRwczovL2NrYXBpbGxhLmF1dGgwLmNvbS8iLCJzdWIiOiJVa3R5NEhhb0czc0UzeDJqWE1HMm1TOHo2dFM0R0JPUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9Kb3ZlbmVzQWRlbGFudGVXZWJBUEkiLCJpYXQiOjE1MDc4NTEzNzAsImV4cCI6MTUwNzkzNzc3MCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.U02NuYo1yguqjtV0gczSkC6UiiGV-QZEjE1k22UOGYI-SbjZQx9h1wkqa3PNiOIPlc3TLnBLW91c5Gz8apuIePnwugq2KApuupmhaS8eDLKFwRx5CZM0XPwYc6kHuxCkn3mk8Y_Siu8A0WpqAaVPhuUHv-szR0MABgBZ27B-KmeGJ-ub05bddwwS4ghpVu-OF7awelwZ74GJ-e7drhCHedwrsLp1bOgKUrzo9JUMs4tk4pmr7Sm4zX6HKqdQ7j53qys_A935m15aHwkNnnhNYWuul8LrbjDwvpTGdcQ55JxnR0logFL2XsYAFFeYykManb5EseXE7dsix_JrE82ICw';
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('authorization', returnedToken);
    console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }

  public uploadTitulosReport(frmData: FormData, studentGUId: string, studentGradeId: number, gradesProcessingPeriodId: number): Observable<any> {
    const url = this.WebApiPrefix + 'titulos/' + 'student-grades-report' + '?studentGUId=' + studentGUId + '&studentGradeId='+ studentGradeId  + '&gradesProcessingPeriodId='+ gradesProcessingPeriodId;
    // const headers = new HttpHeaders().set(
    //   'Content-Type',
    //   'multipart/form-data; boundary=----WebKitFormBoundary0BPm0koKA'
    // );
    if (frmData) {
      const file: any = frmData.get('file');
      console.log('ready to post ' + url + ' filename: ' + file.name); // + ' options ' + headers);
      // console.log('with frmData.fileName = ' + frmData.get('fileName'));
      // console.log('with frmData.studentGUID = ' + frmData.get('studentGUID'));
    }
    return this.http.post(url, frmData);
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
}
