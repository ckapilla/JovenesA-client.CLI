import { Component } from '@angular/core';

@Component({

  templateUrl: './confidential.component.html'
})
export class ConfidentialComponent {
  studentGUId: string;
  constructor() {
    console.log('ConfidentialComponent');
  }
}
