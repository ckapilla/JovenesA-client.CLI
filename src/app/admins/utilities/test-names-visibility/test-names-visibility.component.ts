import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetTestNamesVisibility } from 'src/app/_store/ui/ui.action';
import { UIState } from 'src/app/_store/ui/ui.state';

@Component({
  selector: 'app-test-names-visibility',
  templateUrl: './test-names-visibility.component.html'
})
export class TestNamesVisibilityComponent {
  displayTestNames: boolean;
  strVisibility = 'Not Visible';

  @Select(UIState.getTestNamesVisibility) currentState$: Observable<boolean>;

  constructor(private store: Store) {
    this.currentState$.subscribe((flag) => {
      this.displayTestNames = flag;
    });
    this.strVisibility = this.displayTestNames ? 'Visible' : 'Not Visible';
  }

  toggleTestNamesVisibility() {
    console.log('toggle');
    this.displayTestNames = !this.displayTestNames;
    this.strVisibility = this.displayTestNames ? 'Visible' : 'Not Visible';
    this.store.dispatch(new SetTestNamesVisibility(this.displayTestNames));
  }
}
