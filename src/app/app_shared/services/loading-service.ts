import { Observable, Observer } from 'rxjs';

export class LoadingService {
    loading$: Observable<any>;
    private _observer: Observer<String>;

    constructor() {
        // this.loading$ = new Observable(observer => this._observer = observer)xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        // .share();
    }

    toggleLoadingIndicator(name: any) {
        if (this._observer) {
            this._observer.next(name);
        }
    }
}
