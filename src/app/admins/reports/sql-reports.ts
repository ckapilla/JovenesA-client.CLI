import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlService } from '../../app_shared/services/url.service';
import { LatestMentorReports } from './shared/report-models/latest-mentor-reports';
import { LatestMentorReports2 } from './shared/report-models/latest-mentor-reports2';
import { LatestStudentLetters } from './shared/report-models/latest-student-letters';
import { LatestStudentLetters2 } from './shared/report-models/latest-student-letters2';
import { MentorReportSubmittedCount } from './shared/report-models/mentor-report-submitted-count';
import { SponsorSummarySentCount } from './shared/report-models/sponsor-summary-sent-count';
import { SponsorSummaryStatusCount } from './shared/report-models/sponsor-summary-status-count';



@Injectable({ providedIn: 'root' })
export class SqlReports {
  WebApiPrefix: string;

  constructor(private http: HttpClient,
    private webApiPrefixService: UrlService) {
    console.log('sqlReports constructor');
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

  public getLatestMentorReports(): Observable<LatestMentorReports[]> {
    const url = this.WebApiPrefix + 'reports/latest_mentor_reports';
    console.log('sending AuthHttp get request for LatestMentorReports with ' + url);
    return this.http.get<LatestMentorReports[]>(url).pipe(catchError(this.handleError));
  }

  public getLatestMentorReports2(): Observable<LatestMentorReports2[]> {
    const url = this.WebApiPrefix + 'reports/latest_mentor_reports2';
    console.log('sending AuthHttp get request for LatestMentorReports with ' + url);
    return this.http.get<LatestMentorReports2[]>(url).pipe(catchError(this.handleError));
  }

  public getLatestStudentLetters(): Observable<LatestStudentLetters[]> {
    const url = this.WebApiPrefix + 'reports/latest_student_letters';
    console.log('sending AuthHttp get request for LatestStudentLetters with ' + url);
    return this.http.get<LatestStudentLetters[]>(url).pipe(catchError(this.handleError));
  }

  public getLatestStudentLetters2(): Observable<LatestStudentLetters2[]> {
    const url = this.WebApiPrefix + 'reports/latest_student_letters2';
    console.log('sending AuthHttp get request for LatestStudentLetters2 with ' + url);
    return this.http.get<LatestStudentLetters2[]>(url).pipe(catchError(this.handleError));
  }

  public getSponsorSummaryStatusCounts(): Observable<SponsorSummaryStatusCount[]> {
    const url = this.WebApiPrefix + 'reports/sponsor_summary_status_counts';
    console.log('sending AuthHttp get request for SponsorSummaryStatusCounts with ' + url);
    return this.http.get<SponsorSummaryStatusCount[]>(url).pipe(catchError(this.handleError));
  }

  public getSponsorSummarySentCounts(): Observable<SponsorSummarySentCount[]> {
    const url = this.WebApiPrefix + 'reports/sponsor_summary_sent_counts';
    console.log('sending AuthHttp get request for SponsorSummarSentCounts with ' + url);
    return this.http.get<SponsorSummarySentCount[]>(url).pipe(catchError(this.handleError));
  }

  public getMentorReportSubmittedCounts(): Observable<MentorReportSubmittedCount[]> {
    const url = this.WebApiPrefix + 'reports/mentor_report_submitted_counts';
    console.log('sending AuthHttp get request for MentorReportSubmittedCounts with ' + url);
    return this.http.get<MentorReportSubmittedCount[]>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.log('sqlResource handle error');
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    if (errMsg === 'No JWT present or has expired') {
      window.alert('Session has expired, please log in again.');
    }
    return Observable.throw(errMsg);
  }

}
