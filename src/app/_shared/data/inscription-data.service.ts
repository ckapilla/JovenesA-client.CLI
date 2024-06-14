import { HttpClient } from '@angular/common/http';
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
  ///  Inscri[topmController
  /// ///////////////////////////////////////////////

  public getGradesListEntryDTOs(): Observable<Inscription[]> {
    const url = this.WebApiPrefix + 'becas/' + 'grades-list';
    console.log('sending AuthHttp get request for GradesList');
    return this.http.get<Inscription[]>(url).pipe(catchError(this.handleError));
  }

  public getGradesListForPeriod(gradesProcessingPeriodId: number): Observable<Inscription[]> {
    const url = this.WebApiPrefix + 'becas/' + 'grades-list/period/' + gradesProcessingPeriodId;
    console.log('sending AuthHttp get request for GradesList with url ' + url);
    return this.http.get<Inscription[]>(url).pipe(catchError(this.handleError));
  }

  public getInscription(studentGUId: string): Observable<Inscription[]> {
    const url = this.WebApiPrefix + 'becas/' + 'student-grades/' + studentGUId;
    console.log('sending AuthHttp get request for Inscription');
    return this.http.get<Inscription[]>(url).pipe(catchError(this.handleError));
  }

  public uploadStudentGradesReport(frmData: FormData,
    studentGUId: string,
    studentGradeId: number,
    gradesProcessingPeriodId: number,
    receivedDate: string
    ): Observable<any> | undefined{
    const url = this.WebApiPrefix + 'becas/' + 'student-grades-report' + '?studentGUId=' + studentGUId + '&studentGradeId='+ studentGradeId  + '&gradesProcessingPeriodId='+ gradesProcessingPeriodId + '&=';

    if (frmData) {
      const file: any = frmData.get('file');
      console.log('ready to post ' + url + ' filename: ' + file.name); // + ' options ' + headers);
      // console.log('with frmData.fileName = ' + frmData.get('fileName'));
      // console.log('with frmData.studentGUID = ' + frmData.get('studentGUID'));
      return this.http.post(url, frmData);
    }
    return undefined;
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
