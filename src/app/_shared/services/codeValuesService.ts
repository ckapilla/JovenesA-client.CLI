import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, toArray } from 'rxjs/operators';
import { constants } from '../constants/constants';
import { BaseDataService } from '../data/base-data.service';
import { UrlService } from './url.service';

interface CODEVALUE {
  codeSet: string;
  value: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class CodeValuesService extends BaseDataService {
  private codeValuesUrl = this.WebApiPrefix + 'lookup/codeValues';
  codeValues$: Observable<CODEVALUE[]> = this.http
    .get<CODEVALUE[]>(this.codeValuesUrl)
    .pipe(tap((data) => console.log('codeValues ', JSON.stringify(data[0]))), catchError(this.handleError));

  constructor(public http: HttpClient, public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

  public buildArrays() {
    this.codeValues$.pipe(toArray()).subscribe(
      (data) => {
        const x = data[0];
        x.forEach((item) => {
          // console.log(item);
          const subset = (({ value, label }) => ({ value, label }))(item);

          switch (item.codeSet) {
            case 'StudentStatus':
              constants.studentStatuses.push(subset);
              break;
            case 'LanguageSkillLevel':
              constants.languageStatuses.push(subset);
              break;
            case 'SchoolType':
              constants.schoolTypes.push(subset);
              break;
            case 'MemberType':
              constants.memberTypes.push(subset);
              break;
            case 'ReviewedStatus':
              if (item.value < '2100') {
                constants.reviewedStatuses.push(subset);
                constants.reviewedQRStatuses.push(subset);
              } else {
                constants.reviewedQRStatuses.push(subset);
              }
              break;
            case 'ReviewedQRStatus':
              constants.reviewedQRStatuses.push(subset);
              break;
            case 'MemberStatus':
              constants.memberStatuses.push(subset);
              break;
            case 'FollowUpStatus':
              constants.followUpStatuses.push(subset);
              break;
            case 'HighlightStatus':
              constants.highlightStatuses.push(subset);
              break;
            case 'AcademicYearType':
              constants.highlightStatuses.push(subset);
              break;
            case 'Country':
              constants.countryList.push(subset);
              break;
            default:
              break;
          }
        });
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('toArray completed ');
      }
    );
  }
}
