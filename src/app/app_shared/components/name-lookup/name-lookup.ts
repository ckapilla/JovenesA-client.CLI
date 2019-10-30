import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { StudentMiniDTO } from '../../models/studentMiniDTO';
import { SqlResource } from '../../services/sql-resource.service';
import { StudentSelectedService } from '../../services/student-selected-service';
@Injectable({
  providedIn: 'root'
})
export class NameService {
  constructor(private sqlResource: SqlResource
    // private http: HttpClient,
  ) { }

  search(searchStr: string) {
    if (searchStr === '') {
      return of([]);
    }
    console.log('in search about to call getStudentMiniDTOs');
    return this.sqlResource.getCurrentStudentMiniDTOs(searchStr)
      .pipe(
        // catchError(this.handleError),
        tap((x) => console.log('after get')),
      );
    // const WebApiPrefix = 'http://192.168.1.70:2368/api/';
    // const url = WebApiPrefix + 'students/names/' + searchStr + '/' + 1005;
    // console.log('search Url is ' + url);
    // return this.http.get<StudentMiniDTO[]>(url)
    //   .pipe(
    //     // catchError(this.handleError),
    //     tap((x) => console.log('after get')),
    //   );
  }
}


@Component({
  selector: 'app-name-lookup',
  templateUrl: './name-lookup.html',
  styles: [`.form-control { width: 300px; display: inline; }`]
})

export class NameLookupComponent {
  studentMiniDTO: StudentMiniDTO;
  searching = false;
  searchFailed = false;
  currentGUId = '0000';
  // @Output() onSelectedStudentGUId = new EventEmitter<string>();

  constructor(private _service: NameService,
    private router: Router,
    private studentSelected: StudentSelectedService) {
    console.log('name-lookup constructor!');
  }

  onSelect(item) {
    console.log('onSelect');
    console.log(item.item.studentId);
    console.log(item.item.studentGUId);
    this.currentGUId = item.item.studentGUId;
    // this.onSelectedStudentGUId.emit(item.item.studentGUId);
    this.studentSelected.notifyNewStudentGUId(item.item.studentGUId);
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
          tap(x => console.log(x[0].studentName)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => this.searching = false)
    )
  formatter = (x: { studentName: string }) => x.studentName;


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
