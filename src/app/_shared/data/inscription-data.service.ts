import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inscription } from '../models/inscription';
import { InscriptionEntryDTO } from '../models/inscription-entryDTO';
import { UrlService } from '../services/url.service';

@Injectable({ providedIn: 'root' })
export class InscriptionDataService {
  WebApiPrefix: string;

  constructor(private http: HttpClient, private webApiPrefixService: UrlService) {
    // console.log('data service constructor');
    this.WebApiPrefix = webApiPrefixService.getWebApiPrefix();
  }

  /// ///////////////////////////////////////////////
  ///  InscriptionController
  /// ///////////////////////////////////////////////

  public getInscriptionsListForPeriod(academicTermId: number): Observable<InscriptionEntryDTO[]> {
    const url = this.WebApiPrefix + 'becas/' + 'inscriptions-list/period/' + academicTermId;
    console.log('sending AuthHttp get request for GradesList with url ' + url);
    return this.http.get<InscriptionEntryDTO[]>(url).pipe(catchError(this.handleError));
  }

  public getInscriptionsForPeriod(academicTermId: number): Observable<Inscription[]> {
    const url = this.WebApiPrefix + 'becas/inscriptions/' + 'for-period/' + academicTermId;
    console.log('sending AuthHttp get request for Inscriptions for Period with url ' + url);
    return this.http.get<Inscription[]>(url).pipe(catchError(this.handleError));
  }

  public getInscriptionsForStudent(studentGUId: string): Observable<Inscription[]> {
    const url = this.WebApiPrefix + 'becas/inscriptions/' + 'for-student/' + studentGUId;
    console.log('sending AuthHttp get request for Inscription ' + url);
    return this.http.get<Inscription[]>(url).pipe(catchError(this.handleError));
  }


  public updateInscriptions(inscriptionEntry: Inscription): Observable<any> {
    const url = this.WebApiPrefix + 'becas/' + 'inscriptions/' + inscriptionEntry.inscriptionId;
    let body = JSON.stringify({ inscriptionEntry: inscriptionEntry }); //
    // strip outer 'inscriptionEntry' name

    const x = JSON.parse(body);
    body = JSON.stringify(x.inscriptionEntry);
    console.log('@@@@@@@@@@@@@in updateInscriptions with ' + body);

    const returnedToken =
      // eslint-disable-next-line max-len
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVWTBOemxFTnpjMVJFUTJRMEZFTkVZNVJFSkVPVE5DUVVFMlJqYzRNRFJHTVRJd05qZ3hOQSJ9.eyJpc3MiOiJodHRwczovL2NrYXBpbGxhLmF1dGgwLmNvbS8iLCJzdWIiOiJVa3R5NEhhb0czc0UzeDJqWE1HMm1TOHo2dFM0R0JPUEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9Kb3ZlbmVzQWRlbGFudGVXZWJBUEkiLCJpYXQiOjE3MzQ1MzY4MDQsImV4cCI6MTczNDYyMzIwNCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiVWt0eTRIYW9HM3NFM3gyalhNRzJtUzh6NnRTNEdCT1AifQ.WAm2OZ3dgowpFn73_G4KKBqe9FhXRCz1uGmiNaz6ZupufSZXJsXoFkz6_NVlM6Ke2COFEQtNcdWpFzWnj_PjPZ5neBoBdSfnHsjpAzIO1ysqiN4T0m_L32lQEeljEU2kAIR-plDZdEsGy0lOCnhHL_VbpGMwXrooekr4wXqPssuQofXBQcFLmmXaDSEqz7PjGEZjQcbzmrMsDiUBA0WE9-q6OUMxIs2ofVxA9qN3ePYol1h751_wi5PNCeLQckmXNE4mOQgdi-7B2R4X39o8w4RZVnignJ4pzgEJznXow6s1s6GDPvhCytHO92Fl_2-ifysbxJQCVgwF97li-S0uHQ';
      const headers = new HttpHeaders().set('Content-Type', 'application/json').set('authorization', returnedToken);
    console.log('ready to put ' + url + ' body: ' + body + ' options ' + headers);
    return this.http.put(url, body, { headers: headers });
  }

  public uploadInscriptionImage(frmData: FormData,
    studentGUId: string,
    inscriptionId: number,
    academicTermId: number,
    inscriptionType: string
    ): Observable<any>{
    const url = this.WebApiPrefix + 'becas/inscriptions/' + 'inscription' + '?studentGUId=' + studentGUId + '&inscriptionId='+ inscriptionId  + '&academicTermId='+ academicTermId + '&inscriptionType=' + inscriptionType;

    console.log('@@@@@@@@@@@@@@in uploadInscriptionImage with url ' + url );

    if (frmData) {
      const file: any = frmData.get('file');
      console.log('ready to post ' + url + ' filename: ' + file.name); // + ' options ' + headers);
      // console.log('with frmData.fileName = ' + frmData.get('fileName'));
      // console.log('with frmData.studentGUID = ' + frmData.get('studentGUID'));
      return this.http.post(url, frmData);
    }
  }

  private handleError(error: any) {
    console.log('becas-inscriptions-data handlError');
    JSON.stringify(error);
    const errMsg = error.message
      ? error.message
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';
    console.log(errMsg.message);
    console.log(errMsg.statusText);
    console.error(errMsg); // log to console instead
    if (errMsg === 'No JWT present or has expired') {
      window.alert('Session has expired, please log in again.');
    }
    return throwError(errMsg);
  }
}
