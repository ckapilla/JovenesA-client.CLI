import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfidentialReportRPT } from '../models/confidential-report';
import { BaseDataService } from './base-data.service';
import { UrlService } from './url.service';

@Injectable({ providedIn: 'root' })
export class ConfidentialDataService extends BaseDataService {
  // WebApiPrefix: string;

  constructor(public http: HttpClient,
    public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }


  public getConfidentialReportRPTsViaGUID(adminId: number, studentGUId: string): Observable<ConfidentialReportRPT[]> {
    const url = this.WebApiPrefix + 'confidential_reports/' + adminId + '/' + studentGUId;
    console.log('sending AuthHttp get request for ConfidentailReports with ' + url);
    return this.http.get<ConfidentialReportRPT[]>(url).pipe(catchError(this.handleError));
  }

}
