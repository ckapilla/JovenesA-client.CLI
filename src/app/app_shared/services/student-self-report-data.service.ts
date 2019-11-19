import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MentorReportsStatusCount } from '../models/mentor-reports-status-count';
import { StudentSelfReport } from '../models/student-self-report';
import { BaseDataService } from './base-data.service';
import { UrlService } from './url.service';


@Injectable({ providedIn: 'root' })
export class StudentSelfReportDataService extends BaseDataService {
  // WebApiPrefix: string;

  constructor(public http: HttpClient,
    public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

  //////////////////////////////////////////////////
  ///  StudentSelfReportsController
  //////////////////////////////////////////////////

  public getStudentSelfReportsStatusCounts(year: string, period: string): Observable<MentorReportsStatusCount[]> {
    const url = this.WebApiPrefix + 'student_self_reports/status_counts'
      + '?year=' + year
      + '&period=' + period;
    console.log('sending AuthHttp get request for MentorReportsStatusCounts with ' + url);
    return this.http.get<MentorReportsStatusCount[]>(url).pipe(catchError(this.handleError));
  }


  public getStudentSelfReports(studentId: number, sponsorId: number): Observable<StudentSelfReport[]> {
    const url = this.WebApiPrefix + 'student_self_reports/' + studentId + '/' + sponsorId;
    console.log('sending AuthHttp get request for StudentSelfReports with ' + url);
    return this.http.get<StudentSelfReport[]>(url).pipe(catchError(this.handleError));
  }

  public getStudentSelfReport(selfReportId: number): Observable<StudentSelfReport> {
    const url = this.WebApiPrefix + 'student_self_reports/' + selfReportId;
    console.log('sending AuthHttp get request for StudentSelfReports with ' + url);
    return this.http.get<StudentSelfReport>(url).pipe(catchError(this.handleError));
  }

  public getStudentSelfReportsByPeriod(year: string, period: string,
    reviewedStatusId: string, studentGUId: string): Observable<StudentSelfReport[]> {
    const url = this.WebApiPrefix + 'student_self_reports/by_period'
      + '?year=' + year
      + '&period=' + period
      + '&reviewedStatusId=' + reviewedStatusId
      + '&studentGUId=' + studentGUId;
    console.log('sending AuthHttp get request for StudentSelfReportsByMonth with ' + url);
    return this.http.get<StudentSelfReport[]>(url).pipe(catchError(this.handleError));
  }

  public postStudentSelfReport(selfReport: StudentSelfReport): Observable<StudentSelfReport> {

    const url = this.WebApiPrefix + 'student_self_reports';
    console.log('in postSelfReport with url ' + url);
    let body = JSON.stringify({ selfReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.selfReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });
  }

  public putStudentSelfReport(selfReport: StudentSelfReport): Observable<StudentSelfReport> {

    const url = this.WebApiPrefix + 'student_self_reports';
    console.log('in putSelfReport with url ' + url);
    let body = JSON.stringify({ selfReport });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.selfReport);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to putt ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }

}