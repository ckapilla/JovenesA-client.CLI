import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TestNamesVisibilityService {
	private subject = new BehaviorSubject<boolean>(false);

	subscribeForTestNamesVisibility(): Observable<boolean> {
		return this.subject.asObservable();
	}

	notifyNewTestNamesVisibility(newval: boolean) {
		this.subject.next(newval);
	}

	getLatestTestNamesVisibility(): boolean {
		return this.subject.getValue();
	}

	unsubscribe() {
		this.subject.complete();
	}

	getInternalSubject() {
		return this.subject;
	}
}
