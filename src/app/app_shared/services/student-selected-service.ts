import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class StudentSelectedService {
  private subject = new BehaviorSubject<string>('0000');

  notifyNewStudentGUId(message: string) {
    this.subject.next(message);
  }

  getStudentGUId(): Observable<string> {
    return this.subject.asObservable();
  }
}
