import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { StudentMiniDTO } from '../../models/studentMiniDTO';
import { SqlResource } from '../../services/sql-resource.service';

@Injectable()
export class NameService {
  constructor(private sqlResource: SqlResource,
    private http: HttpClient
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
  providers: [NameService],
  styles: [`.form-control { width: 300px; display: inline; }`]
})

export class NameLookupComponent {
  studentMiniDTO: StudentMiniDTO;
  searching = false;
  searchFailed = false;
  @Output() onSelectedStudentGUId = new EventEmitter<string>();

  constructor(private _service: NameService) {
    console.log('name-lookup constructor!');
  }

  onSelect(item) {
    console.log('onSelect');
    console.log(item.item.studentId);
    console.log(item.item.studentGUId);
    this.onSelectedStudentGUId.emit(item.item.studentGUId);
  }


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
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


}
