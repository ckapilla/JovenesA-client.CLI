import { Component } from '@angular/core';
import { StackedBarChartComponent } from 'src/app/_shared/components/stacked-bar-chart/stacked-bar-chart.component';
/**
 * This class represents the lazy loaded BecasHomeComponent.
 */
@Component({
  templateUrl: 'admins-home.component.html',
  standalone: true,
  imports: [StackedBarChartComponent]
})
export class AdminsHomeComponent {
  constructor() {
    // nada
  }

}
