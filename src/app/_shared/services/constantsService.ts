import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { catchError, shareReplay, tap, toArray } from 'rxjs/operators';
import { SetSelectedAcademicTermId, SetSelectedQRPeriod } from 'src/app/_store/ui/ui.action';
import { constants } from '../constants/constants';
import { BaseDataService } from '../data/base-data.service';
import { PROCESSINGPERIOD } from '../interfaces/PROCESSINGPERIOD';
import { SELECTITEM } from '../interfaces/SELECTITEM';
import { UrlService } from './url.service';

interface CODEVALUE {
  codeSet: string;
  value: string;
  label: string;
  sortOrder: number;
}

interface QRDATES {
  ssrDateRange: string;
  active: number;
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

  private qrDatesUrl = this.WebApiPrefix + 'lookup/qrDates';
  qrDates$: Observable<QRDATES> = this.http.get<QRDATES>(this.qrDatesUrl).pipe(
    tap((data) => console.log('qrDates results ', JSON.stringify(data))),
    shareReplay(1),
    catchError(this.handleError)
  );

  private gpPeriodsUrl = this.WebApiPrefix + 'lookup/gpPeriods';
  gpPeriods$: Observable<PROCESSINGPERIOD[]> = this.http.get<PROCESSINGPERIOD[]>(this.gpPeriodsUrl).pipe(
    // tap((data) => console.log('gPP results ', JSON.stringify(data))),
    shareReplay(1),
    catchError(this.handleError)
  );
  private gpPeriodActiveUrl = this.WebApiPrefix + 'lookup/gpPeriods?activeStatus=1';
  gpPeriodsActive$: Observable<PROCESSINGPERIOD[]> = this.http.get<PROCESSINGPERIOD[]>(this.gpPeriodsUrl).pipe(
    // tap((data) => console.log('gPP results ', JSON.stringify(data))),
    shareReplay(1),
    catchError(this.handleError)
  );

  private ipPeriodsUrl = this.WebApiPrefix + 'lookup/ipPeriods';
  ipPeriods$: Observable<PROCESSINGPERIOD[]> = this.http.get<PROCESSINGPERIOD[]>(this.ipPeriodsUrl).pipe(
    // tap((data) => console.log('inscripP results ', JSON.stringify(data))),
    shareReplay(1),
    catchError(this.handleError)
  );
  private inscripPeriodActiveUrl = this.WebApiPrefix + 'lookup/ipPeriods?activeStatus=1';
  ipPeriodsActive$: Observable<PROCESSINGPERIOD[]> = this.http.get<PROCESSINGPERIOD[]>(this.ipPeriodsUrl).pipe(
    // tap((data) => console.log('inscripP results ', JSON.stringify(data))),
    shareReplay(1),
    catchError(this.handleError)
  );



  constructor(public http: HttpClient, public webApiPrefixService: UrlService, public store: Store) {
    super(http, webApiPrefixService);
    console.log('hello from constantsService constructor');
  }



  public loadFromDB() {
    this.generateGradesProcessingPeriods();
    this.generateInscriptionsPeriods();
    this.setSSRDateRange();
    this.buildCodeValueArrays();
    this.generateQRPeriods();
    this.generateJoinedYears();
    this.generateGradYears();
    this.generateContactYears();
    this.generateMRAdjustedContactPeriod();

  }

  public generateGradesProcessingPeriods(){
    this.gpPeriods$.pipe(toArray()).subscribe(
      (data) => {
        constants.gradesProcessingPeriods = data[0];  // our data is in the first and only element of array
      },
      (err: any) => console.error('Subscribe error: ' + err),
      () => {
        console.log('xxxxxxxxxx subscribe returned  ');
      }
    );
  }

  public generateInscriptionsPeriods(){
    this.ipPeriods$.pipe(toArray()).subscribe(
      (data) => {
        constants.inscriptionsProcessingPeriods = data[0];  // our data is in the first and only element of array
      },
      (err: any) => console.error('Subscribe error: ' + err),
      () => {
        console.log('>>>subscribe returned  ');
        console.log(JSON.stringify( constants.inscriptionsProcessingPeriods));
      }
    );
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
    console.log(constants.joinedYears[0]);
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
    console.log(constants.gradYears[0]);
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
    console.log(constants.contactYears[0]);
  }


