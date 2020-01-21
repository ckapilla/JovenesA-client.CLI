import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GradesGivenEntryDTO } from '../models/grades-given-entryDTO';
import { UrlService } from './url.service';

@Injectable({ providedIn: 'root' })
export class BecaDataService {
  WebApiPrefix: string;

  constructor(private http: HttpClient,
    private webApiPrefixService: UrlService) {
    // console.log('data service constructor');
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

  //////////////////////////////////////////////////
  ///  BecasController
  //////////////////////////////////////////////////


  public getGradesListEntryDTOs(): Observable<GradesGivenEntryDTO[]> {
    const url = this.WebApiPrefix + 'becas/' + 'grades-list';
    console.log('sending AuthHttp get request for GradesList');
    return this.http.get<GradesGivenEntryDTO[]>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.log('quarterly-data handlError');
    JSON.stringify(error);
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg.message);
    console.log(errMsg.statusText);
    console.error(errMsg); // log to console instead
    if (errMsg === 'No JWT present or has expired') {
      window.alert('Session has expired, please log in again.');
    }
    return throwError(errMsg);
  }
}
