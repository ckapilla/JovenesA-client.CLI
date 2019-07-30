import { Component, Input, Host } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective } from '@angular/forms';

@Component({
  template: `<div>
  <input id="gradeMonths" type="text" disabled
  class="form-control form-control-sm" value={{gradeMonths}} />
  </div>`,
  selector: 'app-grade-months'
})
export class GradeMonthsComponent {
  @Input() universityId: number;
  gradeMonths: string;

  constructor() {
    this.gradeMonths = 'Quarter / JanMaySep';


  }
}
