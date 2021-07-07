import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap, toArray } from 'rxjs/operators';
import { constants } from '../constants/constants';
import { BaseDataService } from '../data/base-data.service';
import { SELECTITEM } from '../interfaces/SELECTITEM';
import { UrlService } from './url.service';

interface CODEVALUE {
  codeSet: string;
  value: string;
  label: string;
  sortOrder: number;
}

class C_SELECTITEM implements SELECTITEM {

  constructor(
    public value: string,
    public label: string

  ) {}
}

@Injectable({ providedIn: 'root' })
export class ConstantsService extends BaseDataService {
  private codeValuesUrl = this.WebApiPrefix + 'lookup/codeValues';
  codeValues$: Observable<CODEVALUE[]> = this.http.get<CODEVALUE[]>(this.codeValuesUrl).pipe(
    tap((data) => console.log('codeValues ', JSON.stringify(data[0]))),
    catchError(this.handleError)
  );

  constructor(public http: HttpClient, public webApiPrefixService: UrlService) {
    super(http, webApiPrefixService);
  }

  public buildArrays() {
    this.buildCodeValueArrays();
    this.buildDateArrays();
  }

  public buildDateArrays() {
    this.generateQRPeriods();
  }

  public generateQRPeriods() {
    const now = new Date();
    const thisYear  = now.getFullYear();
    const thisMonth = now.getMonth();
    const thisQtr = Math.floor(thisMonth/3);
    let elem: C_SELECTITEM =  { value: '', label: '' };
    const NUMQTRS = 4;
    let maxQtrs = NUMQTRS;

    const periodStrings: string[] = ['', '1:Ene-Mar', '2:Abr-Jun', '3:Jul-Set', '4:Oct-Dic' ];

    let year = 2019;
    let qtr = 3;
    while (year <= thisYear) {
      maxQtrs = (year === thisYear) ? thisQtr : NUMQTRS;
      while (qtr <= maxQtrs) {
        elem = new C_SELECTITEM(year + '-' + qtr, year + '-' + periodStrings[qtr]);
        constants.qrPeriods.push(elem);
        qtr++;
      }
      qtr = 1;
      year++;
    }
    console.log(constants.qrPeriods);
  }

  public buildCodeValueArrays() {
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
              constants.reviewedStatuses.push(subset);
              break;
            case 'QRReviewedStatus':
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
              constants.academicYearTypes.push(subset);
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
