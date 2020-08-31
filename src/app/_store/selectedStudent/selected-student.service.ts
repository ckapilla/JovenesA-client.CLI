import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SelectedStudent {
	private subject = new BehaviorSubject<string>('0000');

	subscribeForStudentGUIds(): Observable<string> {
		console.log('after subscribe selectedStudentService has ' + this.subject.observers + ' observables');
		return this.subject.asObservable();
	}

	notifyNewStudentGUId(message: string) {
		this.subject.next(message);
	}

	getLatestStudentGUId(): string {
		return this.subject.getValue();
	}

	unsubscribe() {
		this.subject.complete();
		// console.log('after unsubscribe selectedStudentService has ' + this.subject.observers + ' observables');
	}
}
