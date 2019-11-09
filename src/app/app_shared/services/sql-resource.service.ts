import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SELECTITEM } from '../interfaces/SELECTITEM';
import { SponsorLetter } from '../models/sponsor-letter';
import { UrlService } from './url.service';


@Injectable({ providedIn: 'root' })
export class SqlResource {
  WebApiPrefix: string;

  constructor(private http: HttpClient,
    private webApiPrefixService: UrlService) {
    // console.log('sqlResource constructor');
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

  ////////////////////////////// lookups

  public getMentorNames(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/mentors';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }
  public getMentorNamesByGUId(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/mentors/guid';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }

  public getSponsorGroups(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/sponsorgroups';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }

  public getUniversityNames(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/universities';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }

  public getPrepaNames(): Observable<SELECTITEM[]> {
    const url = this.WebApiPrefix + 'lookup/prepas';
    console.log('sending AuthHttp get request ' + url);
    return this.http.get<SELECTITEM[]>(url).pipe(catchError(this.handleError));
  }

  //////////////////////////////////////////////////
  ///  SponsorLetterController
  //////////////////////////////////////////////////


  public getSponsorLetters(studentId: number, sponsorId: number): Observable<SponsorLetter[]> {
    const url = this.WebApiPrefix + 'student_sponsor_letters/' + studentId + '/' + sponsorId;
    console.log('sending AuthHttp get request for SponsorLetters with ' + url);
    return this.http.get<SponsorLetter[]>(url).pipe(catchError(this.handleError));
  }

  public postSponsorLetter(sponsorLetter: SponsorLetter,
    studentId: number,
    sponsorGroupId: number): Observable<SponsorLetter> {

    const url = this.WebApiPrefix + 'student_sponsor_letters/' + studentId + '/' + sponsorGroupId;
    console.log('in postSponsorLetter with url ' + url);
    let body = JSON.stringify({ sponsorLetter });
    // strip outer 'mentor' name
    const x = JSON.parse(body);
    body = JSON.stringify(x.sponsorLetter);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('ready to post ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.post(url, body, { headers: headers });

  }

  //////////////////////////////////////////////////
  /// Utilities
  //////////////////////////////////////////////////

  private handleError(error: any) {
    console.log('sqlResource handle error');
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
