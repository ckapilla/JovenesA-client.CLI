import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { catchError, tap, toArray } from 'rxjs/operators';
import { SetselectedQRPeriod } from 'src/app/_store/ui/ui.action';
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

  constructor(public http: HttpClient, public webApiPrefixService: UrlService, public store: Store) {
    super(http, webApiPrefixService);
    console.log('hello from constantsService constructor');
  }

  public buildArrays() {
    this.buildCodeValueArrays();
    this.generateQRPeriods();
    this.generateJoinedYears();
    this.generateGradYears();
    this.generateContactYears();
  }

  public generateJoinedYears() {
    const now = new Date();
    const thisYear  = now.getFullYear();
    let elem: C_SELECTITEM =  { value: '', label: '' };

    const initYear = 2002;
    const finalYear = thisYear;

    let year = finalYear;
    while (year >= initYear) {
      elem = new C_SELECTITEM('' +year, '' + year );
      constants.joinedYears.push(elem);
      year--;
    }
    console.log(constants.joinedYears);
  }

  public generateGradYears() {
    const now = new Date();
    const thisYear  = now.getFullYear();
    let elem: C_SELECTITEM =  { value: '', label: '' };

    const initYear = 2004;
    const finalYear = thisYear + 5;

    let year = finalYear;
    while (year >= initYear) {
      elem = new C_SELECTITEM('' +year, '' + year );
      constants.gradYears.push(elem);
      year--;
    }
    console.log(constants.gradYears);
  }


  public generateContactYears() {
    const now = new Date();
    const thisYear  = now.getFullYear();
    let elem: C_SELECTITEM =  { value: '', label: '' };

    const initYear = 2017;

    let year = initYear;
    while (year <= thisYear) {
      elem = new C_SELECTITEM('' +year, '' + year );
      constants.contactYears.push(elem);
      year++;
    }
    console.log(constants.contactYears);
  }


  public generateQRPeriods() {
    const now = new Date();
    const thisYear  = now.getFullYear();
    const thisMonth = now.getMonth();
    const thisQtr = Math.floor(thisMonth/3);
    let elem: C_SELECTITEM =  { value: '', label: '' };
    const NUMQTRS = 4;
    const initYear = 2019;
    const initQtr = 3;
    let maxQtrs = NUMQTRS;

    console.log('============================');
    const periodStrings: string[] = ['1:Ene-Mar', '2:Abr-Jun', '3:Jul-Set', '4:Oct-Dic' ];

    let year = initYear;
    let qtr = initQtr;
    while (year <= thisYear) {
      maxQtrs = (year === thisYear) ? thisQtr : NUMQTRS;
      while (qtr <= maxQtrs) {
        elem = new C_SELECTITEM(year + '-' + qtr, year + '-' + periodStrings[qtr - 1]);
        constants.qrPeriods.push(elem);
        qtr++;
      }
      qtr = 1;
      year++;
    }
    this.setselectedQRPeriod(thisYear + '-' + thisQtr);
    console.log(constants.qrPeriods);
  }

  setselectedQRPeriod(yearPeriod: string) {
    this.store.dispatch(new SetselectedQRPeriod(yearPeriod));
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
