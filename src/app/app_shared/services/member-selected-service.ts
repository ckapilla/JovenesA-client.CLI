import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MemberSelectedService {
  private subject = new BehaviorSubject<string>('0000');

  subscribeForMemberGUIds(): Observable<string> {
    console.log('memberSelectedService has ' + this.subject.observers + ' observables');
    return this.subject.asObservable();
  }

  notifyNewMemberGUId(message: string) {
    console.log('%%%%%%%%%%% memberSelectedService has new Guid' + message);
    this.subject.next(message);
  }

  getLatestMemberGUId(): string {
    return this.subject.getValue();
  }

  unsubscribe() {
    this.subject.complete();
  }

  getInternalSubject() {
    return this.subject;
  }

}
