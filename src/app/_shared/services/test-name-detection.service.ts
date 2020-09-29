import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetTestNamesVisibility } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';

@Injectable({ providedIn: 'root' })
export class TestNameDetectionService {
  @Select(UIState.getTestNamesVisibility) currentState$: Observable<boolean>;
  constructor(private store: Store) {}

  public checkForTestName(testName: string): void {
    console.log('checking for _Test name with ' + testName);
    console.log('checking for _Test name with ' + testName.substr(0, 1));
    if (testName.substr(0, 1) === '_') {
      console.log('SETTING TEST NAMES VISIBLE');
      this.store.dispatch(new SetTestNamesVisibility(true));
    }
  }
}
