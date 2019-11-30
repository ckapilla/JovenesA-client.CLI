import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SponsorLetter } from '../models/sponsor-letter';
import { BaseDataService } from './base-data.service';
import { UrlService } from './url.service';


@Injectable({ providedIn: 'root' })
export class StudentSponsorLetterDataService extends BaseDataService {
  // WebApiPrefix: string;

  constructor(public http: HttpClient,
    public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
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
}
