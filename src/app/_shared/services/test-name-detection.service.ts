import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetTestNamesVisibility } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';

@Injectable({ providedIn: 'root' })
export class TestNameDetectionService {
   currentState$ = this.store.select<boolean>(UIState.getTestNamesVisibility);
  constructor(private store: Store) {}

  public checkForTestName(testName: string): void {
    // keep verbose console.log statements for debugging
    console.log('checking for Test name for ' + testName);
    console.log('checking for Test name prefix "_", have ' + testName.substr(0, 1));
    if (testName.substr(0, 1) === '_') {
      console.log('SETTING TEST NAMES VISIBLE');
      this.store.dispatch(new SetTestNamesVisibility(true));
    } else {
      console.log('SETTING TEST NAMES INVISIBLE');
      this.store.dispatch(new SetTestNamesVisibility(false));
    }
  }
}
