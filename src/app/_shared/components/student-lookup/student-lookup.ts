import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { SelectedStudent } from 'src/app/_store/selectedStudent/selected-student.service';
import { StudentDataService } from '../../data/student-data.service';
import { StudentMiniDTO } from '../../models/studentMiniDTO';

@Injectable({
  providedIn: 'root'
})
export class StudentNameService {
  public hideSearch = 'true';

  constructor(private studentData: StudentDataService) {}

  search(searchStr: string) {
    if (searchStr === '') {
      return of([]);
    }
    // console.log('in search about to call getStudentMiniDTOs');
    return this.studentData.getCurrentStudentMiniDTOs(searchStr).pipe(
      // catchError(this.handleError),
      tap((x) => console.log(x))
    );
  }
}

@Component({
  selector: 'app-student-lookup',
  templateUrl: './student-lookup.html',
  styles: [ '.form-control { width: 300px; display: inline; }' ]
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
  @Input() showSearchButton: boolean;

  // @Output() onSelectedStudentGUId = new EventEmitter<string>();

  constructor(
    private _service: StudentNameService,
    private router: Router,
    private studentData: StudentDataService,
    private selectedStudent: SelectedStudent
  ) {
    console.log('name-lookup constructor!');
  }

  ngOnInit() {
    this.subscribeForStudentGUIds();
  }
  ngOnDestroy() {
    // console.log('{{{{{{{{{{{{{JA ngOnDestroy / unsubscribe }}}}}}}}}}}}}');

    this.subscription.unsubscribe();
  }
  onSelect(item) {
    console.log(item.item.studentId);
    console.log(item.item.studentGUId);
    this.currentGUId = item.item.studentGUId;
    // this.onSelectedStudentGUId.emit(item.item.studentGUId);
    this.selectedStudent.notifyNewStudentGUId(item.item.studentGUId);
    this.email = item.item.email;
    this.studentName = item.item.studentName;
  }

  onFocus() {
    // console.log('onFocus');
    const input = document.getElementById('search-string') as HTMLInputElement;
    input.focus();
    input.select();
  }

  onInput() {
    const input = document.getElementById('search-string') as HTMLInputElement;
    if (input.value.length === 0) {
      this.resetStudentData();
    }
  }

  onClear() {
    console.log('onClear');
    const input = document.getElementById('search-string') as HTMLInputElement;
    input.focus();
    input.value = '';
    this.resetStudentData();
  }
  subscribeForStudentGUIds() {
    // console.log('Name Lookup set up studentGUId subscription');
    this.subscription = this.selectedStudent.subscribeForStudentGUIds().subscribe((message) => {
      this.studentGUId = message;
      console.log('Name Search new StudentGUId received' + this.studentGUId);
      if (this.studentGUId && this.studentGUId !== '0000') {
        this.currentGUId = this.studentGUId;
        this.fetchData();
      }
    });
  }

  resetStudentData() {
    console.log('studentLookup reset');
    this.selectedStudent.notifyNewStudentGUId('0000');
    this.currentGUId = '0000';
  }

  fetchData() {
    this.studentData.getCurrentStudentMiniDTO(this.currentGUId).subscribe(
      (data) => {
        this.studentMiniDTO = data;
      },
      (err) => console.error('Subscribe error: ' + err),
      () => {
        this.email = this.studentMiniDTO.email;
        this.studentName = this.studentMiniDTO.studentName;
      }
    );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      // tap((term) => console.log('search function has searchStr ' + term)),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this._service.search(term).pipe(
          tap(() => (this.searchFailed = false)),
          tap((x) => console.log(x[0].studentName)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );
  formatter = (x: { studentName: string; email: string }) => x.studentName + ' <' + x.email + '>';

  gotoStudentList() {
    const link = 'admins/students/studentList';
    this.router.navigateByUrl(link);
  }

  gotoStudent() {
    if (this.currentGUId !== '0000') {
      const link = [ 'admins/students/student', { guid: this.currentGUId } ];
      console.log('navigating to ' + link);
      this.router.navigate(link);
    }
  }
}
