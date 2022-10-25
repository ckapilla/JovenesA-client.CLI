import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseDataService } from '../data/base-data.service';
// import { FollowUpEvent } from '../models/follow-up-event';
// import { FollowUpEventRPT } from '../models/follow-up-eventRPT';
import { FollowUpRequest } from '../models/follow-up-request';
import { FollowUpRequestDTO } from '../models/follow-up-requestDTO';
import { UrlService } from '../services/url.service';

@Injectable({ providedIn: 'root' })
export class FollowUpDataService extends BaseDataService {
  // WebApiPrefix: string;

  constructor(public http: HttpClient, public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

  /// ///////////////////////////////////////////////
  ///  FollowUpController
  /// ///////////////////////////////////////////////

  public getFollowUpRequestForStudent(studentId?: number): Observable<FollowUpRequestDTO> {
    let url = this.WebApiPrefix + 'follow_up_requests';
    if (studentId) {
      url = url + '?studentId=' + studentId;
    }
    console.log('sending AuthHttp get request with ' + url);
    return this.http.get<FollowUpRequestDTO>(url).pipe(catchError(this.handleError));
  }

  public getFollowUpRequestByRequest(requestId?: string): Observable<FollowUpRequest> {
    let url = this.WebApiPrefix + 'follow_up_requests';
    if (requestId) {
      url = url + '?requestId=' + requestId;
    }
    console.log('sending AuthHttp get request with ' + url);
    return this.http.get<FollowUpRequest>(url).pipe(catchError(this.handleError));
  }

  public getFollowUpRequestDTOByStatus(statusId: string): Observable<FollowUpRequestDTO[]> {
    let url = this.WebApiPrefix + 'follow_up_requests/dto';
    if (statusId) {
      url = url + '?statusId=' + statusId;
    }
    console.log('sending AuthHttp get request with ' + url);
    return this.http.get<FollowUpRequestDTO[]>(url).pipe(catchError(this.handleError));
  }

  // public getFollowUpRequestRPT(requestId: string): Observable<FollowUpRequestDTO> {
  //   let url = this.WebApiPrefix + 'follow_up_requests';
  //   // url = `${url}?requestId=${requestId}`;
  //   url = `${url}/${requestId}`;
  //   console.log('sending AuthHttp get request with ' + url);
  //   return this.http.get<FollowUpRequestDTO>(url).pipe(catchError(this.handleError));
  // }
  public postFollowUpRequest(followUpRequest: FollowUpRequest): Observable<any> {
    const url = this.WebApiPrefix + 'follow_up_requests';
    console.log('in postFollowUpRequest with url ' + url);
    let body = JSON.stringify({ followUpRequest });
    // strip outer key name
    const x = JSON.parse(body);
    body = JSON.stringify(x.followUpRequest);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });
  }
  public updateFollowUpRequest(followUpRequest: FollowUpRequest): Observable<any> {
    const url = this.WebApiPrefix + 'follow_up_requests';
    console.log('in putFollowUpRequest with url ' + url);
    let body = JSON.stringify({ followUpRequest });
    // strip outer key name
    const x = JSON.parse(body);
    body = JSON.stringify(x.followUpRequest);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }

  // public getFollowUpEvents(followUpRequestId: number): Observable<FollowUpEventRPT[]> {
  //   const url = this.WebApiPrefix + 'follow_up_events/' + followUpRequestId;
  //   console.log('sending AuthHttp get request with ' + url);
  //   return this.http.get<FollowUpEventRPT[]>(url).pipe(catchError(this.handleError));
  // }

  // public postFollowUpEvent(followUpEvent: FollowUpEvent): Observable<FollowUpEvent> {
  //   const url = this.WebApiPrefix + 'follow_up_events';
  //   console.log('in postFollowUpEvent with url ' + url);
  //   let body = JSON.stringify({ followUpEvent: followUpEvent });
  //   // strip outer key name
  //   const x = JSON.parse(body);
  //   body = JSON.stringify(x.followUpEvent);
  //   console.log('and final body ' + body);
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
  //   return this.http.post(url, body, { headers: headers });
  // }
}
