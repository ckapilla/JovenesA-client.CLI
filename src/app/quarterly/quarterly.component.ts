import { Component } from '@angular/core';

/**
 * This class represents the lazy loaded MentorsComponent.
 */
@Component({

  templateUrl: './quarterly.component.html'
})
export class QuarterlyComponent {
  studentGUId: string;
  constructor() {
    console.log('QuarterlyComponent');
  }
}
