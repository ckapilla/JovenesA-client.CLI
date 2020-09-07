import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { QuarterlyReport } from '../models/quarterly-report';
import { QuarterlyReportRPT } from '../models/quarterly-reportRPT';
import { UrlService } from '../services/url.service';

@Injectable({ providedIn: 'root' })
export class QuarterlyDataService {
  WebApiPrefix: string;

  constructor(private http: HttpClient, private webApiPrefixService: UrlService) {
    // console.log('data service constructor');
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

  /// ///////////////////////////////////////////////
  ///  StudentsController
  /// ///////////////////////////////////////////////

  public getQuarterlyReport(quarterlyReportGUId: string): Observable<QuarterlyReport> {
    const url = this.WebApiPrefix + 'quarterlyreport/' + quarterlyReportGUId;
    console.log('sending AuthHttp get request for QuarterlyReport');
    return this.http.get<QuarterlyReport>(url).pipe(catchError(this.handleError));
  }

  public getQuarterlyReportsForStudent(studentGUId: string, yearPeriod: string): Observable<QuarterlyReport[]> {
    const year = yearPeriod.substr(0, 4);
    const period = yearPeriod.substr(5, 1);
    const url = this.WebApiPrefix + 'quarterlyreport/' + studentGUId + '/' + year + '/' + period;
    console.log('sending AuthHttp get request for QuarterlyReportForStudentPeriod');
    return this.http.get<QuarterlyReport[]>(url).pipe(catchError(this.handleError));
  }

  public getQRMiniForStudentPeriod(studentGUId: string, yearPeriod: string): Observable<QuarterlyReportRPT> {
    const year = yearPeriod.substr(0, 4);
    const period = yearPeriod.substr(5, 1);
    const url = this.WebApiPrefix + 'quarterly/single/' + studentGUId + '/' + year + '/' + period;
    console.log('sending AuthHttp get request for QRMiniForStudentPeriod with url' + url);
    return this.http.get<QuarterlyReportRPT>(url).pipe(catchError(this.handleError));
  }

  public getQRMinisForPeriod(yearPeriod: string, reviewedStatusId: number): Observable<QuarterlyReportRPT[]> {
    const year = yearPeriod.substr(0, 4);
    const period = yearPeriod.substr(5, 1);
    const url = this.WebApiPrefix + 'quarterly/' + year + '/' + period + '/' + reviewedStatusId;
    console.log('sending AuthHttp get request for QRMinisForPeriod');
    return this.http.get<QuarterlyReportRPT[]>(url).pipe(catchError(this.handleError));
  }

  public getPartialQuarterlyReportByPeriod(
    partialType: string,
    studentGUId: string,
    yearPeriod: string,
    reviewedStatusId: string
  ): Observable<QuarterlyReport> {
    const year = yearPeriod.substr(0, 4);
    const period = yearPeriod.substr(5, 1);

    const url =
      this.WebApiPrefix +
      'quarterly/' +
      partialType +
      '/' +
      studentGUId +
      '/' +
      year +
      '/' +
      period +
      '/' +
      reviewedStatusId;
    console.log('sending AuthHttp get request for getPartialQuarterlyReportByPeriod with ' + url);
    return this.http.get<QuarterlyReport>(url).pipe(catchError(this.handleError));
  }

  public setQRReviewedStatus(quarterlyReportGUId: string, reviewedStatusId: number): Observable<any> {
    const url = this.WebApiPrefix + 'quarterly/status/' + quarterlyReportGUId + '/' + reviewedStatusId;
    console.log('sending AuthHttp put request to set reviewedStatusId ' + reviewedStatusId);
    return this.http
      .put(url, null)
      .pipe(tap(() => console.log('set reviewedStatus returned')), catchError(this.handleError));
  }

  public setQRHighlightStatus(quarterlyReportGUId: string, highlightStatusId: number): Observable<any> {
    const url = this.WebApiPrefix + 'quarterly/highlight_status/' + quarterlyReportGUId + '/' + highlightStatusId;
    console.log('sending AuthHttp put request to with URL' + url);
    return this.http
      .put(url, null)
      .pipe(tap(() => console.log('set highlightStatus returned')), catchError(this.handleError));
  }

  public updatePartialQuarterlyReport(
    quarterlyReport: QuarterlyReport,
    partialType: string
  ): Observable<QuarterlyReport> {
    const url = this.WebApiPrefix + 'quarterly/' + partialType;
    console.log('in putPartialQuarterlyReport with url ' + url);
    const body = JSON.stringify(quarterlyReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
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
