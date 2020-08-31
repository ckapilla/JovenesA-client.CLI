import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerEnvironment } from 'src/app/_shared/models/server-environment';
import { UrlService } from '../services/url.service';
import { BaseDataService } from './base-data.service';

@Injectable({ providedIn: 'root' })
export class UtilitiesDataService extends BaseDataService {
	// WebApiPrefix: string;

	constructor(public http: HttpClient, public webApiPrefixService: UrlService) {
		super(http, webApiPrefixService);
	}

	// public getSponsorSummarySentCounts(): Observable<SponsorSummarySentCount[]> {
	//   const url = this.WebApiPrefix + 'reports/sponsor_summary_sent_counts';
	//   console.log('sending AuthHttp get request for SponsorSummarSentCounts with ' + url);
	//   return this.http.get<SponsorSummarySentCount[]>(url).pipe(catchError(this.handleError));
	// }

	// public getMentorReportSubmittedCounts(): Observable<MentorReportSubmittedCount[]> {
	//   const url = this.WebApiPrefix + 'reports/mentor_report_submitted_counts';
	//   console.log('sending AuthHttp get request for MentorReportSubmittedCounts with ' + url);
	//   return this.http.get<MentorReportSubmittedCount[]>(url).pipe(catchError(this.handleError));
	// }

	public getServerEnvironment(): Observable<ServerEnvironment> {
		const url = this.WebApiPrefix + 'reports/server_environment';
		console.log('sending AuthHttp get request for ServerEnvironment with ' + url);
		return this.http.get<ServerEnvironment>(url).pipe(catchError(this.handleError));
	}
}
