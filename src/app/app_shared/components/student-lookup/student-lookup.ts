import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { StudentMiniDTO } from '../../models/studentMiniDTO';
// import { SqlResource } from '../../services/sql-resource.service';
import { StudentDataService } from '../../services/student-data.service';
import { StudentSelectedService } from '../../services/student-selected-service';
@Injectable({
  providedIn: 'root'
})
export class StudentNameService {
  constructor(private studentData: StudentDataService
    // private http: HttpClient,
  ) { }

  search(searchStr: string) {
    if (searchStr === '') {
      return of([]);
    }
    console.log('in search about to call getStudentMiniDTOs');
    return this.studentData.getCurrentStudentMiniDTOs(searchStr)
      .pipe(
        // catchError(this.handleError),
        tap((x) => console.log('after get')),
      );
  }
}


@Component({
  selector: 'app-student-lookup',
  templateUrl: './student-lookup.html',
  styles: [`.form-control { width: 300px; display: inline; }`]
})

export class StudentLookupComponent implements OnInit, OnDestroy {
  studentMiniDTO: StudentMiniDTO;
  searching = false;
  searchFailed = false;
  currentGUId = '0000';
  studentName: string;
  email: string;
  studentGUId: string;
  private subscription: Subscription;

  // @Output() onSelectedStudentGUId = new EventEmitter<string>();

  constructor(private _service: StudentNameService,
    private router: Router,
    // private sqlResource: SqlResource,
    private studentData: StudentDataService,
    private studentSelected: StudentSelectedService) {
    console.log('name-lookup constructor!');
  }

  ngOnInit() {
    this.subscribeForStudentGUIds();
  }
  ngOnDestroy() {
    // console.log('{{{{{{{{{{{{{JA ngOnDestroy / unsubscribe }}}}}}}}}}}}}');
    // this.studentSelected.unsubscribe();
    this.subscription.unsubscribe();
    // this.subscription.unsubscribe();
    console.log(' after unsubscribe ' + this.studentSelected.getInternalSubject().observers.length);
  }
  onSelect(item) {
    console.log('onSelect');
    console.log(item.item.studentId);
    console.log(item.item.studentGUId);
    this.currentGUId = item.item.studentGUId;
    // this.onSelectedStudentGUId.emit(item.item.studentGUId);
    this.studentSelected.notifyNewStudentGUId(item.item.studentGUId);
    this.email = item.item.email;
    this.studentName = item.item.studentName;
  }

  subscribeForStudentGUIds() {
    console.log('Name Lookup set up studentGUId subscription');
    this.subscription = this.studentSelected.subscribeForStudentGUIds()
      // .pipe(takeWhile(() => this.notDestroyed))
      .subscribe(message => {
        this.studentGUId = message;
        console.log('Name Search new StudentGUId received' + this.studentGUId);
        if (this.studentGUId && this.studentGUId !== '0000') {
          this.currentGUId = this.studentGUId;
          this.fetchData();
        }

        // console.log('subscribe next ' + this.studentSelected.getInternalSubject().observers.length);
      });
  }


  fetchData() {

    console.log('ssr fetchData');

    this.studentData.getCurrentStudentMiniDTO(this.currentGUId)
      .subscribe(
        data => { this.studentMiniDTO = data; },
        err => {
          return console.error('Subscribe error: ' + err);
        },
        () => {
          this.email = this.studentMiniDTO.email;
          this.studentName = this.studentMiniDTO.studentName;
        });
  }


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap((term) => console.log('search function has searchStr ' + term)),
      tap(() => this.searching = true),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => this.searchFailed = false),
          tap(x =>
            console.log(x[0].studentName)
          ),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => this.searching = false)
    )
  formatter = (x: { studentName: string, email: string }) => x.studentName + ' <' + x.email + '>';


  gotoStudentList() {
    const link = 'admins/students/studentList';
    this.router.navigateByUrl(link);
  }

  gotoStudent() {
    if (this.currentGUId !== '0000') {
      const link = ['admins/students/student', { guid: this.currentGUId }];
      console.log('navigating to ' + link);
      this.router.navigate(link);
    }

  }

}
