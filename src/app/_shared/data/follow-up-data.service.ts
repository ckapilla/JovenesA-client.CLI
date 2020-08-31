import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseDataService } from '../data/base-data.service';
import { FollowUpEvent } from '../models/follow-up-event';
import { FollowUpEventRPT } from '../models/follow-up-eventRPT';
import { FollowUpRequest } from '../models/follow-up-request';
import { FollowUpRequestRPT } from '../models/follow-up-requestRPT';
import { UrlService } from '../services/url.service';

@Injectable({ providedIn: 'root' })
export class FollowUpDataService extends BaseDataService {
	// WebApiPrefix: string;

	constructor(public http: HttpClient, public webApiPrefixService: UrlService) {
		super(http, webApiPrefixService);
	}

	//////////////////////////////////////////////////
	///  FollowUpController
	//////////////////////////////////////////////////

	public getFollowUpRequestsForStudent(studentId?: number): Observable<FollowUpRequestRPT[]> {
		let url = this.WebApiPrefix + 'follow_up_requests';
		if (studentId) {
			url = url + '?studentId=' + studentId;
		}
		console.log('sending AuthHttp get request with ' + url);
		return this.http.get<FollowUpRequestRPT[]>(url).pipe(catchError(this.handleError));
	}

	public getFollowUpRequestsForStudentByGUID(studentGUId?: string): Observable<FollowUpRequestRPT[]> {
		let url = this.WebApiPrefix + 'follow_up_requests';
		if (studentGUId) {
			url = url + '?studentGUId=' + studentGUId;
		}
		console.log('sending AuthHttp get request with ' + url);
		return this.http.get<FollowUpRequestRPT[]>(url).pipe(catchError(this.handleError));
	}

	public getFollowUpRequests(statusId: string): Observable<FollowUpRequestRPT[]> {
		let url = this.WebApiPrefix + 'follow_up_requests';
		if (statusId) {
			url = url + '?statusId=' + statusId;
		}
		console.log('sending AuthHttp get request with ' + url);
		return this.http.get<FollowUpRequestRPT[]>(url).pipe(catchError(this.handleError));
	}

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

	public getFollowUpEvents(followUpRequestId: number): Observable<FollowUpEventRPT[]> {
		const url = this.WebApiPrefix + 'follow_up_events/' + followUpRequestId;
		console.log('sending AuthHttp get request with ' + url);
		return this.http.get<FollowUpEventRPT[]>(url).pipe(catchError(this.handleError));
	}

	public postFollowUpEvent(followUpEvent: FollowUpEvent): Observable<FollowUpEvent> {
		const url = this.WebApiPrefix + 'follow_up_events';
		console.log('in postFollowUpEvent with url ' + url);
		let body = JSON.stringify({ followUpEvent: followUpEvent });
		// strip outer key name
		const x = JSON.parse(body);
		body = JSON.stringify(x.followUpEvent);
		console.log('and final body ' + body);
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
		return this.http.post(url, body, { headers: headers });
	}
}