  public generateQRPeriods() {
    const launchDate = 26;
    console.log('launchDate = ' + launchDate);
    const now = new Date();
    console.log('%%%%%%%%%%GENERATE QR PERIODS%%%%%%');
    console.log(now);
    let thisYear  = now.getFullYear();
    let thisMonth = now.getMonth() + 1; // since we don't want zero based here
    const thisDate = now.getDate(); // not zero based
    if (thisMonth <=2 || (thisMonth  === 3 && thisDate < launchDate)) {
      thisYear--;
    }
    if (
      (thisMonth  === 3 && thisDate >= launchDate)
      || (thisMonth  === 6 && thisDate >= launchDate)
      || (thisMonth  === 9 && thisDate >= launchDate)
      || (thisMonth  === 12 && thisDate >= launchDate)
    ) {
      thisMonth++;
    }
    const monthIndex = thisMonth % 12;
    console.log('adjusted monthIndex ' + monthIndex );
    //////////////_,J,F,M,A,M,J,J,A,S,O,N,D
    const qtrs = [0,4,4,4,1,1,1,2,2,2,3,3,3];
    let targetQtr = qtrs[monthIndex];
    console.log('this month: ' + thisMonth);
    console.log('month index into qtrs array: ' + monthIndex);
    console.log('targetQtr: '  + targetQtr);


    let elem: C_SELECTITEM =  { value: '', label: '' };
    const NUMQTRS = 4;
    const initYear = 2019;
    const initQtr = 3;
    let maxQtrs = NUMQTRS;
    if (thisMonth % 3 === 0) { // if last days of quarter bump  treat as if it is next quarter
      console.log('last month of quarter');
      targetQtr = (thisDate >=launchDate) ?  qtrs[thisMonth + 1] : targetQtr;
      console.log('targetQtr adj: '  + targetQtr);
    }

    console.log('============================');
    const periodStrings: string[] = ['0: null', '1:Ene-Mar', '2:Abr-Jun', '3:Jul-Set', '4:Oct-Dic' ];

    let year = initYear;
    let qtr = initQtr;
    while (year <= thisYear) {
      maxQtrs = (year === thisYear) ? targetQtr : NUMQTRS;
      while (qtr <= maxQtrs) {
        elem = new C_SELECTITEM(year + '-' + qtr, year + '-' + periodStrings[qtr]);
        constants.qrPeriods.push(elem);

        qtr++;
      }
      qtr = 1;
      year++;
    }
    constants.qrPeriods.reverse();
    console.log('setting SelectedQRPeriod to ' + thisYear + ' ' + targetQtr);
    this.store.dispatch(new SetSelectedQRPeriod(thisYear + '-' + targetQtr));
    // console.log(constants.qrPeriods);
  }

  generateMRAdjustedContactPeriod(): void {
    const now = new Date();
    let thisYear  = now.getFullYear();
    let thisMonth  = now.getMonth() + 1; // don't want zero based here
    const thisDate  = now.getDate();
    if (thisDate <= 2) {
      console.log('adjusting month');
      if (thisMonth === 1) {
        thisMonth = 12;
        console.log('adjusting Year');
        thisYear--;
      } else {
        thisMonth--;
      }
    }
    console.log('%%%%MRDateAdjustment has :', thisYear, thisMonth);

    constants.currentContactYear  = thisYear;
    constants.currentContactMonth = thisMonth;
  }



  // getCurrentGradePeriod(yearTypeId: number) {
  //   const now = new Date();
  //   constants.gradesProcessingPeriods.find(period => period.studentReportingStartDate >=('' +  now) && period.yearTypeId === yearTypeId);
  // }


  SetSelectedAcademicTermId(gradesProcessingPeriod: string) {
    this.store.dispatch(new SetSelectedAcademicTermId(gradesProcessingPeriod));
  }


  public setSSRDateRange() {
    let x = 'NOTSETYET';
    this.qrDates$.pipe().subscribe(
      (data) => {
        x = data.ssrDateRange;
          constants.ssrDateRange = x;
      }),
      (err) => console.error('Subscribe error: ' + err),
      () => {
        console.log('xxxxxxxxxx subscribe returned  ' + x);
      }
      ;
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
