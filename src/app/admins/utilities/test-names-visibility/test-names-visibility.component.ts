import { Component } from '@angular/core';
import { TestNamesVisibilityService } from 'src/app/_store/testNamesVisibility/test-names-visibility.service';

@Component({
	selector: 'app-test-names-visibility',
	templateUrl: './test-names-visibility.component.html'
})
export class TestNamesVisibilityComponent {
	displayTestNames: boolean;
	strVisibility = 'Not Visible';

	constructor(public testNamesVisibilityService: TestNamesVisibilityService) {
		this.displayTestNames = testNamesVisibilityService.getLatestTestNamesVisibility();
		this.strVisibility = this.displayTestNames ? 'Visible' : 'Not Visible';
	}

	toggleTestNamesVisibility() {
		console.log('toggle');
		this.displayTestNames = !this.displayTestNames;
		this.strVisibility = this.displayTestNames ? 'Visible' : 'Not Visible';
		this.testNamesVisibilityService.notifyNewTestNamesVisibility(this.displayTestNames);
	}
}
